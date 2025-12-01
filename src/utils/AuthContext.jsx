// src/utils/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loadingAuth] = useAuthState(auth);
  const [role, setRole] = useState("loading"); // "admin" | "employee" | null
  const [hasSubscription, setHasSubscription] = useState(false);

  // helper: call backend with token
  async function fetchBackend(path, opts = {}) {
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error("Not authenticated");
    const res = await fetch(`https://traindesk-backend.onrender.com${path}`, {
      ...opts,
      headers: {
        ...(opts.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": opts.body ? "application/json" : undefined,
      },
    });
    return res;
  }

  async function loadSubscription() {
    try {
      const res = await fetchBackend("/api/subscription/status");
      if (!res.ok) return setHasSubscription(false);
      const data = await res.json();
      setHasSubscription(data.active === true);
    } catch (err) {
      console.error("Subscription fetch failed:", err);
      setHasSubscription(false);
    }
  }

  useEffect(() => {
    let canceled = false;
    if (loadingAuth) return;

    if (!user) {
      setRole(null);
      setHasSubscription(false);
      return;
    }

    async function detect() {
      try {
        // 1) check /api/users/me
        const adminRes = await fetchBackend("/api/users/me");
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          if (adminData.role === "admin") {
            if (!canceled) {
              setRole("admin");
              await loadSubscription();
            }
            return;
          }
        }

        // 2) check employee
        const empRes = await fetchBackend("/api/employees/me");
        if (empRes.ok) {
          const empData = await empRes.json();
          if (empData && empData._id) {
            if (!canceled) setRole("employee");
            return;
          }
        }

        // default -> not allowed / public user
        if (!canceled) setRole(null);
      } catch (err) {
        console.error("Role detection error:", err);
        if (!canceled) setRole(null);
      }
    }

    detect();

    return () => {
      canceled = true;
    };
  }, [user, loadingAuth]);

  return (
    <AuthContext.Provider value={{ user, role, hasSubscription, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
