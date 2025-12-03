import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";

export default function DemoTrainingProgress() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulated API delay
    setTimeout(() => {
      setRecords([
        {
          _id: "1",
          employeeName: "Aarav Sharma",
          videoTitle: "Company Orientation",
          percent: 100,
          completed: true,
          updatedAt: "2025-01-02T12:45:00",
        },
        {
          _id: "2",
          employeeName: "Priya Singh",
          videoTitle: "Safety Training",
          percent: 40,
          completed: false,
          updatedAt: "2025-01-01T09:20:00",
        },
        {
          _id: "3",
          employeeName: "Rohan Verma",
          videoTitle: "Customer Service Basics",
          percent: 75,
          completed: false,
          updatedAt: "2025-01-03T16:10:00",
        },
        {
          _id: "4",
          employeeName: "Neha Gupta",
          videoTitle: "Sales Demo Training",
          percent: 100,
          completed: true,
          updatedAt: "2025-01-04T11:05:00",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = records.filter((r) =>
    `${r.employeeName} ${r.videoTitle}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center mt-10 text-blue-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Training Progress Report (Demo)
      </h1>

      {/* Feature Not Available Note */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-6 flex items-center gap-3">
        <Info size={20} />
        <span>
          This feature is <b>not available</b> in the actual application.  
          You are viewing a <b>demo preview</b>. Full version coming soon!
        </span>
      </div>

      {/* Coming Soon Center Message */}
      <div className="flex items-center justify-center my-10">
        <h2 className="text-2xl font-semibold text-blue-600">
          🚀 Coming Soon – Advanced Training Analytics
        </h2>
      </div>

      <input
        placeholder="Search employee or video"
        className="border px-4 py-2 rounded-lg w-full max-w-md mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-50 text-blue-700">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Video</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Completed</th>
              <th className="p-4">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r._id} className="border-b hover:bg-blue-50/40">
                <td className="p-4 font-medium">{r.employeeName}</td>
                <td className="p-4">{r.videoTitle}</td>

                <td className="p-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${r.percent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{r.percent}%</span>
                </td>

                <td className="p-4">
                  {r.completed ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16} /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle size={16} /> No
                    </span>
                  )}
                </td>

                <td className="p-4 text-gray-500 text-sm">
                  {new Date(r.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
