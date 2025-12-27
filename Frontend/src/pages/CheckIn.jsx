import React, { useState } from 'react';
import { BookOpen, Users, Heart, DollarSign, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logCheckIn, startSession } from '../firebase/firebaseLog';

// mood images
import greatImg from '../assets/mood-great.jpeg';
import happyImg from '../assets/mood-happy.jpeg';
import calmImg from '../assets/mood-calm.jpeg';
import tiredImg from '../assets/mood-tired.jpeg';
import distressedImg from '../assets/mood-distressed.jpeg';

const CheckIn = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const moods = [
    { img: greatImg, label: 'Great' },
    { img: happyImg, label: 'Happy' },
    { img: calmImg, label: 'Calm' },
    { img: tiredImg, label: 'Tired' },
    { img: distressedImg, label: 'Distressed' },
  ];

  const categories = [
    { id: 'Academics', label: 'Academics', icon: BookOpen },
    { id: 'Family', label: 'Family', icon: Users },
    { id: 'Loneliness', label: 'Loneliness', icon: Heart },
    { id: 'Financial', label: 'Financial', icon: DollarSign },
  ];

  const startChat = async () => {
    if (!selectedMood || !category || loading) return;

    setLoading(true);

    try {
      console.log('🧠 Logging check-in...');
      await logCheckIn({
        emotion: selectedMood,
        category,
      });

      console.log('🟢 Starting session...');
      await startSession();

      console.log('➡️ Redirecting to chat');

      navigate('/chat', {
        state: {
          emotion: selectedMood,
          cause: category,
          fromCheckIn: true,
        },
      });
    } catch (err) {
      console.error('❌ Check-in flow failed:', err);

      // 🔥 IMPORTANT: still redirect even if logging fails
      navigate('/chat', {
        state: {
          emotion: selectedMood,
          cause: category,
          fromCheckIn: true,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-14 text-center space-y-10 animate-fadeIn">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-neuro-primary font-display">
          Daily Check‑In
        </h1>
        <p className="text-neuro-secondary mt-1">
          How are you feeling right now?
        </p>
      </div>

      {/* MOODS */}
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => {
              setSelectedMood(mood.label);
              setCategory('');
            }}
            className={`w-24 md:w-28 p-3 rounded-3xl flex flex-col items-center gap-2 transition-all duration-300
              ${
                selectedMood === mood.label
                  ? 'bg-white border-2 border-neuro-accent shadow-lg scale-105'
                  : 'bg-white/60 border-2 border-transparent hover:bg-white hover:shadow-md'
              }
            `}
          >
            <img src={mood.img} alt={mood.label} className="w-14 h-14 object-contain" />
            <span className="text-sm font-semibold">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* CATEGORIES */}
      {selectedMood && (
        <div className="space-y-5 animate-slideUp">
          <p className="text-lg font-medium text-neuro-primary">
            What’s on your mind?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-4 rounded-2xl flex flex-col items-center gap-2 font-medium transition-all
                    ${
                      category === cat.id
                        ? 'bg-neuro-accent text-white shadow-md scale-105'
                        : 'bg-white border-2 border-neuro-bg text-neuro-secondary hover:border-neuro-accent/40'
                    }
                  `}
                >
                  <Icon size={22} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* START CHAT */}
      <div
        className={`pt-8 flex justify-center transition-all duration-500
          ${selectedMood && category ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button
          onClick={startChat}
          disabled={loading}
          className="group flex flex-col items-center gap-4"
        >
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src="/images/chat-boy.jpeg" alt="Chat" className="w-full h-full object-cover" />
          </div>

          <span className="bg-neuro-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2">
            <MessageCircle size={20} />
            {loading ? 'Starting...' : 'Chat with NIA'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CheckIn;
