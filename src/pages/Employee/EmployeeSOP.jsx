import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authFetch } from "../../utils/api";

export default function EmployeeSOP() {
  const { id } = useParams();
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [progress, setProgress] = useState(null);


  useEffect(() => {
    authFetch(`/api/sops/${id}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProgress);
  }, [id]);

  useEffect(() => {
    async function loadSOP() {
      try {
        const data = await authFetch(`/api/employee/sops/${id}`);
        setSop(data);
      } catch (err) {
        console.error("Failed to load SOP:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSOP();
  }, [id]);

  useEffect(() => {
    authFetch(`/api/employees/me/sop-progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStats);
  }, []);

  // MARK SOP COMPLETE
  const markComplete = async () => {
    setMarking(true);
    try {
      const res = await authFetch(`/api/sops/${id}/complete`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("SOP marked as completed!");
      const data = await res.json();
      setProgress(data);
      setSop((prev) => ({ ...prev, completed: true }));
    } catch (err) {
      toast.error("Failed to mark completed");
    } finally {
      setMarking(false);
    }
  };

  if (loading) return <p className="text-blue-600 text-lg">Loading SOP...</p>;
  if (!sop) return <p className="text-red-600">SOP not found.</p>;

  return (
    <div className="space-y-6">

      {/* Back Button */}
      <Link
        to="/employee/sops"
        className="inline-flex items-center gap-2 text-blue-700 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to SOPs
      </Link>

      {/* SOP Header */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <FileText className="text-blue-700" size={32} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-700">{sop.title}</h1>
          <p className="text-slate-600 mt-1">{sop.dept || "General"}</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
        <div
          className="bg-blue-600 h-full"
          style={{ width: `${stats.percentage}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {stats.completed}/{stats.totalSops} SOPs Completed ({stats.percentage}%)
      </p>


      {/* SOP Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Description</h2>

        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {sop.content || "No description provided."}
        </p>
      </div>

      {/* COMPLETE BUTTON */}
      {!sop.completed ? (
        <button
          onClick={markComplete}
          disabled={marking}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow transition"
        >
          <CheckCircle size={20} />
          {marking ? "Marking..." : "Mark as Completed"}
        </button>
      ) : (
        <div className="flex items-center gap-2 text-green-600 text-lg font-medium">
          <CheckCircle size={22} />
          Completed
        </div>
      )}
      {progress?.completed ? (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          Completed on {new Date(progress.completedAt).toLocaleDateString()}
          <a
            className="text-blue-600 underline ml-3"
            href={progress.certificateUrl}
            target="_blank"
          >
            Download Certificate
          </a>
        </div>
      ) : (
        <button
          onClick={markComplete}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Mark as Completed
        </button>
      )}


    </div>
  );
}
