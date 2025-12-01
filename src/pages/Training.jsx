import React, { useEffect, useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";
import { authFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Training() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 🔍 SEARCH & FILTER STATES
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnailFile: null,
  });

  // LOAD VIDEOS
  async function loadVideos() {
    try {
      const data = await authFetch("/api/training");
      setVideos(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load training videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  // CLOUDINARY UPLOAD
  const uploadToCloudinary = async (file, isVideo = true) => {
    try {
      const sig = await authFetch(
        `/api/cloudinary-signature?folder=training_videos`
      );

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sig.apiKey);
      fd.append("timestamp", sig.timestamp);
      fd.append("signature", sig.signature);
      fd.append("folder", sig.folder);

      const uploadUrl = isVideo
        ? `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`
        : `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

      const res = await axios.post(uploadUrl, fd, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      return res.data.secure_url;
    } catch (err) {
      console.log("CLOUDINARY UPLOAD ERROR:", err.response?.data || err);
      throw err;
    }
  };

  // UPLOAD VIDEO
  const uploadVideo = async () => {
    if (!form.title || !form.videoFile)
      return toast.error("Title & Video required");

    setIsUploading(true);
    setUploadProgress(0);
    toast.loading("Uploading...");

    try {
      const videoUrl = await uploadToCloudinary(form.videoFile, true);

      let thumbnailUrl = "";
      if (form.thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(form.thumbnailFile, false);
      }

      await authFetch("/api/training", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          videoUrl,
          thumbnailUrl,
        }),
      });

      toast.dismiss();
      toast.success("Uploaded!");

      setOpenModal(false);
      setForm({ title: "", description: "", videoFile: null, thumbnailFile: null });

      loadVideos();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      toast.dismiss();
    } finally {
      setIsUploading(false);
    }
  };

  // DELETE VIDEO
  const deleteVideo = async (id) => {
    try {
      if (!window.confirm("Delete this video?")) return;

      toast.loading("Deleting...");
      await authFetch(`/api/training/${id}`, { method: "DELETE" });

      toast.success("Video deleted");
      loadVideos();
    } catch (error) {
      toast.error("Error deleting");
    } finally {
      toast.dismiss();
    }
  };

  // SKELETON
  const skeleton = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-3 shadow-md border border-gray-200 animate-pulse"
        >
          <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
          <div className="h-5 w-40 bg-gray-200 rounded mt-3"></div>
          <div className="h-4 w-24 bg-gray-200 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );

  // 🔍 FILTERED LIST
  const filteredVideos = videos.filter((v) => {
    const matchSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all"
        ? true
        : filter === "withThumbnail"
        ? v.thumbnailUrl
        : !v.thumbnailUrl;

    return matchSearch && matchFilter;
  });

  return (
    <div className="text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">Training Videos</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white"
        >
          <Plus size={20} />
          Upload Training Video
        </button>
      </div>

      {/* 🔍 Search + Filter Row */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          className="p-2 border rounded-lg w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg w-full md:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Videos</option>
          <option value="withThumbnail">With Thumbnail</option>
          <option value="withoutThumbnail">Without Thumbnail</option>
        </select>
      </div>

      {/* Skeleton */}
      {loading ? (
        skeleton
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length === 0 && (
            <p className="text-gray-600">No videos match your search</p>
          )}

          {filteredVideos.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-xl p-3 shadow-md border border-gray-200"
            >
              <div
                onClick={() => navigate(`/admin/training/${v._id}`)}
                className="cursor-pointer"
              >
                <img
                  src={
                    v.thumbnailUrl ||
                    "https://dummyimage.com/600x350/1e3a8a/ffffff&text=Training+Video"
                  }
                  alt="thumb"
                  className="rounded-lg w-full h-40 object-cover"
                />
              </div>

              <h3 className="mt-2 text-lg font-semibold text-blue-700">
                {v.title}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => navigate(`${v._id}`)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <Play size={18} /> View
                </button>

                <button
                  onClick={() => deleteVideo(v._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="w-full bg-gray-300 rounded-full h-3 mb-4 overflow-hidden mt-6">
          <div
            className="bg-blue-600 h-3 transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[420px] border border-gray-200 shadow-xl">
            <h2 className="text-xl font-bold text-black mb-4">
              Upload Training Video
            </h2>

            <input
              type="text"
              placeholder="Video Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 mb-3"
            />

            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 mb-3"
            />

            <label className="block mb-2 font-medium">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setForm({ ...form, videoFile: e.target.files[0] })
              }
              className="mb-4"
            />

            <label className="block mb-2 font-medium">
              Thumbnail (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, thumbnailFile: e.target.files[0] })
              }
              className="mb-4"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={uploadVideo}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
