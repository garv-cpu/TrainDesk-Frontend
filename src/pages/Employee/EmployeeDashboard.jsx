import React, { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";
import { Loader2 } from "lucide-react";

const EmployeeDashboard = () => {
  const [assigned, setAssigned] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // 1. ASSIGNED TRAINING (already filtered by backend)
        const assignedRes = await authFetch("/api/employee/training");
        setAssigned(assignedRes);

        // 2. EMPLOYEE PROGRESS
        const progressRes = await authFetch("/api/employee/progress");
        setProgress(progressRes);

        // 3. COUNTS
        const completed = progressRes.filter((p) => p.completed).length;
        const pending = assignedRes.length - completed;

        setCompletedCount(completed);
        setPendingCount(pending);

        // 4. OVERALL %
        const percent =
          assignedRes.length > 0
            ? Math.round((completed / assignedRes.length) * 100)
            : 0;

        setOverallProgress(percent);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []); // 🔥 correct dependency so no infinite loop

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Welcome Back 👋</h1>
        <p className="text-slate-600 mt-1">
          Here's your training overview for today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">
            Assigned Trainings
          </h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">
            {assigned.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {completedCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">Pending</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {pendingCount}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Overall Progress
        </h2>

        <div className="w-full bg-blue-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>

        <p className="text-sm text-slate-600 mt-2">
          {overallProgress}% completed
        </p>
      </div>

      {/* Assigned video list */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Your Trainings
        </h2>

        {assigned.length === 0 ? (
          <p className="text-slate-500">No trainings assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {assigned.map((video) => {
              const isCompleted = progress.find(
                (p) => p.videoId === video._id && p.completed
              );

              return (
                <div
                  key={video._id}
                  className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100"
                >
                  <div>
                    <h3 className="font-semibold text-blue-700">
                      {video.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {video.description}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
