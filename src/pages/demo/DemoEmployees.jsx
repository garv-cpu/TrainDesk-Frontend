import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

export default function DemoEmployees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [filterDept, setFilterDept] = useState("all");

    // 📌 DEMO EMPLOYEES (STATIC)
    const demoData = [
        { id: 1, name: "John Parker", email: "john@demo.com", dept: "Sales", role: "executive", status: "active" },
        { id: 2, name: "Priya Sharma", email: "priya@demo.com", dept: "HR", role: "manager", status: "active" },
        { id: 3, name: "Michael Lee", email: "michael@demo.com", dept: "Finance", role: "staff", status: "inactive" },
        { id: 4, name: "Sara Wilson", email: "sara@demo.com", dept: "Operations", role: "executive", status: "active" },
        { id: 5, name: "Amit Verma", email: "amit@demo.com", dept: "Sales", role: "staff", status: "active" },
        { id: 6, name: "Emily Davis", email: "emily@demo.com", dept: "HR", role: "executive", status: "inactive" },
    ];

    // load demo data
    useEffect(() => {
        setEmployees(demoData);
    }, []);

    const handleDemoClick = () => {
        toast("This feature is disabled in demo mode.", { icon: "🔒" });
    };

    // 🔍 FILTERED EMPLOYEES
    const filtered = useMemo(() => {
        return employees.filter((emp) => {
            const matchSearch =
                emp.name.toLowerCase().includes(search.toLowerCase()) ||
                emp.email.toLowerCase().includes(search.toLowerCase()) ||
                emp.dept.toLowerCase().includes(search.toLowerCase()) ||
                emp.role.toLowerCase().includes(search.toLowerCase());

            const matchDept =
                filterDept === "all" || emp.dept === filterDept;

            return matchSearch && matchDept;
        });
    }, [employees, search, filterDept]);

    const departments = ["all", ...new Set(employees.map((e) => e.dept))];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Employees (Demo)</h1>

                <button
                    onClick={handleDemoClick}
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
                >
                    + Add Employee
                </button>
            </div>

            {/* 🔍 Search + Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-5">
                <input
                    type="text"
                    placeholder="Search by name, email, dept..."
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="px-4 py-2 border rounded-md"
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                >
                    {departments.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept === "all" ? "All Departments" : dept}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Department</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((emp) => (
                            <tr key={emp.id} className="border-t">
                                <td className="p-3">{emp.name}</td>
                                <td className="p-3">{emp.email}</td>
                                <td className="p-3">{emp.dept}</td>
                                <td className="p-3 capitalize">{emp.role}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            emp.status === "active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {emp.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={handleDemoClick}
                                        className="text-red-600 hover:underline"
                                    >
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td className="p-6 text-center text-gray-500" colSpan="6">
                                    No matching employees
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center">
                * Demo Version — Data is static
            </p>
        </div>
    );
}
