import React, { useEffect, useMemo, useState, useRef } from "react";
import { authFetch } from "../utils/api";
import { format } from "date-fns";
import { io } from "socket.io-client";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Download, Filter, Clock, Search, RefreshCw } from "lucide-react";
import { saveAs } from "file-saver";

/*
  Reports.jsx
  - Enterprise-level reports page (version C)
  - Extended, feature-rich reporting dashboard with:
    - KPIs
    - 7+ interactive charts (line, bar, pie)
    - Filters (date range, department, employee)
    - Search across SOPs & Trainings (universal)
    - Live activity logs via WebSocket
    - Export CSV / JSON
    - Data table with pagination & sorting

  Requirements:
  - Uses `authFetch` provided by your frontend utils
  - Socket.io client to receive real-time events
  - Recharts for charts
  - TailwindCSS for styling

  NOTE: you may need to `npm i recharts socket.io-client file-saver date-fns lucide-react`
*/

// -----------------------------
// Helpers
// -----------------------------
function toCSV(rows = [], columns = []) {
  if (!rows.length) return "";
  const header = columns.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(",");
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const key = c.key;
          let v = r[key] == null ? "" : String(r[key]);
          // escape double quotes
          v = v.replace(/"/g, '""');
          return `"${v}"`;
        })
        .join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}

function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}

