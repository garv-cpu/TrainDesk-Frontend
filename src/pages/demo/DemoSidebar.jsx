import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart,
} from "lucide-react";

export default function DemoSidebar({ isOpen, closeSidebar }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/demo" },
        { label: "Employees", icon: Users, path: "/demo/employees" },
        { label: "Training", icon: BookOpen, path: "/demo/training" },
        { label: "SOPs", icon: FileText, path: "/demo/sops" },
        { label: "Reports", icon: BarChart, path: "/demo/reports" },
    ];

    return (
        <aside
            className={`
                bg-white border-r shadow-sm p-6 select-none w-64 min-h-screen
                fixed top-0 left-0 z-50
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:block
            `}
        >
            <h1
                onClick={() => {
                    navigate("/demo");
                    closeSidebar();
                }}
                className="text-blue-600 text-2xl font-bold mb-10 cursor-pointer"
            >
                TrainDesk (Demo)
            </h1>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;

                    return (
                        <div
                            key={item.label}
                            onClick={() => {
                                navigate(item.path);
                                closeSidebar();
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg cursor-pointer transition
                                ${
                                    active
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-700 hover:bg-blue-50"
                                }
                            `}
                        >
                            <Icon
                                size={20}
                                className={active ? "text-white" : "text-black"}
                            />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            <p className="mt-10 text-xs text-gray-500 text-center">
                * Demo — Navigation Enabled
            </p>
        </aside>
    );
}
