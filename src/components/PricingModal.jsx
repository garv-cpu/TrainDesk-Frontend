import { X, CheckCircle } from "lucide-react";

export default function PricingModal({ open, onClose }) {
    if (!open) return null;

    const plan = {
        title: "One-Time Lifetime Access",
        price: "₹1,999 (one time fee)",
        features: [
            "Unlimited Employees",
            "Lifetime Access",
            "All Features Included",
            "Priority Support",
        ],
        link: "https://payments.cashfree.com/links?code=X9i9fblgs450_AAAAAAAPFIU",
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-end bg-black/40 backdrop-blur-sm">
            
            {/* FULL WIDTH BAR */}
            <div className="w-full bg-white py-8 px-6 rounded-t-3xl shadow-2xl animate-slideUp relative">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-slate-600 hover:text-slate-800"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* TITLE */}
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    Lifetime Access – No Monthly Fees
                </h2>

                {/* SUBTEXT */}
                <p className="text-center text-slate-600 mb-8">
                    Pay once, use TrainDesk forever.
                </p>

                {/* CONTENT */}
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* LEFT — FEATURES */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800">{plan.title}</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{plan.price}</p>

                        <ul className="mt-5 space-y-2">
                            {plan.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-slate-700">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT — BUTTON */}
                    <div className="flex justify-center md:justify-end flex-1">
                        <button
                            onClick={() => (window.location.href = plan.link)}
                            className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-medium shadow hover:bg-blue-700"
                        >
                            Get Lifetime Access
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
