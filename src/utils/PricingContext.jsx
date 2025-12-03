import { createContext, useContext, useState, useEffect } from "react";

export const PricingContext = createContext();

export function usePricing() {
  return useContext(PricingContext);
}

export default function PricingProvider({ children }) {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Store whether the user purchased TrainDesk
  const [isPaid, setIsPaid] = useState(() => {
    return localStorage.getItem("isPaid") === "true";
  });

  // When payment done, mark as paid
  const markAsPaid = () => {
    setIsPaid(true);
    localStorage.setItem("isPaid", "true");
  };

  const openPricing = () => setIsPricingOpen(true);
  const closePricing = () => setIsPricingOpen(false);

  return (
    <PricingContext.Provider
      value={{
        isPaid,
        markAsPaid,
        isPricingOpen,
        openPricing,
        closePricing,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}
