import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart,
    Settings,
    X
} from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {

    const navigate = useNavigate();

    const menuItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
        { label: "Employees", icon: <Users size={18} />, path: "/dashboard/employees" },
        { label: "Training", icon: <BookOpen size={18} />, path: "/dashboard/training" },
        { label: "SOPs", icon: <FileText size={18} />, path: "/dashboard/sops" },
        { label: "Reports", icon: <BarChart size={18} />, path: "/dashboard/reports" },
        // { label: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
    ];

    const [active, setActive] = useState("Dashboard");

    const handleNavigation = (item) => {
        setActive(item.label);
        navigate(item.path);

        // close sidebar on mobile
        if (closeSidebar) closeSidebar();
    };

    return (
        <>
            {/* MOBILE OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
        w-64 bg-white shadow-lg min-h-screen p-6 z-30 sticky top-0
        fixed lg:static left-0
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
            >

                {/* Close button (mobile only) */}
                <button
                    className="lg:hidden mb-4 text-gray-600"
                    onClick={closeSidebar}
                >
                    <X size={24} />
                </button>

                <h1 onClick={() => navigate("/dashboard")} className="text-2xl font-semibold text-blue-600 mb-10 cursor-pointer">TrainDesk</h1>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item)}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left
                                ${active === item.label
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-blue-50"
                                }
                            `}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}
