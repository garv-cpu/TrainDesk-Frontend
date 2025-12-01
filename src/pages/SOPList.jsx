import { useEffect, useState } from "react";
import { FileText, Search, Plus, Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authFetch } from "../utils/api";

export default function SOPList() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filterDept, setFilterDept] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [SOPs, setSOPs] = useState([]);

    // Fetch SOPs
    const loadSOPs = async () => {
        try {
            const data = await authFetch("/api/sops");
            setSOPs(Array.isArray(data) ? data : []);
        } catch (err) {
            toast.error(err.message || "Failed to load SOPs");
        }
    };


    useEffect(() => {
        loadSOPs();
    }, []);

    // Delete SOP
    const handleDelete = async (id) => {
        const loading = toast.loading("Deleting SOP...");

        try {
            await authFetch(`/api/sops/${id}`, {
                method: "DELETE",
            });

            toast.success("SOP Deleted");
            loadSOPs();
        } catch (err) {
            toast.error(err.message || "Failed to delete SOP");
        } finally {
            toast.dismiss(loading);
        }
    };

    const filtered = SOPs
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
                    Standard Operating Procedures
                </h1>

                <button
                    onClick={() => navigate("create")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                >
                    <Plus size={18} /> Create SOP
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
                            <th className="py-3 px-4 font-medium">Last Updated</th>
                            <th className="py-3 px-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-500">
                                    No SOPs here.
                                </td>
                            </tr>
                        )}

                        {filtered.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td
                                    className="py-4 px-4 text-gray-800 flex items-center gap-2 cursor-pointer"
                                    onClick={() => navigate(`view/${item._id}`)}
                                >
                                    <FileText size={18} className="text-blue-600" />
                                    <span className="hover:underline">{item.title}</span>
                                </td>


                                <td className="py-4 px-4 text-gray-600">{item.dept}</td>

                                <td className="py-4 px-4 text-gray-600">
                                    {item.updated ? new Date(item.updated).toLocaleDateString() : "—"}
                                </td>

                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-4 justify-end">

                                        <button
                                            className="text-green-600 hover:opacity-70"
                                            onClick={() => navigate(`view/${item._id}`)}
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            className="text-blue-600 hover:opacity-70"
                                            onClick={() => navigate(`edit/${item._id}`)}
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:opacity-70"
                                        >
                                            <Trash size={18} />
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
