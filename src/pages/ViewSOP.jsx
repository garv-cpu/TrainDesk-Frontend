import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";
import toast from "react-hot-toast";

export default function ViewSOP() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sop, setSOP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSOP = async () => {
      try {
        const data = await authFetch(`/api/sops/${id}`);
        setSOP(data);
      } catch (err) {
        console.error("Failed to load SOP:", err);
        setError(err.message || "Failed to load SOP");
      } finally {
        setLoading(false);
      }
    };

    fetchSOP();
  }, [id]);


  // ----------------------------------
  // CLEAR SOP FUNCTION
  // ----------------------------------
  const handleClearSOP = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear this SOP? This action cannot be undone."
    );
    if (!confirmClear) return;

    try {
      const updated = await authFetch(`/api/sops/${id}/clear`, {
        method: "PUT",
      });

      setSOP(updated); // instantly update UI
      toast.success("SOP cleared successfully.");
    } catch (err) {
      toast.error("Failed to clear SOP.");
    }
  };


  // -----------------------
  // LOADING STATE
  // -----------------------
  if (loading)
    return <div className="p-10 text-gray-500 text-lg">Loading SOP...</div>;

  // -----------------------
  // ERROR STATE
  // -----------------------
  if (error)
    return (
      <div className="p-10">
        <div className="p-6 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          <p className="font-medium mb-3">Error loading SOP</p>
          <p>{error}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );

  if (!sop) return <div className="p-10">No SOP found.</div>;


  // -----------------------
  // SUCCESS UI
  // -----------------------
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">{sop.title}</h1>

        {/* CLEAR SOP BUTTON */}
        <button
          onClick={handleClearSOP}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear SOP
        </button>
      </div>

      <p className="text-gray-600 mb-2">
        Department: <span className="font-medium">{sop.dept}</span>
      </p>

      <p className="text-gray-600 mb-6">
        Updated: {sop.updated ? new Date(sop.updated).toLocaleDateString() : "N/A"}
      </p>

      <div
        className="bg-white p-6 border rounded-lg shadow-sm leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: sop.content }}
      />
    </div>
  );
}
