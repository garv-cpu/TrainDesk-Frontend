import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loadingAuth] = useAuthState(auth);
  const [role, setRole] = useState("loading");

  useEffect(() => {
    if (!user) return setRole(null);

    async function getRole() {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      setRole(snap.exists() ? snap.data().role : null);
    }

    getRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
