import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function DemoActivityFeed() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // --- DEMO ACTIVITY DATA ---
        const demo = [
            { message: "New training video uploaded: Workplace Safety 101", createdAt: "2025-02-10T12:21:00" },
            { message: "New SOP created: Customer Handling Procedure", createdAt: "2025-02-10T11:45:00" },
            { message: "SOP updated: Safety Guidelines v2.0", createdAt: "2025-02-10T10:15:00" },
            { message: "Training video removed: Onboarding Introduction", createdAt: "2025-02-09T16:00:00" },
            { message: "New employee added: John Parker", createdAt: "2025-02-09T13:27:00" },
            { message: "Employee removed: Sarah Wilson", createdAt: "2025-02-08T09:10:00" },
            { message: "SOP deleted: Warehouse Checklist", createdAt: "2025-02-07T17:40:00" },
            { message: "Training video updated: Sales Pitch Mastery", createdAt: "2025-02-07T15:22:00" }
        ];


        setActivities(demo);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow border h-full">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Recent Activity
            </h3>

            <ul
                className="space-y-4 overflow-y-auto pr-2"
                style={{ maxHeight: "440px" }}
            >
                {activities.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                    >
                        <Clock className="w-5 h-5 text-blue-600 mt-1" />

                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {item.message}
                            </p>

                            <p className="text-xs text-gray-500">
                                {new Date(item.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
