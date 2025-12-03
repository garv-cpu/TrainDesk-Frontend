import { Navigate, useLocation } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";
import { usePricing } from "../utils/PricingContext";

export default function PublicRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();
  const { isPaid } = usePricing();
  const location = useLocation();

  // While auth loading
  if (loadingAuth || role === "loading") return <PageSkeleton />;

  // -------------------------------
  // 1️⃣ Allow homepage even if NOT paid
  // -------------------------------
  if (!isPaid && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  // -------------------------------
  // 2️⃣ Already logged in → redirect properly
  // -------------------------------
  if (user && role === "admin") return <Navigate to="/dashboard" replace />;
  if (user && role === "employee") return <Navigate to="/employee" replace />;

  return children;
}
