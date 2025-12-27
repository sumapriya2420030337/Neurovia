import React, { useState } from 'react';
import { BookOpen, Users, Heart, DollarSign, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// 🌟 IMPORT ALL 5 MOOD IMAGES
import greatImg from '../assets/mood-great.jpeg';
import happyImg from '../assets/mood-happy.jpeg';
import calmImg from '../assets/mood-calm.jpeg';
import tiredImg from '../assets/mood-tired.jpeg';
import distressedImg from '../assets/mood-distressed.jpeg';

const CheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [category, setCategory] = useState(null);

  // 🌟 5 MOODS CONFIGURATION
  const moods = [
    { img: greatImg, label: "Great", val: "low" },
    { img: happyImg, label: "Happy", val: "low" },
    { img: calmImg, label: "Calm", val: "moderate" },
    { img: tiredImg, label: "Tired", val: "moderate" },
    { img: distressedImg, label: "Distressed", val: "high" },
  ];

  const categories = [
    { id: 'exams', label: 'Academics', icon: BookOpen },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'loneliness', label: 'Loneliness', icon: Heart },
    { id: 'finance', label: 'Financial', icon: DollarSign },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center pt-8 px-4 pb-12 animate-fadeIn">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-neuro-primary font-display">Daily Check-In</h1>
        <p className="text-neuro-secondary">How are you feeling right now?</p>
      </div>

      {/* Mood Selector - 5 Items */}
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMood(m.label)} 
            className={`flex flex-col items-center gap-2 p-3 rounded-3xl transition-all duration-300 w-24 md:w-28 group
              ${selectedMood === m.label 
                ? 'bg-white shadow-xl scale-110 border-2 border-neuro-accent' 
                : 'bg-white/50 hover:bg-white hover:shadow-md border-2 border-transparent'}
            `}
          >
            <img 
              src={m.img} 
              alt={m.label} 
              className={`w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-300 ${selectedMood === m.label ? 'scale-110' : 'group-hover:scale-110'}`}
            />
            <span className={`text-sm font-semibold transition-colors ${selectedMood === m.label ? 'text-neuro-primary' : 'text-neuro-secondary'}`}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* Category Selector */}
      {selectedMood && (
        <div className="animate-slideUp space-y-4">
          <p className="text-neuro-primary font-medium text-lg">What's on your mind?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 font-medium
                  ${category === cat.id 
                    ? 'bg-neuro-accent text-white shadow-md scale-105' 
                    : 'bg-white border-2 border-neuro-bg text-neuro-secondary hover:border-neuro-accent/30 hover:bg-neuro-bg'}
                `}
              >
                <cat.icon size={24} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🌟 CIRCULAR START CHAT BUTTON */}
      <div className={`pt-8 transition-all duration-500 flex justify-center ${selectedMood && category ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <Link to="/chat" className="group flex flex-col items-center gap-4 relative">
          
          {/* 1. The Circular Image Container */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-300 ring-4 ring-neuro-bg group-hover:ring-neuro-accent/30">
             <img 
               src="/images/chat-boy.jpeg" 
               alt="Chat with NIA" 
               className="w-full h-full object-cover"
             />
          </div>

          {/* 2. The Label Button - 🌟 UPDATED TO "Chat with NIA" */}
          <span className="bg-neuro-primary text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg group-hover:bg-neuro-accent group-hover:shadow-neuro-accent/50 transition-all duration-300 flex items-center gap-2">
            <MessageCircle size={20} />
            Chat with NIA
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CheckIn;