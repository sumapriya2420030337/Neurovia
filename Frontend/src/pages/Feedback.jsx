import React, { useState } from "react";
import { Send, Star } from "lucide-react";

// 🌟 IMPORT IMAGE FROM ASSETS
import feedbackImg from "../assets/feedback-illustration.jpeg";

const API_URL = import.meta.env.VITE_API_URL;

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anonymous User",
          email: "anonymous@neurovia.app",
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
      setMessage("");

      // Hide success after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert("Failed to send feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-fadeIn text-center pb-12">

      {/* 🌟 Header & Circular Image */}
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-neuro-bg ring-1 ring-slate-100">
          <img
            src={feedbackImg}
            alt="Give Feedback"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-neuro-primary font-display">
            Your Voice Matters
          </h1>
          <p className="text-lg text-neuro-secondary">
            Help us make Neurovia better for everyone.
          </p>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden text-left">

        {/* Success Overlay */}
        {submitted && (
          <div className="absolute inset-0 bg-neuro-primary/95 flex flex-col items-center justify-center text-white z-20 animate-fadeIn p-8 text-center">
            <Star
              size={48}
              className="mb-4 text-yellow-300 animate-bounce"
              fill="currentColor"
            />
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p>Your feedback has been sent successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 pl-1">
              Share your thoughts & suggestions
            </label>
            <textarea
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What features would help you most? How has your experience been?"
              className="w-full p-5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-neuro-accent focus:ring-4 focus:ring-neuro-accent/10 bg-slate-50 resize-none font-medium text-slate-700 transition-all placeholder-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neuro-primary text-white font-bold text-lg p-4 rounded-2xl hover:bg-neuro-accent hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-60"
          >
            <Send size={22} />
            {loading ? "Sending..." : "Submit Feedback"}
          </button>

          <p className="text-xs text-center text-slate-400 font-medium pt-2">
            Feedback is anonymous and used solely for improvement.
          </p>
        </form>

        {/* Decorative Blob */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neuro-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Feedback;
