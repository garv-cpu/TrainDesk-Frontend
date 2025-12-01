// src/utils/api.js
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_BASE = "https://traindesk-backend.onrender.com"; 

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

  // Wait for Firebase user if not loaded yet
  if (!user) user = await waitForUser();
  if (!user) throw new Error("Not authenticated");

  // Always get a fresh token
  const token = await user.getIdToken(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(opts.headers || {}),
  };

  const res = await fetch(API_BASE + path, { ...opts, headers });

  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const json = await res.json();
      if (json?.message) errorMsg = json.message;
    } catch {}

    const err = new Error(errorMsg);
    err.status = res.status;
    throw err;
  }

  return res.json();
}
