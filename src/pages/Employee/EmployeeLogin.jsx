import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { authFetch } from "../../utils/api";
import { Lock, Mail } from "lucide-react";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const API = "https://traindesk-backend.onrender.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ----------------------------
  // 🔹 RESET PASSWORD HANDLER
  // ----------------------------
  const handleForgotPassword = async () => {
    if (!email) return toast.error("Enter your email first");

    const loading = toast.loading("Sending reset email...");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message || "Failed to send email");
    } finally {
      toast.dismiss(loading);
    }
  };

  // ----------------------------
  // 🔹 EMPLOYEE LOGIN
  // ----------------------------
  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Checking your account...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const emp = await authFetch("/api/employees/me");

      toast.success("Welcome " + emp.name + "!");
      navigate("/employee");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("Account not found");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else if (err.code === "auth/invalid-credential") {
        toast.error("Invalid credentials. Try resetting password.");
      } else {
        toast.error(err.message || "Login failed");
      }
    } finally {
      toast.dismiss(loading);
    }
  };

  // ----------------------------
  // 🔹 GOOGLE LOGIN
  // ----------------------------
  const handleEmployeeGoogleLogin = async () => {
    const loading = toast.loading("Signing in...");
    try {
      await signInWithPopup(auth, googleProvider);
      const emp = await authFetch("/api/employees/me");

      toast.success("Welcome " + emp.name + "!");
      navigate("/employee");
    } catch (err) {
      toast.error("Google account not registered as employee.");
      auth.signOut();
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:block w-1/2">
        <img className="h-full w-full object-cover" 
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSide" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <form className="md:w-96 w-80 flex flex-col items-center" onSubmit={handleEmployeeLogin}>
          <h2 className="text-4xl text-gray-900 font-medium">Employee Login</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Sign in to access your training dashboard
          </p>

          {/* GOOGLE BUTTON */}
          <button type="button" 
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
            onClick={handleEmployeeGoogleLogin}>
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="google"/>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90" />
            <p className="text-sm text-gray-500/90 whitespace-nowrap">or login with email</p>
            <div className="w-full h-px bg-gray-300/90" />
          </div>

          {/* EMAIL INPUT */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
            <Mail className="size-4 text-gray-400" />
            <input type="email" required placeholder="Email"
              className="bg-transparent text-sm w-full outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full mt-6 pl-6 gap-2">
            <Lock className="size-4 text-gray-400" />
            <input type="password" required placeholder="Password"
              className="bg-transparent text-sm w-full outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* RESET PASSWORD LINK */}
          <p className="mt-4 w-full text-sm underline text-gray-500 cursor-pointer"
            onClick={handleForgotPassword}>
            Forgot password?
          </p>

          {/* SUBMIT BUTTON */}
          <button type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-[#5E3695]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
