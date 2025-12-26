import React, { useState } from 'react';
import { Smile, Meh, Frown, BookOpen, Users, Heart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [category, setCategory] = useState(null);

  const moods = [
    { icon: Smile, label: "Good", val: "low" },
    { icon: Meh, label: "Okay", val: "moderate" },
    { icon: Frown, label: "Overwhelmed", val: "high" },
  ];

  const categories = [
    { id: 'exams', label: 'Academics', icon: BookOpen },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'loneliness', label: 'Loneliness', icon: Heart },
    { id: 'finance', label: 'Financial', icon: DollarSign },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-8 text-center pt-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-neuro-primary">Daily Check-In</h1>
        <p className="text-slate-500">How are you feeling right now?</p>
      </div>

      {/* Mood Selector */}
      <div className="flex justify-center gap-6">
        {moods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMood(m.val)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all w-28
              ${selectedMood === m.val 
                ? 'bg-neuro-primary text-white shadow-lg scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}
            `}
          >
            <m.icon size={32} />
            <span className="font-semibold">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Category Selector */}
      {selectedMood && (
        <div className="animate-fadeIn space-y-4">
          <p className="text-slate-600 font-medium">What's on your mind?</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-xl flex items-center justify-center gap-2 transition
                  ${category === cat.id 
                    ? 'bg-neuro-accent text-white font-bold' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
                `}
              >
                <cat.icon size={18} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Chat Button */}
      {selectedMood && category && (
        <div className="pt-6 animate-fadeIn">
          <Link to="/chat" className="block w-full bg-neuro-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
            Start Chat
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckIn;