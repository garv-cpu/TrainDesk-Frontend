import { useEffect, useState } from "react";

import StatsCards from '../components/dashboard/StatsCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import RecentSOPs from '../components/dashboard/RecentSOPs';
import SkeletonLoader from '../components/SkeletonLoader';
import TrainingBreakdown from '../components/dashboard/TrainingBreakdown';

const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">

                {/* StatsCards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1,2,3,4].map((i) => (
                        <SkeletonLoader key={i} height="h-32" />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Activity Feed Skeleton */}
                    <div className="lg:col-span-2 space-y-4">
                        <SkeletonLoader height="h-6" width="w-1/3" />
                        <SkeletonLoader height="h-48" />
                        <SkeletonLoader height="h-48" />
                    </div>

                    {/* Sidebar right column */}
                    <div className="space-y-6">

                        {/* Quick Actions Skeleton */}
                        <SkeletonLoader height="h-40" />

                        {/* Recent SOP Skeleton */}
                        <SkeletonLoader height="h-40" />

                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="space-y-6">
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-6">
                    <ActivityFeed />
                    {/* <TrainingBreakdown /> */}
                </div>

                <div className="space-y-6">
                    <RecentSOPs />
                </div>

            </div>

        </div>
    );
}

export default Dashboard;
