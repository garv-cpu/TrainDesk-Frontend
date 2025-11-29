import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loadingAuth] = useAuthState(auth);
  const [role, setRole] = useState("loading");
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setHasSubscription(false);
      return;
    }

    // -------------------------
    // Get Role
    // -------------------------
    async function getRole() {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const userRole = snap.exists() ? snap.data().role : null;
      setRole(userRole);

      // -------------------------
      // If ADMIN → fetch subscription
      // -------------------------
      if (userRole === "admin") {
        await fetchSubscription();
      }
    }

    // -------------------------
    // Fetch Subscription
    // -------------------------
    async function fetchSubscription() {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          "https://traindesk-backend.onrender.com/api/subscription/status",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = await res.json();
        setHasSubscription(data.active);
      } catch (err) {
        console.error("Subscription fetch failed:", err);
        setHasSubscription(false);
      }
    }

    getRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, hasSubscription, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
