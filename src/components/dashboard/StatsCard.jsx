import { useEffect, useState } from "react";

export default function StatsCards() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = "https://traindesk-backend.onrender.com/api/stats";

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(API);
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Stats fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const skeleton = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 bg-white rounded-xl shadow border">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded mt-3 animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    if (loading || !stats) return skeleton;

    const cards = [
        { title: "Total Employees", value: stats.employees },
        { title: "Active Trainings", value: stats.activeTrainings },
        { title: "Completed Trainings", value: stats.completedTrainings },
        { title: "Pending SOPs", value: stats.pendingSOPs },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {cards.map((s) => (
                <div key={s.title} className="p-6 bg-white rounded-xl shadow border">
                    <h3 className="text-gray-500">{s.title}</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{s.value}</p>
                </div>
            ))}
        </div>
    );
}
