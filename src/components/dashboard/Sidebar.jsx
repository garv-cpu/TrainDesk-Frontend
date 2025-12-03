import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart,
    X,
} from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Employees", icon: Users, path: "/dashboard/employees" },
        { label: "Training", icon: BookOpen, path: "/dashboard/training" },
        { label: "Training Progress", icon: BarChart, path: "/dashboard/training-progress" },
        { label: "SOPs", icon: FileText, path: "/dashboard/sops" },
        { label: "Reports", icon: BarChart, path: "/dashboard/reports" },
    ];

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
                    /* DESKTOP — make it extend with the page height */
                    lg:sticky lg:h-full lg:min-h-screen lg:w-64 
                    lg:bg-white lg:shadow-lg lg:border-r lg:p-6 lg:translate-x-0
                    
                    bg-white border-r shadow-sm p-6 select-none w-64 min-h-screen
                    fixed top-0 left-0 z-40
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:static lg:block
                `}
            >
                {/* MOBILE CLOSE BUTTON */}
                <button
                    className="lg:hidden mb-6 text-gray-700 hover:text-gray-900"
                    onClick={closeSidebar}
                >
                    <X size={26} />
                </button>

                {/* BRAND */}
                <h1
                    onClick={() => {
                        navigate("/dashboard");
                        closeSidebar();
                    }}
                    className="text-blue-600 text-2xl font-bold mb-10 cursor-pointer"
                >
                    TrainDesk
                </h1>

                {/* NAVIGATION */}
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
            </aside>
        </>
    );
}
