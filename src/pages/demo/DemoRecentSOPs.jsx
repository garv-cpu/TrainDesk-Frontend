import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemoRecentSOPs() {
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // --- DEMO DATA ---
    const demoSops = [
      { _id: "1", title: "Safety Guidelines", updated: "2025-02-10" },
      { _id: "2", title: "Client Handling SOP", updated: "2025-02-09" },
      { _id: "3", title: "Daily Operations Checklist", updated: "2025-02-07" },
      { _id: "4", title: "Onboarding Process", updated: "2025-02-05" },
      { _id: "5", title: "Workplace Security Protocol", updated: "2025-02-02" },
      { _id: "6", title: "Leave Request Procedure", updated: "2025-02-01" },
    ];

    setTimeout(() => {
      setSops(demoSops);
      setLoading(false);
    }, 800); // imitate loading
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 text-lg">Recent SOPs</h2>
        <span className="text-blue-600 text-sm cursor-pointer">View all</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
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
