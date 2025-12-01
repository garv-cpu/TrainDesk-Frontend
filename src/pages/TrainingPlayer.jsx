import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { authFetch } from "../utils/api";
import { ArrowLeft } from "lucide-react";

export default function TrainingPlayer() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function loadVideo() {
            const data = await authFetch(`/api/training/${id}`);
            setVideo(data);
        }
        loadVideo();
    }, [id]);

    if (!video)
        return <p className="text-blue-600 text-lg">Loading video...</p>;

    return (
        <div className="text-black">
            {/* Back */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4"
            >
                <ArrowLeft size={18} />
                Back
            </Link>

            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                {video.title}
            </h1>

            {/* Video Player */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-lg max-w-3xl mx-auto">
                <video
                    src={video.videoUrl}
                    controls
                    className="w-full rounded-xl max-h-[70vh] object-contain"
                />
            </div>


            {/* Description */}
            <p className="mt-4 text-gray-700">{video.description}</p>
        </div>
    );
}
