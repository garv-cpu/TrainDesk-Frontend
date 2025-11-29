import { X, CheckCircle } from "lucide-react";

export default function PricingModal({ open, onClose }) {
  if (!open) return null;

  const plans = [
    {
      plan: "Starter",
      price: "₹149 / month",
      features: ["Up to 10 employees", "SOP Manager", "Basic Training Paths"],
    },
    {
      plan: "Professional",
      price: "₹399 / month",
      features: [
        "Up to 50 employees",
        "Role Permissions",
        "Progress Tracking",
        "Knowledge Base",
      ],
    },
    {
      plan: "Enterprise",
      price: "₹1999 / month",
      features: [
        "Unlimited employees",
        "Multi-Branch",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-6 h-6 text-slate-600" />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-600">
          Simple Pricing for Your Business
        </h2>
        <p className="text-slate-600 text-center mt-2">
          Choose the best plan that fits your growth.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {plans.map((p, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">{p.plan}</h3>
              <p className="text-2xl font-bold mt-3">{p.price}</p>

              <ul className="mt-6 space-y-2">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-6 w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