function dateToISO(d) {
  if (!d) return null;
  if (typeof d === "string") return new Date(d).toISOString();
  return d.toISOString();
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// -----------------------------
// Small UI components
// -----------------------------
function KPICard({ title, value, delta, hint }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{value}</div>
        </div>
        {delta != null && (
          <div className={`text-sm font-medium ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
            {delta >= 0 ? `+${delta}%` : `${delta}%`}
          </div>
        )}
      </div>
      {hint && <div className="mt-2 text-xs text-gray-400">{hint}</div>}
    </div>
  );
}

function SectionTitle({ title, right }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div>{right}</div>
    </div>
  );
}

// -----------------------------
// Charts (small components)
// -----------------------------
function TrainingsCompletionLine({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function DeptSOPPie({ data }) {
  const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="dept" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function TrainingsByEmployeeBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#2563EB" />
        <Bar dataKey="active" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// -----------------------------
// Main Reports Page
// -----------------------------
export default function Reports() {
  // Filters
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return format(d, "yyyy-MM-dd");
  });
  const [dateTo, setDateTo] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [department, setDepartment] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");

  // Data stores
  const [stats, setStats] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [sops, setSOPs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [logs, setLogs] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // socket
  const socketRef = useRef(null);

  // Pagination for table
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Sorting
  const [sortBy, setSortBy] = useState({ key: "createdAt", dir: "desc" });

  // Derived lists
  const departments = useMemo(() => {
    const setdepts = new Set(sops.map((s) => s.dept).concat(employees.map((e) => e.dept)));
    return ["all", ...Array.from(setdepts)];
  }, [sops, employees]);

  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      setLoading(true);
      try {
        const [st, tvs, sp, empRes, lg] = await Promise.all([
          authFetch("/api/stats"),
          authFetch("/api/training"),
          authFetch("/api/sops"),
          authFetch("/api/employees"),
          authFetch("/api/logs"),
        ]);

        if (!mounted) return;
        setStats(st);
        setTrainings(tvs);
        setSOPs(sp);
        setEmployees(empRes.employees || []);
        setLogs(lg);
      } catch (err) {
        console.error("Reports load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();

    return () => {
      mounted = false;
    };
  }, []);

  // Socket setup for real-time logs and updates
  useEffect(() => {
    const s = io("https://traindesk-backend.onrender.com", { transports: ["websocket"] });
    socketRef.current = s;

    s.on("connect", () => console.debug("reports socket connected", s.id));

    // generic log:new
    s.on("log:new", (log) => {
      setLogs((prev) => [log, ...prev].slice(0, 200));
    });

    // training events
    s.on("training:created", (t) => setTrainings((p) => [t, ...p]));
    s.on("training:deleted", (t) => setTrainings((p) => p.filter((x) => x._id !== t._id)));
    s.on("training:completed", (obj) => {
      setTrainings((p) => p.map((x) => (x._id === obj.training._id ? obj.training : x)));
    });

    // sop events
    s.on("sop:created", (sop) => setSOPs((p) => [sop, ...p]));
    s.on("sop:deleted", (sop) => setSOPs((p) => p.filter((x) => x._id !== sop._id)));

    // employee events
    s.on("employee:created", (emp) => setEmployees((p) => [emp, ...p]));
    s.on("employee:deleted", (emp) => setEmployees((p) => p.filter((x) => x._id !== emp._id)));

    return () => {
      s.disconnect();
    };
  }, []);

  // ---------------------------
  // Derived chart data
  // ---------------------------
  const trainingsTimeSeries = useMemo(() => {
    // build daily series between dateFrom and dateTo
    const start = new Date(dateFrom + "T00:00:00Z");
    const end = new Date(dateTo + "T23:59:59Z");
    const days = [];
    const map = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = format(new Date(d), "yyyy-MM-dd");
      days.push(key);
      map[key] = { date: key, completed: 0, active: 0 };
    }

    trainings.forEach((t) => {
      const created = t.createdAt ? new Date(t.createdAt) : null;
      if (!created) return;
      const key = format(new Date(created), "yyyy-MM-dd");
      if (map[key]) {
        if (t.status === "completed") map[key].completed++;
        else map[key].active++;
      }
    });

    return days.map((d) => map[d]);
  }, [trainings, dateFrom, dateTo]);

  const sopByDept = useMemo(() => {
    const counts = {};
    sops.forEach((s) => {
      const dept = s.dept || "Unassigned";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.keys(counts).map((k) => ({ dept: k, count: counts[k] }));
  }, [sops]);

  const trainingsByEmployee = useMemo(() => {
    const map = {};

    // Initialize counters
    employees.forEach((e) => {
      map[e.firebaseUid] = {
        uid: e.firebaseUid,
        name: e.name || e.email,
        completed: 0,
        active: 0,
      };
    });

    trainings.forEach((t) => {
      const assignedList = t.assignedEmployees || [];
      const completedList = t.completedBy || [];

      // Case 1: Training is assigned to employees
      if (assignedList.length > 0) {
        assignedList.forEach((uid) => {
          if (!map[uid]) return;

          if (completedList.includes(uid)) {
            map[uid].completed++;
          } else {
            map[uid].active++;
          }
        });
      }

      // Case 2: Training is public (no assignedEmployees)
      else {
        // Count completion for whoever completed it
        completedList.forEach((uid) => {
          if (map[uid]) {
            map[uid].completed++;
          }
        });
      }
    });

    return Object.values(map);
  }, [trainings, employees]);


  const sopsByEmployee = useMemo(() => {
    const map = {};

    employees.forEach((e) => {
      map[e.firebaseUid] = {
        uid: e.firebaseUid,
        name: e.name || e.email,
        sopCount: 0,
        completedSOPs: 0,
      };
    });

    sops.forEach((s) => {
      const assigned = s.assignedEmployees || [];
      const completed = s.completedBy || [];

      assigned.forEach((uid) => {
        if (!map[uid]) return;

        map[uid].sopCount++;

        if (completed.includes(uid)) {
          map[uid].completedSOPs++;
        }
      });
    });

    return Object.values(map);
  }, [sops, employees]);


  const sopMap = useMemo(() => {
    const m = {};
    sopsByEmployee.forEach(e => m[e.uid] = e);
    return m;
  }, [sopsByEmployee]);

  // Leaderboard: sort by completed desc
  const leaderboard = useMemo(() => {
    return employees
      .map((e) => {
        const t = trainingsByEmployee.find((x) => x.uid === e.firebaseUid) || {
          completed: 0,
          active: 0,
        };

        const s = sopsByEmployee.find((x) => x.uid === e.firebaseUid) || {
          completedSOPs: 0,
          sopCount: 0,
        };

        return {
          uid: e.firebaseUid,
          name: e.name || e.email,
          completedTrainings: t.completed,
          completedSOPs: s.completedSOPs,
          totalScore: t.completed + s.completedSOPs,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);
  }, [employees, trainingsByEmployee, sopsByEmployee]);



  // ---------------------------
  // Table handling
  // ---------------------------
  const filteredTable = useMemo(() => {
    const q = (searchQ || "").trim().toLowerCase();

    // combine trainings & sops into a single dataset with type
    const items = [
      ...trainings.map((t) => ({ ...t, kind: "training" })),
      ...sops.map((s) => ({ ...s, kind: "sop" })),
    ];

    let out = items.filter((it) => {
      // department filter
      if (department !== "all") {
        if (it.kind === "training") {
          // training doesn't have dept, show all
        } else {
          if (it.dept !== department) return false;
        }
      }

      if (employeeFilter !== "all") {
        // if employeeFilter is set and kind is training, check assignedEmployees
        if (it.kind === "training") {
          if (!it.assignedEmployees || !it.assignedEmployees.includes(employeeFilter)) return false;
        }
      }

      if (q) {
        const text = JSON.stringify(it).toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });

    // sort
    out.sort((a, b) => {
      const aVal = a[sortBy.key];
      const bVal = b[sortBy.key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (sortBy.dir === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    // paginate
    const start = (page - 1) * pageSize;
    const paginated = out.slice(start, start + pageSize);

    return { total: out.length, rows: paginated };
  }, [trainings, sops, department, employeeFilter, searchQ, sortBy, page, pageSize]);

  // ---------------------------
  // Exports
  // ---------------------------
  const exportAllCSV = async () => {
    const columns = [
      { key: "_id", label: "ID" },
      { key: "kind", label: "Kind" },
      { key: "title", label: "Title" },
      { key: "dept", label: "Department" },
      { key: "status", label: "Status" },
      { key: "createdAt", label: "Created At" },
    ];

    const rows = [
      ...trainings.map((t) => ({ ...t, kind: "training", createdAt: t.createdAt })),
      ...sops.map((s) => ({ ...s, kind: "sop", createdAt: s.updated })),
    ];

    const csv = toCSV(rows, columns);
    downloadCSV(`reports-${format(new Date(), "yyyyMMdd-HHmmss")}.csv`, csv);
  };

  // ---------------------------
  // Actions
  // ---------------------------
  const refresh = async () => {
    setLoading(true);
    try {
      const [tvs, sp, empRes, lg, st] = await Promise.all([
        authFetch("/api/training"),
        authFetch("/api/sops"),
        authFetch("/api/employees"),
        authFetch("/api/logs"),
        authFetch("/api/stats"),
      ]);
      setTrainings(tvs);
      setSOPs(sp);
      setEmployees(empRes.employees || []);
      setLogs(lg);
      setStats(st);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between gap-6 mb-6">
        <h1 className="text-2xl font-semibold">Reports & Analytics</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              placeholder="Search SOPs or Trainings..."
              className="border rounded-lg px-3 py-2 w-96 shadow-sm"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          <button onClick={refresh} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md">
            <RefreshCw size={16} /> Refresh
          </button>

          <div className="relative">
            <button onClick={exportAllCSV} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Employees" value={(stats && stats.employees) ?? "-"} />
        <KPICard title="Active Trainings" value={(stats && stats.activeTrainings) ?? "-"} />
        <KPICard title="Completed Trainings" value={(stats && stats.completedTrainings) ?? "-"} />
        <KPICard title="Pending SOPs" value={(stats && stats.pendingSOPs) ?? "-"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column: Time series + table */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow border">
            <SectionTitle
              title={`Training completions (${dateFrom} → ${dateTo})`}
              right={
                <div className="flex items-center gap-3">
                  <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded p-1" />
                  <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded p-1" />
                </div>
              }
            />

            <TrainingsCompletionLine data={trainingsTimeSeries} />
          </div>
{/* 
          <div className="bg-white p-4 rounded-xl shadow border">
            <SectionTitle title="Top Performers (by completed trainings)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                {leaderboard.length === 0 ? (
                  <p className="text-gray-500">No data</p>
                ) : (
                  <ol className="space-y-2">
                    {leaderboard.map((u, idx) => (
                      <li key={u.uid} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-gray-500">
                            Trainings: {u.completedTrainings} | SOPs: {u.completedSOPs}
                          </div>

                        </div>

                        <div className="text-blue-600 font-semibold">{u.totalScore}</div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="col-span-1">
                <TrainingsByEmployeeBar data={trainingsByEmployee.slice(0, 20)} />
              </div>
            </div>
          </div> */}

          <div className="bg-white p-4 rounded-xl shadow border">
            <SectionTitle title="Activity & Audit Table" right={<div className="text-sm text-gray-500">Showing {filteredTable.total} items</div>} />

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="p-2">Type</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">Dept</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTable.rows.map((row) => (
                    <tr key={row._id} className="border-t hover:bg-gray-50">
                      <td className="p-2 capitalize">{row.kind}</td>
                      <td className="p-2 font-medium">{row.title}</td>
                      <td className="p-2">{row.dept || "-"}</td>
                      <td className="p-2 capitalize">{row.status || "-"}</td>
                      <td className="p-2">{row.createdAt ? new Date(row.createdAt).toLocaleString() : (row.updated ? new Date(row.updated).toLocaleString() : "-")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">Page {page} / {Math.max(1, Math.ceil(filteredTable.total / pageSize))}</div>

              <div className="flex items-center gap-2">
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1">
                  {[6, 12, 24, 48].map((s) => (<option key={s} value={s}>{s} / page</option>))}
                </select>

                <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
                <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: pie + SOP list + logs */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow border">
            <SectionTitle title="SOPs by Department" />
            <DeptSOPPie data={sopByDept} />
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <SectionTitle title="Recent SOPs" right={<div className="text-xs text-gray-500">Latest</div>} />
            <div className="space-y-3">
              {sops.slice(0, 6).map((s) => (
                <div key={s._id} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-md"><Clock size={18} /></div>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.dept} • Updated {s.updated ? new Date(s.updated).toLocaleDateString() : "-"}</div>
                  </div>
                </div>
              ))}
              {sops.length === 0 && <p className="text-gray-500">No SOPs yet</p>}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border h-96 overflow-y-auto">
            <SectionTitle title="Live Activity Logs" right={<div className="text-xs text-gray-500">Real-time</div>} />
            <ul className="space-y-2">
              {logs.map((l) => (
                <li key={l._id || l.createdAt} className="text-sm text-gray-700 p-2 rounded hover:bg-gray-50">
                  <div className="text-xs text-gray-500">{new Date(l.createdAt).toLocaleString()}</div>
                  <div className="font-medium">{l.message}</div>
                </li>
              ))}
              {logs.length === 0 && <p className="text-gray-500">No logs yet</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
