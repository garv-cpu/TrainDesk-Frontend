// src/utils/api.js
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_BASE = "https://traindesk-backend.onrender.com";

// wait until firebase auth has a user (useful at app start)
function waitForUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

export async function authFetch(path, opts = {}) {
  let user = auth.currentUser;

  if (!user) {
    user = await waitForUser();
  }

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Force refresh token (to reduce "expired token" problems)
  const token = await user.getIdToken(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(opts.headers || {}),
  };

  const res = await fetch(API_BASE + path, { ...opts, headers });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return res.json();
}
