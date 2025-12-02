import { Menu } from "lucide-react";

export default function DemoHeader({ openSidebar }) {
    return (
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">

            {/* MOBILE: Sidebar Toggle */}
            <button
                className="lg:hidden mr-3 text-gray-700"
                onClick={openSidebar}
            >
                <Menu size={28} />
            </button>

            {/* PAGE TITLE */}
            <h2 className="text-xl font-semibold text-gray-700">Dashboard (Demo)</h2>

            {/* DEMO PROFILE */}
            <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium whitespace-nowrap cursor-default">
                    Demo User
                </div>
            </div>
        </header>
    );
}
