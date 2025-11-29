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
    if (!user) return setRole(null);

    if (role === "admin") {
      fetch("https://traindesk-backend.onrender.com/api/subscription/status", {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` }
      })
        .then(res => res.json())
        .then(data => setHasSubscription(data.active));
    }

    async function getRole() {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      setRole(snap.exists() ? snap.data().role : null);
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
