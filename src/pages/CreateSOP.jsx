import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";

export default function CreateSOP() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("");
  const [content, setContent] = useState("");

  const [employees, setEmployees] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);

  const loadEmployees = async () => {
    try {
      const res = await authFetch("/api/employees");
      setEmployees(res?.employees || []);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const toggleSelectEmployee = (empId) => {
    if (assignedTo.includes(empId)) {
      setAssignedTo(assignedTo.filter((id) => id !== empId));
    } else {
      setAssignedTo([...assignedTo, empId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Creating SOP...");

    try {
      const body = {
        title,
        dept,
        content,
        assignedTo, // ✅ important
      };

      const res = await authFetch("/api/sops", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!res?.sop?._id) throw new Error("Failed to create SOP");

      toast.success("SOP Created Successfully");
      navigate("/dashboard/sops");
    } catch (err) {
      toast.error(err.message || "Error creating SOP");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-6">Create SOP</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
      >
        <label className="block mb-2 font-medium">Title</label>
        <input
          className="border w-full p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Department</label>
        <select
          className="border w-full p-2 rounded mb-4"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          <option value="Operations">Operations</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Safety">Safety</option>
        </select>

        <label className="block mb-2 font-medium">Content</label>
        <textarea
          className="border w-full p-2 rounded mb-6 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Assign to Employees</label>
        <div className="border rounded p-3 max-h-64 overflow-y-auto mb-6">
          {employees.length === 0 ? (
            <p className="text-gray-500 text-sm">No employees found</p>
          ) : (
            employees.map((emp) => (
              <label
                key={emp._id}
                className="flex items-center gap-2 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={assignedTo.includes(emp._id)}
                  onChange={() => toggleSelectEmployee(emp._id)}
                />
                <span>{emp.name}</span>
              </label>
            ))
          )}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save SOP
        </button>
      </form>
    </div>
  );
}
