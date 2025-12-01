import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();

  // still loading
  if (loadingAuth || role === "loading") return <PageSkeleton />;

  // not logged in → go to admin login
  if (!user) return <Navigate to="/login" replace />;

  // logged in but NOT admin → send employee to employee dashboard
  if (role !== "admin") return <Navigate to="/employee" replace />;

  return children;
}
