import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";

export default function PublicRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();

  if (loadingAuth || role === "loading") return <PageSkeleton />;

  if (user && role === "admin") return <Navigate to="/dashboard" replace />;
  if (user && role === "employee") return <Navigate to="/employee" replace />;

  return children;
}
