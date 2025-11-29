// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import { authFetch } from "../utils/api";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // helper: fetch /api/users/me to learn role
  const fetchRoleAndRedirect = async () => {
    try {
      const me = await authFetch("/api/users/me");
      if (me.role === "admin") return navigate("/dashboard");
      if (me.role === "staff") return navigate("/employee"); // fallback
      toast.error("Invalid role detected.");
    } catch (err) {
      toast.error(err.message || "Failed to fetch role");
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!email) return toast.error("Enter your email first");
    const loading = toast.loading("Sending reset email...");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  // LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Checking admin access...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      await fetchRoleAndRedirect();
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      toast.dismiss(loading);
    }
  };

  // SIGNUP
  // Flow: create firebase account (client), then call backend /api/users/register-admin to mark role=admin
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Creating admin account...");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // now ask backend to mark this user as admin
      await authFetch("/api/users/register-admin", { method: "POST" });
      toast.success("Admin registered!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      toast.dismiss(loading);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const loading = toast.loading("Signing in...");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // mark as admin if first-time (client calls backend to register admin)
      await authFetch("/api/users/register-admin", { method: "POST" }).catch(() => { /* ignore if already exists */ });
      await fetchRoleAndRedirect();
    } catch (err) {
      toast.error(err.message || "Google login failed");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:block w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="Login Illustration"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <form
          className="md:w-96 w-80 flex flex-col items-center"
          onSubmit={isSignup ? handleEmailSignup : handleEmailLogin}
        >
          <h2 className="text-4xl text-gray-900 font-medium">{isSignup ? "Admin Sign Up" : "Admin Sign In"}</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            {isSignup ? "Create an admin account" : "Welcome back Admin!"}
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
            onClick={handleGoogleLogin}
          >
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="google" />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90" />
            <p className="text-sm text-gray-500/90 whitespace-nowrap">or use email</p>
            <div className="w-full h-px bg-gray-300/90" />
          </div>

          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <Mail className="size-4 text-gray-400" />
            <input type="email" placeholder="Admin email" className="bg-transparent text-sm w-full outline-none" onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full mt-6 pl-6 gap-2">
            <Lock className="size-4 text-gray-400" />
            <input type="password" placeholder="Password" className="bg-transparent text-sm w-full outline-none" onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {!isSignup && (
            <p className="mt-4 w-full text-sm underline text-gray-500 cursor-pointer" onClick={handleForgotPassword}>
              Forgot password?
            </p>
          )}

          <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-[#5E3695]">
            {isSignup ? "Create Admin" : "Login as Admin"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            {isSignup ? (
              <>Already admin? <span className="text-indigo-400 cursor-pointer" onClick={() => setIsSignup(false)}>Sign in</span></>
            ) : (
              <>Need admin access? <span className="text-indigo-400 cursor-pointer" onClick={() => setIsSignup(true)}>Sign up</span></>
            )}
          </p>

          <p className="mt-6 text-sm text-gray-500/80">
            Not an admin? <a href="/employee/login" className="text-indigo-500 underline">Employee Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
