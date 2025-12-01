import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart,
    X
} from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {

    const navigate = useNavigate();

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Employees", icon: Users, path: "/dashboard/employees" },
        { label: "Training", icon: BookOpen, path: "/dashboard/training" },
        { label: "SOPs", icon: FileText, path: "/dashboard/sops" },
        { label: "Reports", icon: BarChart, path: "/dashboard/reports" },
    ];

    const [active, setActive] = useState("Dashboard");

    const handleNavigation = (item) => {
        setActive(item.label);
        navigate(item.path);

        if (closeSidebar) closeSidebar();
    };

    return (
        <>
            {/* MOBILE OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    z-40 top-0 
                    
                    /* DESKTOP — make it extend with the page height */
                    lg:sticky lg:h-full lg:min-h-screen lg:w-64 
                    lg:bg-white lg:shadow-lg lg:border-r lg:p-6 lg:translate-x-0

                    /* MOBILE */
                    fixed w-64 p-6 bg-white shadow-xl border-r
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* Mobile Close Button */}
                <button
                    className="lg:hidden mb-6 text-gray-700 hover:text-gray-900"
                    onClick={closeSidebar}
                >
                    <X size={26} />
                </button>

                {/* Brand */}
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="
                        mb-10 cursor-pointer select-none font-bold
                        text-blue-600 text-2xl
                        text-left
                    "
                >
                    TrainDesk
                </h1>

                {/* Nav List */}
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.label;

                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item)}
                                className={`
                                    flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all
                                    ${isActive
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-700 hover:bg-blue-50"
                                        }
                                `}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
