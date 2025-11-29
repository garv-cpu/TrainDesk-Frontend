import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();

  if (loadingAuth || role === "loading") return <PageSkeleton />;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "admin") return <Navigate to="/employee" replace />;

  return children;
}
