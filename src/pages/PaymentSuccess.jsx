import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let interval = null;

    async function checkStatus() {
      if (!user) return;

      const token = await user.getIdToken(true);

      const res = await fetch(
        "https://traindesk-backend.onrender.com/api/subscription/status",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data.active) {
        clearInterval(interval);
        toast.success("Payment Verified! Subscription Activated.");
        navigate("/dashboard");
      }
    }

    // Poll every 3 seconds
    interval = setInterval(checkStatus, 3000);

    // Cleanup
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verifying Payment...</h1>
        <p className="text-slate-600 mt-2">Do not close this page.</p>

        <div className="mt-5 animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
      </div>
    </div>
  );
}
