import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    FileText,
    BarChart,
    Menu,
    X
} from "lucide-react";

import DemoHeader from "./DemoHeader";
import DemoStatsCards from './DemoStatsCards';
import DemoActivityFeed from './DemoActivityFeed';
import DemoRecentSOPs from './DemoRecentSOPs';
import SkeletonLoader from '../../components/SkeletonLoader';
import { useNavigate } from "react-router-dom";

// ---------------- DEMO SIDEBAR ----------------

// ---------------- MAIN DEMO DASHBOARD ----------------
const DemoDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("Dashboard");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    const closeSidebar = () => setIsOpen(false);

    if (loading) {
        return (
            <div className="flex">

                <div className="flex-1">
                 

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <SkeletonLoader key={i} height="h-32" />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            <div className="lg:col-span-2 space-y-4">
                                <SkeletonLoader height="h-6" width="w-1/3" />
                                <SkeletonLoader height="h-48" />
                                <SkeletonLoader height="h-48" />
                            </div>

                            <div className="space-y-6">
                                <SkeletonLoader height="h-40" />
                                <SkeletonLoader height="h-40" />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">



            <div className="flex-1">
        

                <div className="p-6 space-y-6">
                    <DemoStatsCards />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <DemoActivityFeed />
                        </div>

                        <div className="space-y-6">
                            <DemoRecentSOPs />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DemoDashboard;
