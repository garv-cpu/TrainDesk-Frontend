import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Film, Loader2 } from "lucide-react";
import { authFetch } from "../../utils/api";

export default function EmployeeTraining() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await authFetch("/api/employee/training");
        setVideos(data);
      } catch (err) {
        console.error("Training load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-10 text-blue-600">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Training Videos</h1>
        <p className="text-slate-600 mt-1">
          Watch the training content assigned to you.
        </p>
      </div>

      {/* TRAINING VIDEOS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 && (
          <p className="text-slate-600">No training videos available.</p>
        )}

        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden hover:shadow-md transition"
          >
            {/* Thumbnail */}
            <div className="w-full h-40 bg-slate-200 overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-blue-700">
                {video.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {video.description}
              </p>

              <Link
                to={`/employee/training/${video._id}`}
                className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                <PlayCircle size={18} />
                Watch Video
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
