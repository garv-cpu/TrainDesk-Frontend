import { useState } from "react";
import { Menu, X, CheckCircle } from "lucide-react";
import { usePricing } from "../utils/PricingContext";
import usePricingOrLogin from "../hooks/usePricingOrLogin";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openPricing } = usePricing();
  const handleAction = usePricingOrLogin();
  const navigate = useNavigate();

  return (
    <div className="font-poppins text-slate-800 bg-white overflow-x-hidden">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/traindesk_logo.png"
              className="w-10 h-10 mt-1 object-contain"
              alt="TrainDesk"
            />
            <h1 className="text-2xl font-semibold text-blue-600 hidden sm:block">
              TrainDesk
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="hover:text-blue-600" href="#features">
              Features
            </a>
            <a className="hover:text-blue-600" onClick={openPricing}>
              Pricing
            </a>

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-7 h-7 text-slate-700" />
          </button>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
            <div className="w-72 bg-white h-full shadow-lg p-6 flex flex-col gap-6 animate-slideLeft">

              <div className="flex justify-between items-center">
                <h1 className="text-blue-600 text-xl font-semibold">Menu</h1>
                <X className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
              </div>

              <a
                className="hover:text-blue-600"
                href="#features"
                onClick={() => setMobileOpen(false)}
              >
                Features
              </a>

              <a
                className="hover:text-blue-600"
                href="#pricing"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </a>

              <a
                className="hover:text-blue-600"
                href="#dashboard"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </a>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Train Your Team
            <br />
            <span className="text-blue-600">Faster. Smarter.</span>
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-md mx-auto md:mx-0">
            TrainDesk helps your business create SOPs, onboard employees,
            and manage training — all in one simple dashboard.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center md:justify-start">
            <button
              onClick={handleAction}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition"
            >
              Get Lifetime Access
            </button>
          </div>

          {/* Mini Features */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
            {["Create SOPs", "Track Training", "Role-based Access", "Onboard Employees"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-slate-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right (Illustration) */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/At the office-rafiki.png"
            className="w-64 sm:w-80 lg:w-[380px] drop-shadow-2xl object-contain"
            alt="Illustration"
          />
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section id="features" className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Powerful Features for Modern Training
          </h2>

          <p className="text-center mt-3 text-slate-600 max-w-xl mx-auto">
            Everything your business needs to train employees and manage SOPs smoothly.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-14">
            {[
              { title: "SOP Creator", desc: "Create and manage SOPs visually." },
              { title: "Training Paths", desc: "Assign modules with deadlines." },
              { title: "Progress Tracking", desc: "See employee performance." },
              { title: "Role Permissions", desc: "Smart access control." },
              { title: "Multi-Branch", desc: "Manage all branches easily." },
              { title: "Knowledge Base", desc: "Store documents & videos." },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-600">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- DASHBOARD PREVIEW ---------------- */}
      <section id="dashboard" className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Clean & Simple Dashboard</h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            TrainDesk provides a minimal, intuitive interface your employees will love.
          </p>

          <Slider />
        </div>
      </section>

      {/* ---------------- PRICING SECTION ---------------- */}
      <section id="pricing" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-4xl font-bold text-center text-slate-800">
            Simple, One-Time Pricing
          </h2>
          <p className="mt-3 text-slate-600 text-center">
            Lifetime access. All features. One small fee.
          </p>

          {/* Card */}
          <div className="mt-14 bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

              {/* Left */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-blue-600">
                  One-Time Lifetime Access
                </h3>
                <p className="mt-3 text-5xl font-bold text-slate-800">₹1,999</p>
                <p className="text-sm text-slate-500">(one time fee)</p>
              </div>

              {/* Middle list */}
              <ul className="space-y-3 text-left mx-auto">
                {[
                  "Unlimited Employees",
                  "Lifetime Access",
                  "All Features Included",
                  "Priority Support",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="flex justify-center md:justify-end">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://payments.cashfree.com/links?code=X9i9fblgs450_AAAAAAAPFIU")
                  }
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
                >
                  Get Lifetime Access
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
