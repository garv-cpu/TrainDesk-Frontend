import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../utils/api";

export default function ViewSOP() {
  const { id } = useParams();
  const [sop, setSOP] = useState(null);

  useEffect(() => {
    const fetchSOP = async () => {
      try {
        const data = await authFetch(`/api/sops/${id}`);
        setSOP(data);
      } catch (err) {
        console.error("Failed to load SOP:", err);
      }
    };

    fetchSOP();
  }, [id]);

  if (!sop) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-4">{sop.title}</h1>
      <p className="text-gray-600 mb-2">
        Department: <span className="font-medium">{sop.dept}</span>
      </p>
      <p className="text-gray-600 mb-6">
        Updated: {new Date(sop.updated).toLocaleDateString()}
      </p>

      <div className="bg-white p-6 border rounded-lg shadow-sm leading-relaxed">
        {sop.content}
      </div>
    </div>
  );
}
