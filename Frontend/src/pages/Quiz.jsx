import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, SkipForward } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  // 🌟 UPDATED: Now 5 Questions
  const questions = [
    { id: 1, text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?" },
    { id: 2, text: "How often have you felt down, depressed, or hopeless?" },
    { id: 3, text: "Have you had trouble falling or staying asleep, or sleeping too much?" },
    { id: 4, text: "Have you felt tired or had little energy?" },
    { id: 5, text: "Have you had a poor appetite or been overeating?" }
  ];

  const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

  const handleOptionChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would analyze the score here.
    // Navigate to Chat
    navigate('/chat');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fadeIn pb-12 relative">
      
      {/* SKIP BUTTON (Top Right) */}
      <button 
        onClick={() => navigate('/chat')}
        className="absolute top-0 right-4 flex items-center gap-1 text-slate-400 hover:text-neuro-primary transition-colors font-medium text-sm"
      >
        Skip to Chat <SkipForward size={16} />
      </button>

      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <div className="bg-neuro-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-neuro-accent">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-3xl font-bold text-neuro-primary font-display">Mental Wellness Check</h1>
        <p className="text-slate-500 mt-2">A quick check-in to see how you're doing.</p>
      </div>

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        
        {questions.map((q, index) => (
          <div key={q.id} className="space-y-3">
            <h3 className="font-bold text-slate-800 text-lg">
              <span className="text-neuro-accent mr-2">{index + 1}.</span> 
              {q.text}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6">
              {options.map((opt) => (
                <label 
                  key={opt} 
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${answers[q.id] === opt 
                      ? 'border-neuro-accent bg-neuro-accent/5 text-neuro-primary font-bold' 
                      : 'border-slate-100 hover:border-neuro-accent/50 text-slate-600'}
                  `}
                >
                  <input 
                    type="radio" 
                    name={`q-${q.id}`} 
                    value={opt}
                    onChange={() => handleOptionChange(q.id, opt)}
                    className="accent-neuro-accent w-4 h-4"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button 
          type="submit"
          className="w-full bg-neuro-primary text-white font-bold text-lg p-4 rounded-2xl hover:bg-neuro-accent hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-6 shadow-lg shadow-neuro-primary/20"
        >
          Submit & Chat with NIA <ArrowRight size={20} />
        </button>

      </form>
    </div>
  );
};

export default Quiz;