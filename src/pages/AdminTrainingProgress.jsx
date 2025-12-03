import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import { Loader2 } from "lucide-react";

export default function AdminTrainingProgress() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Keep API call alive
  useEffect(() => {
    async function load() {
      try {
        const data = await authFetch("/api/admin/training/progress");
        setRecords(data);
      } catch (err) {
        console.error("Progress load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Keep calculations + filtering
  const filtered = records.filter((r) =>
    `${r.employeeName} ${r.videoTitle}`.toLowerCase().includes(search.toLowerCase())
  );

  // Loading spinner stays
  if (loading)
    return (
      <div className="flex justify-center mt-20 text-blue-600">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  // Replace entire page with coming soon
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600">Coming Soon</h1>
    </div>
  );
}
