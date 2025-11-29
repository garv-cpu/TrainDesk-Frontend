import { useAuth } from "../utils/AuthContext";
import { usePricing } from "../utils/PricingContext";
import { useNavigate } from "react-router-dom";

export default function usePricingOrLogin() {
  const { user, hasSubscription } = useAuth();
  const { openPricing } = usePricing();
  const navigate = useNavigate();

  return () => {
    if (user && hasSubscription) navigate("/login");
    else openPricing();
  };
}
