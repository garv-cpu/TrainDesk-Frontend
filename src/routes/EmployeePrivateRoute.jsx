import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";

export default function EmployeePrivateRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();

  // still loading firebase or backend role
  if (loadingAuth || role === "loading") return <PageSkeleton />;

  // not logged in
  if (!user) return <Navigate to="/employee/login" replace />;

  // logged in but NOT employee → send to admin dashboard
  if (role !== "employee") return <Navigate to="/dashboard" replace />;

  return children;
}
