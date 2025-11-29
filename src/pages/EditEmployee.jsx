import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { authFetch } from "../utils/api";

export default function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        dept: "",
        role: "",
        status: "",
    });

    // Load employee (AUTH REQUIRED)
    const fetchEmployee = async () => {
        try {
            const data = await authFetch(`/api/employees/${id}`);
            setForm(data);
        } catch (err) {
            toast.error(err.message || "Failed to load employee");
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loading = toast.loading("Updating employee...");

        try {
            await authFetch(`/api/employees/${id}`, {
                method: "PUT",
                body: JSON.stringify(form),
            });

            toast.success("Employee Updated");
            navigate("/dashboard/employees");

        } catch (err) {
            toast.error(err.message || "Error updating employee");
        } finally {
            toast.dismiss(loading);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Edit Employee</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="name"
                    className="w-full border px-4 py-2 rounded-md"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    className="w-full border px-4 py-2 rounded-md"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="dept"
                    className="w-full border px-4 py-2 rounded-md"
                    value={form.dept}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="w-full border px-4 py-2 rounded-md"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                </select>

                <select
                    name="status"
                    className="w-full border px-4 py-2 rounded-md"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save Changes
                </button>

            </form>
        </div>
    );
}
