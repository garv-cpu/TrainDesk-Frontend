import { useEffect, useState } from "react";
import DemoHeader from "./DemoHeader";
import DemoSidebar from "./DemoSidebar";
import DemoStatsCards from './DemoStatsCards';
import DemoActivityFeed from './DemoActivityFeed';
import DemoRecentSOPs from './DemoRecentSOPs';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function DemoDashboard() {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="flex">

            {/* 📱 MOBILE SIDEBAR  */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => {
                    navigate(item.path);
                    closeSidebar && closeSidebar();
                }}
                >
                    <div
                        className="absolute left-0 top-0 h-full w-64 bg-white shadow-md p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DemoSidebar closeSidebar={closeSidebar} />
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
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
}
