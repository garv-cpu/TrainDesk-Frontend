// src/pages/EmployeeLogin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authFetch } from "../../utils/api";
import { Lock, Mail } from "lucide-react";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Checking your account...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Verify against backend that employee exists and is active
      await authFetch("/api/employees/me");
      toast.success("Welcome!");
      navigate("/employee");
    } catch (err) {
      toast.error(err.message || "Invalid login credentials");
    } finally {
      toast.dismiss(loading);
    }
  };

  const handleEmployeeGoogleLogin = async () => {
    const loading = toast.loading("Signing in...");
    try {
      await signInWithPopup(auth, googleProvider);
      await authFetch("/api/employees/me");
      toast.success("Logged in!");
      navigate("/employee");
    } catch (err) {
      toast.error(err.message || "Google account not registered as employee.");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:block w-1/2">
        <img className="h-full w-full object-cover object-center" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <form className="md:w-96 w-80 flex flex-col items-center" onSubmit={handleEmployeeLogin}>
          <h2 className="text-4xl text-gray-900 font-medium">Employee Login</h2>
          <p className="text-sm text-gray-500/90 mt-3">Sign in to access your training dashboard</p>

          <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full" onClick={handleEmployeeGoogleLogin}>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90" />
            <p className="text-sm text-gray-500/90 whitespace-nowrap">or login with email</p>
            <div className="w-full h-px bg-gray-300/90" />
          </div>

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail className="size-4 text-gray-400" />
            <input type="email" placeholder="Email" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Lock className="size-4 text-gray-400" />
            <input type="password" placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-[#5E3695] hover:bg-[#5E3695]/90 hover:opacity-90 transition-opacity">Login</button>
        </form>
      </div>
    </div>
  );
}
