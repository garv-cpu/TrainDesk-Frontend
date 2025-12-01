import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { authFetch } from "../../utils/api";

export default function Header({ openSidebar }) {
    const auth = getAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    // 🔍 GLOBAL SEARCH
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const data = await authFetch(`/api/search?q=${encodeURIComponent(query)}`);

                const combined = [
                    ...data.sop.map((s) => ({ type: "sop", ...s })),
                    ...data.training.map((t) => ({ type: "training", ...t }))
                ];

                setResults(combined);
                setShowDropdown(true);
            } catch (e) {
                console.log(e);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);


    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const getFallbackName = () => {
        if (!user) return "User";
        if (user.displayName) return user.displayName;

        if (user.email) {
            const beforeAt = user.email.split("@")[0];
            return beforeAt.charAt(0).toUpperCase() + beforeAt.slice(1);
        }

        return "User";
    };

    const goToItem = (item) => {
        setShowDropdown(false);
        setQuery("");

        if (item.type === "sop") navigate(`sops/view/${item._id}`);
        if (item.type === "training") navigate(`training/${item._id}`);
    };

    return (
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center relative">

            <button className="lg:hidden mr-3 text-gray-700" onClick={openSidebar}>
                <Menu size={28} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>

            <div className="flex items-center gap-4 relative">

                {/* SEARCH BAR */}
                <div className="relative hidden sm:block">
                    <div className="absolute left-2 top-2.5 text-gray-400">
                        <Search size={18} />
                    </div>

                    <input
                        className="border px-3 py-2 pl-9 rounded-md w-64"
                        placeholder="Search SOPs, Training..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                    />

                    {/* DROPDOWN RESULTS */}
                    {showDropdown && results.length > 0 && (
                        <div className="absolute top-11 w-64 bg-white shadow-lg rounded-md border z-30 max-h-80 overflow-auto">
                            {results.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => goToItem(item)}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-xs text-blue-600">
                                        {item.type === "sop" ? "SOP" : "Training Video"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* AVATAR */}
                {user?.photoURL ? (
                    <img
                        src={`${user.photoURL}?sz=200`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border shadow-sm"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium whitespace-nowrap">
                        {getFallbackName()}
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 transition hidden sm:block"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
