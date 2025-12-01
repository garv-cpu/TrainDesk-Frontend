// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiRefreshCcw, FiSave, FiServer, FiBell, FiSettings, FiUsers } from "react-icons/fi";

const API = import.meta.env.VITE_API_URL;

// ---------------------------------------------
// Helper Component: SectionContainer
// ---------------------------------------------
const SectionContainer = ({ icon: Icon, title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-blue-600" size={22} />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
};

// ---------------------------------------------
// Toggle Switch Reusable Component
// ---------------------------------------------
const Toggle = ({ label, value, onChange }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
            value ? "translate-x-7" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};

// ---------------------------------------------
// INPUT Field Component
// ---------------------------------------------
const Input = ({ label, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

// ---------------------------------------------
// DROPDOWN Component
// ---------------------------------------------
const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

// ================================================================
// MAIN SETTINGS PAGE
// ================================================================
export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState("");

  // -------------------------------
  // STATE STRUCTURE
  // -------------------------------
  const [ws, setWs] = useState({});
  const [notifications, setNotifications] = useState({});
  const [workflows, setWorkflows] = useState({});
  const [employees, setEmployees] = useState({});

  // ================================================================
  // LOAD INITIAL SETTINGS
  // ================================================================
  const loadSettings = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWs(res.data.websocket);
      setNotifications(res.data.notifications);
      setWorkflows(res.data.workflows);
      setEmployees(res.data.employees);
    } catch (err) {
      console.error("LOAD SETTINGS ERROR", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // ================================================================
  // SAVE A SPECIFIC SETTINGS SECTION
  // ================================================================
  const saveSection = async (sectionName, data) => {
    try {
      setSavingSection(sectionName);

      const token = localStorage.getItem("token");

      await axios.put(`${API}/api/settings/${sectionName}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimeout(() => {
        setSavingSection("");
        loadSettings();
      }, 700);
    } catch (err) {
      console.error("SAVE ERROR", err);
      setSavingSection("");
    }
  };

  // ================================================================
  // UI LOADING STATE
  // ================================================================
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FiRefreshCcw className="animate-spin text-blue-600" size={30} />
      </div>
    );

  // ================================================================
  // PAGE LAYOUT
  // ================================================================
  return (
    <div className="p-6 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>

      {/* ##############################################################
                      1️⃣ WEBSOCKET SETTINGS
      ############################################################## */}
      <SectionContainer title="WebSocket Settings" icon={FiServer}>
        <Toggle
          label="Enable WebSocket"
          value={ws.enabled}
          onChange={(v) => setWs({ ...ws, enabled: v })}
        />

        <Toggle
          label="Auto Reconnect"
          value={ws.autoReconnect}
          onChange={(v) => setWs({ ...ws, autoReconnect: v })}
        />

        <Dropdown
          label="Broadcast Mode"
          value={ws.broadcastMode}
          onChange={(v) => setWs({ ...ws, broadcastMode: v })}
          options={["all", "employees", "admins"]}
        />

        <Input
          label="Heartbeat Interval (seconds)"
          type="number"
          value={ws.heartbeatIntervalSec}
          onChange={(v) => setWs({ ...ws, heartbeatIntervalSec: v })}
        />

        <Input
          label="Test Channel Prefix"
          value={ws.testChannelPrefix}
          onChange={(v) => setWs({ ...ws, testChannelPrefix: v })}
        />

        <button
          onClick={() => saveSection("websocket", ws)}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSave />
          {savingSection === "websocket" ? "Saving..." : "Save Websocket Settings"}
        </button>
      </SectionContainer>

      {/* ##############################################################
                      2️⃣ NOTIFICATIONS SETTINGS
      ############################################################## */}
      <SectionContainer title="Notifications" icon={FiBell}>
        <Toggle
          label="Training Updates"
          value={notifications.trainingUpdates}
          onChange={(v) => setNotifications({ ...notifications, trainingUpdates: v })}
        />

        <Toggle
          label="Employee Joined Alerts"
          value={notifications.employeeJoined}
          onChange={(v) => setNotifications({ ...notifications, employeeJoined: v })}
        />

        <Toggle
          label="SOP Update Notifications"
          value={notifications.sopUpdates}
          onChange={(v) => setNotifications({ ...notifications, sopUpdates: v })}
        />

        <Dropdown
          label="Digest Mode"
          value={notifications.digestMode}
          onChange={(v) => setNotifications({ ...notifications, digestMode: v })}
          options={["instant", "hourly", "daily"]}
        />

        <Input
          label="Email From"
          value={notifications.emailFrom}
          onChange={(v) => setNotifications({ ...notifications, emailFrom: v })}
        />

        <button
          onClick={() => saveSection("notifications", notifications)}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSave />
          {savingSection === "notifications"
            ? "Saving..."
            : "Save Notification Settings"}
        </button>
      </SectionContainer>

      {/* ##############################################################
                      3️⃣ WORKFLOW SETTINGS
      ############################################################## */}
      <SectionContainer title="Workflows" icon={FiSettings}>
        <Toggle
          label="Auto-Assign on Joining"
          value={workflows.autoAssignOnJoin}
          onChange={(v) => setWorkflows({ ...workflows, autoAssignOnJoin: v })}
        />

        <Toggle
          label="Auto-Assign on Department Change"
          value={workflows.autoAssignOnDeptChange}
          onChange={(v) => setWorkflows({ ...workflows, autoAssignOnDeptChange: v })}
        />

        <Input
          label="SOP Review Cycle (days)"
          type="number"
          value={workflows.sopReviewCycleDays}
          onChange={(v) => setWorkflows({ ...workflows, sopReviewCycleDays: v })}
        />

        <Input
          label="Flag Inactivity After (days)"
          type="number"
          value={workflows.inactivityDaysToFlag}
          onChange={(v) => setWorkflows({ ...workflows, inactivityDaysToFlag: v })}
        />

        <Toggle
          label="Require Approval For Training"
          value={workflows.requireApprovalForTraining}
          onChange={(v) =>
            setWorkflows({ ...workflows, requireApprovalForTraining: v })
          }
        />

        <button
          onClick={() => saveSection("workflows", workflows)}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSave />
          {savingSection === "workflows" ? "Saving..." : "Save Workflow Settings"}
        </button>
      </SectionContainer>

      {/* ##############################################################
                      4️⃣ EMPLOYEE SETTINGS
      ############################################################## */}
      <SectionContainer title="Employee Settings" icon={FiUsers}>
        <Toggle
          label="Self Onboarding"
          value={employees.selfOnboarding}
          onChange={(v) => setEmployees({ ...employees, selfOnboarding: v })}
        />

        <Dropdown
          label="Default Role"
          value={employees.defaultRole}
          onChange={(v) => setEmployees({ ...employees, defaultRole: v })}
          options={["staff", "manager"]}
        />

        <Toggle
          label="Allow Document Upload"
          value={employees.allowDocumentUpload}
          onChange={(v) => setEmployees({ ...employees, allowDocumentUpload: v })}
        />

        <Input
          label="Max Pending SOPs"
          type="number"
          value={employees.maxPendingSOPs}
          onChange={(v) => setEmployees({ ...employees, maxPendingSOPs: v })}
        />

        <button
          onClick={() => saveSection("employees", employees)}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSave />
          {savingSection === "employees" ? "Saving..." : "Save Employee Settings"}
        </button>
      </SectionContainer>
    </div>
  );
}
