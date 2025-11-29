import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../utils/firebase";
import { authFetch } from "../utils/api";

export default function CreateEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    dept: "",
    role: "staff",
    status: "active",
    password: "",   // required for Firebase account creation
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Creating employee...");

    try {
      // 1️⃣ Create Firebase Auth user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const firebaseUid = userCred.user.uid;

      // 2️⃣ Add employee to backend
      await authFetch("/api/employees", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          firebaseUid,
        }),
      });

      toast.success("Employee Added Successfully");
      navigate("/dashboard/employees");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error creating employee");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add Employee</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded-md"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-md"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Temporary Password"
          className="w-full border px-4 py-2 rounded-md"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="dept"
          placeholder="Department"
          className="w-full border px-4 py-2 rounded-md"
          value={form.dept}
          onChange={handleChange}
          required
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
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}
