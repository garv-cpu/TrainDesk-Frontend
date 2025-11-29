import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "./../utils/AuthContext";

export default function EmployeePrivateRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();

  if (loadingAuth || role === "loading") return <PageSkeleton />;

  if (!user) return <Navigate to="/employee/login" replace />;

  if (role !== "employee") return <Navigate to="/dashboard" replace />;

  return children;
}
