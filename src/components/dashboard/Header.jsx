import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Header({ openSidebar }) {
    const auth = getAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Subscribe to user auth state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

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

    return (
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">

            {/* Mobile Toggle */}
            <button
                className="lg:hidden mr-3 text-gray-700"
                onClick={openSidebar}
            >
                <Menu size={28} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>

            <div className="flex items-center gap-4">

                {/* Search */}
                <input
                    className="border px-3 py-2 rounded-md hidden sm:block"
                    placeholder="Search..."
                />

                {/* Google Photo OR Full Name */}
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


                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition hidden sm:block"
                >
                    Logout
                </button>

            </div>
        </header>
    );
}
