import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Right side */}
      <div className="flex-1 flex flex-col">

        {/* Header with menu button */}
        <Header openSidebar={() => setIsSidebarOpen(true)} />

        {/* Page content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
