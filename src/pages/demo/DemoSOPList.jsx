import { useState } from "react";
import { FileText, Search, Eye } from "lucide-react";

export default function DemoSOPList() {
    const [search, setSearch] = useState("");
    const [filterDept, setFilterDept] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // -------- DEMO SOP DATA --------
    const demoSOPs = [
        {
            _id: "1",
            title: "Client Handling SOP",
            dept: "Customer Service",
            assignedTo: ["John Parker", "Emily Rose"],
            updated: "2025-02-08T10:00:00",
        },
        {
            _id: "2",
            title: "Warehouse Safety Rules",
            dept: "Safety",
            assignedTo: ["Michael Scott"],
            updated: "2025-02-06T14:30:00",
        },
        {
            _id: "3",
            title: "Operations Workflow Guide",
            dept: "Operations",
            assignedTo: ["Sophia Diaz", "Mark Lee"],
            updated: "2025-02-05T09:20:00",
        },
    ];

    // -------- FILTER + SORT --------
    const filtered = demoSOPs
        .filter((sop) => sop.title.toLowerCase().includes(search.toLowerCase()))
        .filter((sop) => (filterDept ? sop.dept === filterDept : true))
        .sort((a, b) =>
            sortBy === "newest"
                ? new Date(b.updated) - new Date(a.updated)
                : new Date(a.updated) - new Date(b.updated)
        );

    return (
        <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Standard Operating Procedures (Demo)
                </h1>

                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm opacity-70 cursor-not-allowed"
                >
                    + Create SOP (Demo Only)
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center bg-white border border-gray-300 px-3 rounded-md h-11 w-full md:w-80">
                    <Search size={18} className="text-gray-500" />
                    <input
                        placeholder="Search SOPs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-full w-full ml-2 outline-none text-sm"
                    />
                </div>

                <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="border border-gray-300 rounded-md h-11 px-3 text-sm w-full md:w-48"
                >
                    <option value="">All Departments</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Safety">Safety</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md h-11 px-3 text-sm w-full md:w-44"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr className="text-sm text-gray-600">
                            <th className="py-3 px-4 font-medium">Title</th>
                            <th className="py-3 px-4 font-medium">Department</th>
                            <th className="py-3 px-4 font-medium">Assigned To</th>
                            <th className="py-3 px-4 font-medium">Last Updated</th>
                            <th className="py-3 px-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    No SOPs found.
                                </td>
                            </tr>
                        )}

                        {filtered.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                {/* Title */}
                                <td className="py-4 px-4 text-gray-800 flex items-center gap-2">
                                    <FileText size={18} className="text-blue-600" />
                                    {item.title}
                                </td>

                                {/* Department */}
                                <td className="py-4 px-4 text-gray-600">{item.dept}</td>

                                {/* Assigned */}
                                <td className="py-4 px-4 text-gray-600">
                                    {item.assignedTo.join(", ")}
                                </td>

                                {/* Updated */}
                                <td className="py-4 px-4 text-gray-600">
                                    {new Date(item.updated).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-4 justify-end">
                                        <button className="text-blue-600 hover:opacity-70">
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
