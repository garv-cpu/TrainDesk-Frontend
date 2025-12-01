import { useAuth } from "../utils/AuthContext";
import { usePricing } from "../utils/PricingContext";
import { useNavigate } from "react-router-dom";

export default function usePricingOrLogin() {
  const { user } = useAuth();
  const { openPricing } = usePricing();
  const navigate = useNavigate();

  return () => {
    if (user) {
      // If logged in → go to dashboard
      navigate("/dashboard");
    } else {
      // If not logged in → open pricing modal
      openPricing();
    }
  };
}
