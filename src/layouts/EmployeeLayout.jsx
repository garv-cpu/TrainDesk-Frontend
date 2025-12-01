import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

import {
  Home,
  BookOpen,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function EmployeeLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition text-base font-medium
     ${pathname.startsWith(path)
       ? "bg-blue-600 text-white shadow-md"
       : "text-gray-700 hover:bg-blue-50"
     }
    `;

  return (
    <div className="min-h-screen bg-blue-50 flex">

      {/* ------------------------------------
         MOBILE TOP NAV
      ------------------------------------- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white shadow-sm border-b flex items-center justify-between px-4 z-30">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={26} className="text-blue-700" />
        </button>

        <h1
          className="text-xl font-semibold text-blue-700"
          onClick={() => navigate("/employee")}
        >
          TrainDesk
        </h1>

        <div className="w-6"></div>
      </div>

      {/* ------------------------------------
         OVERLAY (mobile)
      ------------------------------------- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ------------------------------------
         SIDEBAR
      ------------------------------------- */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-30
          h-screen lg:h-auto
          w-72 lg:w-64
          bg-white border-r shadow-xl lg:shadow-sm
          transform transition-transform duration-300
          flex flex-col p-6
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* Close button (mobile) */}
        <button
          className="lg:hidden mb-6 text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          <X size={26} />
        </button>

        {/* Brand */}
        <h2 className="text-3xl lg:text-2xl font-bold text-blue-700 mb-10 tracking-tight">
          TrainDesk
        </h2>

        {/* Navigation */}
        <nav className="space-y-2 flex flex-col">
          <Link to="/employee" className={linkClasses("/employee")}>
            <Home size={20} /> Dashboard
          </Link>

          <Link
            to="/employee/training"
            className={linkClasses("/employee/training")}
          >
            <BookOpen size={20} /> Training
          </Link>

          <Link
            to="/employee/sops"
            className={linkClasses("/employee/sops")}
          >
            <FileText size={20} /> SOPs
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-6 border-t border-blue-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ------------------------------------
         MAIN CONTENT
      ------------------------------------- */}
      <main className="flex-1 p-6 lg:p-10 pt-20 lg:pt-10">
        <Outlet />
      </main>
    </div>
  );
}
