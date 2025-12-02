import React, { useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { Search, RefreshCw, Download, Clock } from "lucide-react";
import { saveAs } from "file-saver";

// --------------------------------------------------
// SAMPLE DEMO DATA
// --------------------------------------------------
const sampleTrainings = [
    { id: 1, title: "Safety Training", active: 10, date: "2025-02-01" },
    { id: 2, title: "Customer Handling", active: 6, date: "2025-02-02" },
    { id: 3, title: "Machine Operations", active: 15, date: "2025-02-03" },
    { id: 4, title: "Team Briefing", active: 0, date: "2025-02-04" }, // GAP day removed later
];


const sampleSOPs = [
    { id: "s1", title: "Fire SOP", dept: "Security", updated: "2025-02-01" },
    { id: "s2", title: "Cash Counter SOP", dept: "Finance", updated: "2025-02-03" },
    { id: "s3", title: "Inventory SOP", dept: "Operations", updated: "2025-02-04" },
];

const pieData = [
    { dept: "Operations", count: 12 },
    { dept: "Finance", count: 7 },
    { dept: "Security", count: 5 },
    { dept: "HR", count: 3 },
];

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444"];

// --------------------------------------------------
// DEMO EXPORT CSV
// --------------------------------------------------
function downloadCSV() {
    const csv = "Type,Title,Dept\n" +
        sampleSOPs.map((s) => `SOP,${s.title},${s.dept}`).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "demo_reports.csv");
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------
export default function DemoReports() {
    const [searchQ, setSearchQ] = useState("");

    // Filter fake table
    const filtered = useMemo(() => {
        if (!searchQ.trim()) return sampleSOPs;
        return sampleSOPs.filter((s) =>
            s.title.toLowerCase().includes(searchQ.toLowerCase())
        );
    }, [searchQ]);

    return (
        <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Demo Reports & Analytics</h1>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            placeholder="Search..."
                            className="border rounded-lg px-3 py-2 w-64 shadow-sm"
                            value={searchQ}
                            onChange={(e) => setSearchQ(e.target.value)}
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-400" />
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md">
                        <RefreshCw size={16} /> Refresh
                    </button>

                    <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* KPI cards */}
            {/* KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title="Total Employees" value="34" />
                <KPICard title="Active Trainings" value="12" />
                <KPICard title="Pending SOPs" value="16" />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left */}
                <div className="col-span-2 space-y-6">

                    {/* Line Chart */}
                    <div className="bg-white p-4 rounded-xl shadow border">
                        <h3 className="font-semibold mb-3">Training Completion Trend</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={sampleTrainings}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line dataKey="completed" stroke="#2563EB" strokeWidth={2} />
                                <Line dataKey="active" stroke="#F59E0B" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Demo Table */}
                    <div className="bg-white p-4 rounded-xl shadow border">
                        <h3 className="font-semibold mb-3">Recent SOP Activity</h3>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 text-xs">
                                    <th className="p-2">Title</th>
                                    <th className="p-2">Department</th>
                                    <th className="p-2">Updated</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id} className="border-t hover:bg-gray-50">
                                        <td className="p-2">{s.title}</td>
                                        <td className="p-2">{s.dept}</td>
                                        <td className="p-2">{s.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right */}
                <div className="space-y-6">
                    {/* Pie Chart */}
                    <div className="bg-white p-4 rounded-xl shadow border">
                        <h3 className="font-semibold mb-3">SOPs by Department</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={pieData} dataKey="count" nameKey="dept" outerRadius={80}>
                                    {pieData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Recent SOPs */}
                    <div className="bg-white p-4 rounded-xl shadow border">
                        <h3 className="font-semibold mb-3">Recent SOPs</h3>

                        {sampleSOPs.map((s) => (
                            <div key={s.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="bg-blue-50 text-blue-600 p-2 rounded-md">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <div className="font-medium">{s.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {s.dept} • Updated {s.updated}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

// Small KPI Card Component
function KPICard({ title, value }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow border">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">{value}</div>
        </div>
    );
}
