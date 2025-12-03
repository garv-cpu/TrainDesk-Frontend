import { Navigate, useLocation } from "react-router-dom";
import PageSkeleton from "../components/PageSkeleton";
import { useAuth } from "../utils/AuthContext";
import { usePricing } from "../utils/PricingContext";

export default function EmployeePrivateRoute({ children }) {
  const { user, role, loadingAuth } = useAuth();
  const { isPaid } = usePricing();
  const location = useLocation();

  // 1️⃣ Still loading firebase or backend role
  if (loadingAuth || role === "loading") return <PageSkeleton />;

  // 2️⃣ If website is NOT paid → block ALL protected pages
  if (!isPaid) {
    // Prevent infinite loop
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
  }

  // 3️⃣ Not logged in as employee → go to employee login
  if (!user) return <Navigate to="/employee/login" replace />;

  // 4️⃣ Logged in but NOT employee → redirect to admin dashboard
  if (role !== "employee") return <Navigate to="/dashboard" replace />;

  // 5️⃣ Access granted
  return children;
}
