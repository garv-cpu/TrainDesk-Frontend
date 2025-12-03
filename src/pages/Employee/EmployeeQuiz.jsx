import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/api";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EmployeeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressSaved, setProgressSaved] = useState(false);

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const videoEl = document.querySelector("video");
    if (!videoEl) return;

    const interval = setInterval(async () => {
      const percent = Math.round(
        (videoEl.currentTime / videoEl.duration) * 100
      );

      if (percent > 0 && percent < 100) {
        await authFetch("/api/employee/training/progress", {
          method: "POST",
          body: JSON.stringify({ videoId: id, percent }),
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    if (video) {
      console.log("Video quiz data:", video.quiz);
    }
  }, [video]);

  useEffect(() => {
    async function loadProgress() {
      try {
        const progressRes = await authFetch(`/api/employee/progress/${id}`);
        if (progressRes?.completed) {
          setProgressSaved(true);
        }
      } catch (err) {
        console.error("Progress load error:", err);
      }
    }

    loadProgress();
  }, [id]);

  // -------------------------------
  // Load video + quiz
  // -------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await authFetch(`/api/training/${id}`);
        setVideo(res);
      } catch (error) {
        console.error("Video fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // -------------------------------
  // Save watch progress
  // -------------------------------
  const saveProgress = async () => {
    try {
      await authFetch("/api/employee/training/complete", {
        method: "POST",
        body: JSON.stringify({ videoId: id }),
      });
      setProgressSaved(true);
    } catch (err) {
      console.error("Progress save error:", err);
    }
  };


  // -------------------------------
  // Handle quiz answer change
  // -------------------------------
  const handleAnswer = (qIndex, opt) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: opt }));
  };

  // -------------------------------
  // Submit quiz + scoring
  // -------------------------------
  const submitQuiz = async () => {
    if (!video?.quiz || video.quiz.length === 0) return;

    setSubmitting(true);

    let points = 0;
    video.quiz.forEach((q, i) => {
      if (answers[i] === q.correct) points++;
    });

    const finalScore = Math.round((points / video.quiz.length) * 100);
    setScore(finalScore);

    // Save score to backend
    try {
      await authFetch(`/api/employee/score`, {
        method: "POST",
        body: JSON.stringify({
          videoId: id,
          score: finalScore,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  if (!video)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p className="text-lg">Video not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50/50 p-4 md:p-6 text-gray-800">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-4"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-blue-100">
        <h1 className="text-2xl font-semibold text-blue-700">{video.title}</h1>
        <p className="text-gray-500 mt-1">{video.description}</p>
      </div>

      {/* VIDEO PLAYER */}
      <div className="mt-5 bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
        <video
          className="w-full rounded-xl max-h-[70vh] object-contain"
          controls
          onEnded={saveProgress}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Mark Complete */}
      <div className="mt-6 flex justify-center">
        <button
          disabled={progressSaved}
          onClick={saveProgress}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-md disabled:opacity-50"
        >
          {progressSaved ? "Completed ✔" : "Mark as Completed"}
        </button>
      </div>

      {/* QUIZ SECTION */}
    </div>
  );
}
