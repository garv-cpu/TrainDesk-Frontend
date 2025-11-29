import { createContext, useContext, useState } from "react";

export const PricingContext = createContext();

export function usePricing() {
  return useContext(PricingContext);
}

export default function PricingProvider({ children }) {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const openPricing = () => setIsPricingOpen(true);
  const closePricing = () => setIsPricingOpen(false);

  return (
    <PricingContext.Provider value={{ isPricingOpen, openPricing, closePricing }}>
      {children}
    </PricingContext.Provider>
  );
}
