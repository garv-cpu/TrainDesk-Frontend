import React from "react";

const EmployeeDashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Welcome Back 👋</h1>
        <p className="text-slate-600 mt-1">
          Here's your training overview for today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">Assigned Trainings</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">6</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">Pending</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">3</p>
        </div>
      </div>

      {/* Training Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Overall Progress</h2>

        <div className="w-full bg-blue-100 h-3 rounded-full">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>

        <p className="text-sm text-slate-600 mt-2">50% completed</p>
      </div>

    </div>
  );
};

export default EmployeeDashboard;
