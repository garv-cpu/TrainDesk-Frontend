import { useState } from "react";
import { Menu, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePricing } from "../utils/PricingContext";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openPricing } = usePricing();
  const handleAction = usePricingOrLogin();

  return (
    <div className="font-poppins text-slate-800 bg-white">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/traindesk_logo.png" className="w-10 h-10 mt-2" alt="TrainDesk" />
            <h1 className="text-2xl font-semibold text-blue-600">TrainDesk</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="hover:text-blue-600" href="#features">Features</a>
            <a onClick={openPricing} className="hover:text-blue-600" href="#pricing">Pricing</a>
            <a className="hover:text-blue-600" href="#dashboard">Dashboard</a>
            <Link to='/login' className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7 text-slate-700" />
          </button>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-40">
            <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col gap-6">

              <div className="flex justify-between items-center">
                <h1 className="text-blue-600 text-xl font-semibold">Menu</h1>
                <X className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
              </div>

              <a className="hover:text-blue-600" href="#features">Features</a>
              <a className="hover:text-blue-600" href="#pricing">Pricing</a>
              <a className="hover:text-blue-600" href="#dashboard">Dashboard</a>

              <Link onClick={handleAction} className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Train Your Team
            <br />
            <span className="text-blue-600">Faster. Smarter.</span>
          </h1>

          <p className="mt-5 text-lg text-slate-600">
            TrainDesk helps your business create SOPs, onboard employees,
            and manage training — all in one simple dashboard.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAction}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mini Features */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              "Create SOPs",
              "Track Training",
              "Role-based Access",
              "Onboard Employees"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-slate-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right (Logo or illustration) */}
        <div className="flex justify-center">
          <img
            src="/At the office-rafiki.png"
            className="w-80 drop-shadow-2xl"
            alt="TrainDesk"
          />
        </div>

      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section id="features" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Powerful Features for Modern Training
          </h2>

          <p className="text-center mt-3 text-slate-600 max-w-xl mx-auto">
            Everything your business needs to train employees and manage SOPs smoothly.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {[
              {
                title: "SOP Creator",
                desc: "Create, edit and manage SOPs in a structured, visual format.",
              },
              {
                title: "Training Paths",
                desc: "Assign modules, lessons and tasks to employees with deadlines.",
              },
              {
                title: "Progress Tracking",
                desc: "See completion stats, pending tasks, and employee performance.",
              },
              {
                title: "Role Permissions",
                desc: "Admins, trainers, and employees see only what they need.",
              },
              {
                title: "Multi-Branch",
                desc: "Manage all branches and employees from one dashboard.",
              },
              {
                title: "Knowledge Base",
                desc: "Central library for documents, videos, and policies.",
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-600">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ---------------- DASHBOARD PREVIEW ---------------- */}
      {/* <section id="dashboard" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Clean & Simple Dashboard
          </h2>
          <p className="text-slate-600 mt-3">
            TrainDesk provides a minimal, intuitive interface your employees will love.
          </p>

          <img
            src="https://dummyimage.com/1000x500/ebebeb/3a3a3a&text=Dashboard+Preview+(MVP)"
            alt="Dashboard"
            className="rounded-xl mt-10 shadow-xl"
          />
        </div>
      </section> */}

      {/* ---------------- PRICING SECTION ---------------- */}
      <section id="pricing" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing</h2>
          <p className="text-slate-600 mt-3">
            Pricing designed for Indian small and medium businesses.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                plan: "Starter",
                price: "₹149 / month",
                features: ["Up to 10 employees", "SOP Manager", "Basic Training Paths"]
              },
              {
                plan: "Professional",
                price: "₹399 / month",
                features: ["Up to 50 employees", "Role Permissions", "Progress Tracking", "Knowledge Base"]
              },
              {
                plan: "Enterprise",
                price: "₹1999 / month",
                features: ["Unlimited employees", "Multi-Branch", "Advanced Analytics", "Priority Support"]
              }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-blue-600">{p.plan}</h3>
                <p className="text-3xl font-bold mt-3">{p.price}</p>

                <ul className="mt-6 space-y-2">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose Plan
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
