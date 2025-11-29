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

    async function detectRole() {
      try {
        // -------------------------
        // 1️⃣ Check if ADMIN (Firestore)
        // -------------------------
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists() && snap.data().role === "admin") {
          setRole("admin");
          await fetchSubscription();
          return;
        }
      } catch (err) {
        console.error("Admin check failed:", err);
      }

      try {
        // -------------------------
        // 2️⃣ Check if EMPLOYEE (Backend)
        // -------------------------
        const token = await user.getIdToken();

        const res = await fetch(
          "https://traindesk-backend.onrender.com/api/employees/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data && data._id) {
            setRole("employee");
            return;
          }
        }
      } catch (err) {
        console.error("Employee check failed:", err);
      }

      // -------------------------
      // 3️⃣ If neither → Not allowed user
      // -------------------------
      setRole("none");
    }

    async function fetchSubscription() {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          "https://traindesk-backend.onrender.com/api/subscription/status",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setHasSubscription(data.active);
      } catch (err) {
        console.error("Subscription fetch failed:", err);
        setHasSubscription(false);
      }
    }

    detectRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, hasSubscription, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
