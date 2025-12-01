import { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";

export default function StatsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await authFetch("/api/stats");
        setStats(data);
      } catch (err) {
        console.error("Stats API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // ------------------ LOADING SKELETON ------------------
  const skeleton = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-5 bg-white rounded-xl shadow border flex flex-col"
        >
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-300 rounded mt-3 animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  if (loading || !stats) return skeleton;

  // ------------------ FINAL CARDS ------------------
  const cards = [
    { title: "Total Employees", value: stats.employees },
    { title: "Active Trainings", value: stats.activeTrainings },
    { title: "Total SOPs", value: stats.totalSops },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
      {cards.map((s) => (
        <div
          key={s.title}
          className="p-5 bg-white rounded-xl shadow border flex flex-col"
        >
          <h3 className="text-gray-500">{s.title}</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
