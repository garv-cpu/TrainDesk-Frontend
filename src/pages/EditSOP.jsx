import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { authFetch } from "../utils/api";

export default function EditSOP() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("");
  const [content, setContent] = useState("");

  const [employees, setEmployees] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);

  // Load Employees
  const loadEmployees = async () => {
    try {
      const res = await authFetch("/api/employees");
      setEmployees(res?.employees || []);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  // Load SOP
  useEffect(() => {
    (async () => {
      try {
        const data = await authFetch(`/api/sops/${id}`);
        setTitle(data.title);
        setDept(data.dept);
        setContent(data.content);
        setAssignedTo(data.assignedTo?.map((emp) => emp._id) || []);
      } catch (err) {
        toast.error("Failed to load SOP");
      }
    })();

    loadEmployees();
  }, [id]);

  const toggleSelectEmployee = (empId) => {
    if (assignedTo.includes(empId)) {
      setAssignedTo(assignedTo.filter((id) => id !== empId));
    } else {
      setAssignedTo([...assignedTo, empId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Updating SOP...");

    try {
      await authFetch(`/api/sops/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          dept,
          content,
          assignedTo, // ✅ FIX
        }),
      });

      toast.success("SOP Updated Successfully");
      navigate("/dashboard/sops");
    } catch (err) {
      toast.error("Failed updating SOP");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-6">Edit SOP</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
      >
        <label className="block mb-2 font-medium">Title</label>
        <input
          className="border w-full p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-medium">Department</label>
        <select
          className="border w-full p-2 rounded mb-4"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
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
        />

        {/* EMPLOYEE ASSIGN UI */}
        <label className="block mb-2 font-medium">Assign Employees</label>
        <div className="border rounded p-3 max-h-64 overflow-y-auto mb-6">
          {employees.map((emp) => (
            <label key={emp._id} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={assignedTo.includes(emp._id)}
                onChange={() => toggleSelectEmployee(emp._id)}
              />
              <span>{emp.name}</span>
            </label>
          ))}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update SOP
        </button>
      </form>
    </div>
  );
}
