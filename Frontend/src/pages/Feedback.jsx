import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';

// 🌟 IMPORT IMAGE FROM ASSETS
// Ensure the file name is exactly 'feedback-illustration.jpeg'
import feedbackImg from '../assets/feedback-illustration.jpeg';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send the data to a backend here.
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-fadeIn text-center pb-12">
      
      {/* 🌟 Header & CIRCULAR IMAGE */}
      <div className="flex flex-col items-center space-y-6">
         {/* Circular Image Container */}
         <div className="relative w-48 h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-neuro-bg z-10 ring-1 ring-slate-100">
           {/* Using the imported image variable */}
           <img
             src={feedbackImg}
             alt="Give Feedback"
             className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
           />
         </div>
         
         <div className="space-y-2">
            <h1 className="text-4xl font-bold text-neuro-primary font-display">Your Voice Matters</h1>
            <p className="text-lg text-neuro-secondary">Help us make Neurovia better for everyone.</p>
         </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-left relative overflow-hidden">
         
         {/* Success Message Overlay */}
         {submitted && (
            <div className="absolute inset-0 bg-neuro-primary/95 flex flex-col items-center justify-center text-white z-20 animate-fadeIn p-8 text-center">
                <Star size={48} className="mb-4 text-yellow-300 animate-bounce" fill="currentColor" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p>Your feedback helps our community grow.</p>
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 pl-1">Share your thoughts & suggestions</label>
              <textarea
                rows="6"
                placeholder="What features would help you most? How has your experience been?"
                className="w-full p-5 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-neuro-accent focus:ring-4 focus:ring-neuro-accent/10 bg-slate-50 resize-none font-medium text-slate-700 transition-all placeholder-slate-400"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-neuro-primary text-white font-bold text-lg p-4 rounded-2xl hover:bg-neuro-accent hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Send size={22} />
              Submit Feedback
            </button>
            <p className="text-xs text-center text-slate-400 font-medium pt-2">Feedback is anonymous and used solely for improvement.</p>
         </form>

         {/* Decorative Background Blob */}
         <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neuro-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Feedback;