import React, { useState } from "react";
import { Play } from "lucide-react";

export default function DemoTraining() {
  const [videos] = useState([
    {
      _id: "1",
      title: "Workplace Safety Basics",
      description: "Safety rules for new employees.",
      thumbnailUrl:
        "https://dummyimage.com/600x350/1e3a8a/ffffff&text=Safety+Training",
    },
    {
      _id: "2",
      title: "Onboarding Guide",
      description: "Step-by-step onboarding flow.",
      thumbnailUrl:
        "https://dummyimage.com/600x350/1e3a8a/ffffff&text=Onboarding",
    },
    {
      _id: "3",
      title: "Client Handling 101",
      description: "Learn how to talk to customers effectively.",
      thumbnailUrl:
        "https://dummyimage.com/600x350/1e3a8a/ffffff&text=Client+Handling",
    },
  ]);

  return (
    <div className="text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Training Videos</h1>

      {/* DEMO VIDEO LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div
            key={v._id}
            className="bg-white rounded-xl p-3 shadow-md border border-gray-200"
          >
            <div className="cursor-pointer">
              <img
                src={v.thumbnailUrl}
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>

            <h3 className="mt-2 text-lg font-semibold text-blue-700">
              {v.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">{v.description}</p>

            <button className="flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700">
              <Play size={18} /> View Demo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
