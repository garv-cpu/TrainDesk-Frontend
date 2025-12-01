import { signOut } from "firebase/auth";
import { Outlet, Link, useLocation,useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";


export default function EmployeeLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-lg transition ${
      pathname.startsWith(path)
        ? "bg-blue-600 text-white"
        : "text-blue-700 hover:bg-blue-100"
    }`;

    const handleLogout = async () => {
            await signOut(auth);
            navigate("/login");
        };

  return (
    <div className="min-h-screen flex bg-blue-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-blue-100 shadow-sm p-6 flex flex-col">
        
        <h2 className="text-2xl font-bold text-blue-700 mb-8 tracking-tight">
          TrainDesk
        </h2>

        <nav className="flex flex-col gap-2 text-base font-medium">
          
          {/* Dashboard */}
          <Link to="/employee" className={linkClasses("/employee")}>
            Dashboard
          </Link>

          {/* Training */}
          <Link to="/employee/training" className={linkClasses("/employee/training")}>
            Training
          </Link>

          {/* SOP List */}
          <Link to="/employee/sops" className={linkClasses("/employee/sops")}>
            SOP’s
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-blue-100">
          <button onClick={handleLogout} className="w-full py-2 text-left text-sm text-red-600 hover:text-red-700">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>

    </div>
  );
}
