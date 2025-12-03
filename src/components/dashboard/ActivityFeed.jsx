import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Clock, CheckCircle, PlayCircle } from "lucide-react";
import { auth } from "../../utils/firebase";
import { authFetch } from "../../utils/api";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const socketRef = useRef(null);

  // --------------------------------------------
  // Load initial logs + connect websocket
  // --------------------------------------------
  useEffect(() => {
    async function init() {
      try {
        const logs = await authFetch("/api/logs");
        setActivities(logs);
      } catch (err) {
        console.error("LOG FETCH ERR:", err);
      }

      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken(true);

      const s = io("https://traindesk-backend.onrender.com", {
        transports: ["websocket"],
        auth: { token },
      });

      socketRef.current = s;

      // 🟦 Normal activity logs
      s.on("activity", (data) => {
        addActivity(data);
      });

      // 🟦 Training Progress
      s.on("training:progress", (data) => {
        addActivity({
          message: `${data.employee} viewed ${data.percent}% of "${data.video}"`,
          createdAt: new Date().toISOString(),
          type: "progress",
        });
      });

      // 🟦 Training Completed
      s.on("training:completed", (data) => {
        addActivity({
          message: `${data.employee} completed "${data.video}"`,
          createdAt: new Date().toISOString(),
          type: "completed",
        });
      });
    }

    init();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // --------------------------------------------
  // Prevent spam / dedupe last similar event
  // --------------------------------------------
  function addActivity(newItem) {
    setActivities((prev) => {
      if (prev.length > 0 && prev[0].message === newItem.message) {
        return prev; // skip duplicate
      }
      return [newItem, ...prev];
    });
  }

  // --------------------------------------------
  // Icon selector
  // --------------------------------------------
  function renderIcon(type) {
    if (type === "completed")
      return <CheckCircle className="w-5 h-5 text-green-600 mt-1" />;
    if (type === "progress")
      return <PlayCircle className="w-5 h-5 text-blue-600 mt-1" />;
    return <Clock className="w-5 h-5 text-blue-600 mt-1" />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border h-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Recent Activity
      </h3>

      {activities.length === 0 && (
        <p className="text-gray-500 text-sm">No recent activity.</p>
      )}

      <ul
        className="space-y-4 overflow-y-auto pr-2"
        style={{ maxHeight: "440px" }}
      >
        {activities.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            {renderIcon(item.type)}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.message}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
