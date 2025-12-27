import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, SkipForward, AlertTriangle } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    { id: 1, text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?" },
    { id: 2, text: "How often have you felt down, depressed, or hopeless?" },
    { id: 3, text: "Have you had trouble falling or staying asleep, or sleeping too much?" },
    { id: 4, text: "Have you felt tired or had little energy?" },
    { id: 5, text: "Have you had a poor appetite or been overeating?" }
  ];

  const options = [
    { label: "Not at all", score: 0 },
    { label: "Several days", score: 1 },
    { label: "More than half the days", score: 2 },
    { label: "Nearly every day", score: 3 }
  ];

  const handleOptionChange = (qId, score) => {
    setAnswers({ ...answers, [qId]: score });
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);

    if (total <= 4) {
      return {
        level: 'Low',
        message: 'You seem to be doing relatively well, but it’s always okay to talk.',
        chatPrefill:
          'I took the wellness quiz and my results show low concern, but I’d still like to talk.',
      };
    } else if (total <= 8) {
      return {
        level: 'Moderate',
        message: 'You might be experiencing some stress. Talking could really help.',
        chatPrefill:
          'I completed the wellness quiz and my results show moderate stress. I want to talk about it.',
      };
    } else {
      return {
        level: 'High',
        message:
          'Your answers suggest significant distress. You’re not alone, and support is important.',
        chatPrefill:
          'I completed the wellness quiz and my results show high distress. I need help.',
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = calculateResult();
    setResult(res);
    setShowResult(true);
  };

  const goToChat = () => {
    navigate('/chat', {
      state: {
        prefill: result.chatPrefill,
        source: 'quiz',
        severity: result.level.toLowerCase(),
      },
    });
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto p-8 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 text-center">
          <BrainCircuit size={40} className="mx-auto text-neuro-accent" />
          <h2 className="text-2xl font-bold text-neuro-primary">
            Wellness Check Result
          </h2>

          <div
            className={`p-4 rounded-xl font-semibold ${
              result.level === 'High'
                ? 'bg-red-50 text-red-700'
                : result.level === 'Moderate'
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-green-50 text-green-700'
            }`}
          >
            {result.level} Concern
          </div>

          <p className="text-slate-600">{result.message}</p>

          <button
            onClick={goToChat}
            className="w-full bg-neuro-primary text-white p-4 rounded-2xl font-bold hover:bg-neuro-accent transition-all"
          >
            Chat with NIA
          </button>

          {result.level === 'High' && (
            <button
              onClick={() => navigate('/sos')}
              className="w-full mt-2 bg-red-600 text-white p-4 rounded-2xl font-bold hover:bg-red-700 flex items-center justify-center gap-2"
            >
              <AlertTriangle size={18} />
              Get Immediate Help
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fadeIn relative">
      <button
        onClick={() => navigate('/chat')}
        className="absolute top-0 right-4 text-slate-400 hover:text-neuro-primary flex items-center gap-1"
      >
        Skip to Chat <SkipForward size={16} />
      </button>

      <div className="text-center mb-8 mt-4">
        <div className="bg-neuro-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-neuro-accent">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-3xl font-bold text-neuro-primary font-display">
          Mental Wellness Check
        </h1>
        <p className="text-slate-500 mt-2">
          A quick check-in to understand how you're doing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-3xl shadow-sm"
      >
        {questions.map((q, i) => (
          <div key={q.id} className="space-y-3">
            <h3 className="font-bold text-slate-800">
              <span className="text-neuro-accent mr-2">{i + 1}.</span>
              {q.text}
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 pl-6">
              {options.map((opt) => (
                <label
                  key={opt.label}
                  className={`p-3 rounded-xl border-2 cursor-pointer ${
                    answers[q.id] === opt.score
                      ? 'border-neuro-accent bg-neuro-accent/5 font-bold'
                      : 'border-slate-100 hover:border-neuro-accent/50'
                  }`}
                >
                  <input
                    type="radio"
                    required
                    name={`q-${q.id}`}
                    className="mr-2 accent-neuro-accent"
                    onChange={() =>
                      handleOptionChange(q.id, opt.score)
                    }
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-neuro-primary text-white p-4 rounded-2xl font-bold hover:bg-neuro-accent transition-all"
        >
          Submit & View Results <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export default Quiz;
