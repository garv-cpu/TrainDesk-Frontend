// src/components/ActivityFeed.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Clock } from "lucide-react";
import { auth } from "../../utils/firebase";
import { authFetch } from "../../utils/api";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let s;

    async function connectSocket() {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken(true);

      s = io("https://traindesk-backend.onrender.com", {
        transports: ["websocket"],
        auth: { token },
      });

      s.on("activity", (data) => {
        setActivities((prev) => [data, ...prev]);
      });

      setSocket(s);
    }

    authFetch("/api/logs")
      .then((data) => setActivities(data))
      .catch((err) => console.error("LOG FETCH ERR:", err));

    connectSocket();

    return () => {
      if (s) s.disconnect();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow border h-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Recent Activity
      </h3>

      {activities.length === 0 && (
        <p className="text-gray-500 text-sm">No recent activity.</p>
      )}

      {/* -------------------------------------- */}
      {/* SCROLLABLE LIST AFTER 8 ITEMS */}
      {/* -------------------------------------- */}
      <ul
        className="space-y-4 overflow-y-auto pr-2"
        style={{ maxHeight: "440px" }} // Enough for ~8 items
      >
        {activities.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            <Clock className="w-5 h-5 text-blue-600 mt-1" />

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
