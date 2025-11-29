import { Outlet, Link } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold mb-6">Employee Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/employee" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/employee/training" className="hover:text-blue-600">Training</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}
