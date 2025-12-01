import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { authFetch } from "../../utils/api";

export default function EmployeeSOPListPage() {
  const [sops, setSops] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const sopData = await authFetch("/api/employee/sops");
        setSops(sopData);

        const empData = await authFetch("/api/employees/me");
        setEmployee(empData);
      } catch (err) {
        console.error("Failed to load:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading)
    return <p className="text-blue-600 text-lg">Loading SOPs...</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">
          Standard Operating Procedures
        </h1>

        <p className="text-slate-600 mt-1">
          {employee
            ? `Review SOPs assigned to you by ${employee.assignedBy || "your manager"}.`
            : "Review SOPs assigned to you."}
        </p>
      </div>

      {/* SOP List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sops.length === 0 && (
          <p className="text-slate-600">No SOPs available.</p>
        )}

        {sops.map((sop) => (
          <Link
            key={sop._id}
            to={`${sop._id}`}
            className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:bg-blue-50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="text-blue-700" size={28} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  {sop.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {sop.dept || "General"}
                </p>
              </div>
            </div>

            {/* ⭐ NEW — SOP DESCRIPTION PREVIEW */}
            <p className="mt-4 text-sm text-slate-700 line-clamp-3">
              {sop.content ? sop.content.substring(0, 180) + "..." : "No description available."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
