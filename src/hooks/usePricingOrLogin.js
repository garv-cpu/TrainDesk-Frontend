import { useAuth } from "../utils/AuthContext";
import { usePricing } from "../utils/PricingContext";
import { useNavigate } from "react-router-dom";

export default function usePricingOrLogin() {
  const { user, role } = useAuth();   // <-- role must come from your context
  const { openPricing } = usePricing();
  const navigate = useNavigate();

  return () => {
    if (user && role === "admin") {
      navigate("/dashboard");  // logged in admin → dashboard
    } else {
      openPricing();           // not admin or not logged in → pricing modal
    }
  };
}
