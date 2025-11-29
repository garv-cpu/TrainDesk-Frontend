import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Edit, Trash } from "lucide-react";
import { authFetch } from "../utils/api";

export default function Employees() {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const data = await authFetch(`/api/employees`); // returns JSON directly
            setEmployees(data);
        } catch (err) {
            toast.error(err.message || "Failed to load employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this employee?")) return;

        try {
            await authFetch(`/api/employees/${id}`, {
                method: "DELETE",
            });

            toast.success("Employee deleted");
            fetchEmployees();
        } catch (err) {
            toast.error(err.message || "Error deleting employee");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Employees</h1>
                <Link
                    to="create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    + Add Employee
                </Link>
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
                        {employees.map((emp) => (
                            <tr key={emp._id} className="border-t">
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
                                    <Link
                                        to={`/dashboard/employees/edit/${emp._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <Edit />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(emp._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {employees.length === 0 && (
                            <tr>
                                <td className="p-6 text-center text-gray-500" colSpan="6">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
