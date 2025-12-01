import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/api";

export default function RecentSOPs() {
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSOPs = async () => {
      try {
        const data = await authFetch(`/api/sops`);

        // Sort newest → oldest & limit to 3
        const latest3 = data.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        ).slice(0, 6);

        setSops(latest3);
      } catch (err) {
        console.log("Failed to load SOPs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSOPs();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 text-lg">Recent SOPs</h2>
        <Link to="/dashboard/sops" className="text-blue-600 text-sm hover:underline cursor-pointer">
          View all
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : sops.length === 0 ? (
        <p className="text-sm text-gray-500">No SOPs found</p>
      ) : (
        <div className="space-y-4">
          {sops.map((item) => (
            <div key={item._id} className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-md">
                <FileText size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">{item.title}</p>

                <p className="text-xs text-gray-500">
                  Updated {new Date(item.updated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
