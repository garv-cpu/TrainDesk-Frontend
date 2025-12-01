import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { authFetch } from "../../utils/api";

export default function EmployeeSOP() {
  const { id } = useParams();

  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD SOP DETAILS
  useEffect(() => {
    (async () => {
      try {
        const sopData = await authFetch(`/api/employee/sops/${id}`);
        setSop(sopData);
      } catch (err) {
        console.error("SOP Load Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <p className="text-blue-600 text-lg">Loading SOP...</p>
    );

  if (!sop)
    return <p className="text-red-600">SOP not found.</p>;

  return (
    <div className="space-y-6">

      {/* BACK BUTTON */}
      <Link
        to="/employee/sops"
        className="inline-flex items-center gap-2 text-blue-700 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to SOPs
      </Link>

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <FileText className="text-blue-700" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{sop.title}</h1>
          <p className="text-slate-600 mt-1">{sop.dept || "General"}</p>
        </div>
      </div>

      {/* SOP CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">SOP Content</h2>
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {sop.content || "No content available."}
        </p>
      </div>
    </div>
  );
}
