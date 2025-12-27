import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SOSPanel from '../components/SOSPanel';

const Chat = () => {
  const location = useLocation();
  const hasInjectedRef = useRef(false);

  const emotion = location.state?.emotion;
  const cause = location.state?.cause;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm here to listen. No judgment, just a safe space. How are things?",
      sender: 'assistant',
      time: 'Now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [severity, setSeverity] = useState('low');

  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 🔥 AUTO PREFILL WHEN COMING FROM CHECK-IN
  useEffect(() => {
    if (!emotion || !cause) return;
    if (hasInjectedRef.current) return;

    hasInjectedRef.current = true;

    const introMessage = `I'm feeling ${emotion.toLowerCase()} right now. What's been on my mind is ${cause.toLowerCase()}.`;

    const timeNow = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg = {
      id: Date.now(),
      text: introMessage,
      sender: 'user',
      time: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ sender: 'user', text: introMessage }],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.triggerSOS) {
          setSeverity('crisis');
          return;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: data.reply,
            sender: 'assistant',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: 'Connection error.',
            sender: 'assistant',
            time: timeNow,
          },
        ]);
      })
      .finally(() => setIsTyping(false));
  }, [emotion, cause]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: timeNow,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();

      if (data.triggerSOS) {
        setSeverity('crisis');
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'assistant',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: 'Connection error.',
          sender: 'assistant',
          time: timeNow,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[85vh] bg-neuro-bg rounded-3xl shadow-xl overflow-hidden border border-slate-200">
      {/* 🚨 CRISIS OVERRIDE */}
      {severity === 'crisis' && <SOSPanel />}

      {/* Header */}
      <div className="bg-white p-4 px-6 border-b border-slate-100 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-neuro-accent p-0.5 shadow-sm overflow-hidden">
              <img
                src="/images/chat-boy.jpeg"
                alt="Companion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>

          <div>
            <h2 className="font-bold text-slate-800 text-lg font-display">
              Neurovia Companion
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Always here for you
            </p>
          </div>
        </div>

        <Link
          to="/sos"
          className="flex items-center gap-2 text-neuro-danger bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all text-sm font-bold border border-red-100"
        >
          <Shield size={16} />
          <span>Emergency</span>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            } animate-slideUp`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden mr-3 mt-1 shadow-sm bg-white">
                <img
                  src="/images/chat-boy.jpeg"
                  alt="Bot"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className={`max-w-[75%] flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-neuro-accent text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-neuro-light flex items-center justify-center text-neuro-primary ml-3 mt-1">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-pulse pl-14">
            <div className="bg-slate-200 px-4 py-2 rounded-full text-xs text-slate-500 font-medium">
              typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-3 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-neuro-accent/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            disabled={severity === 'crisis'}
            className="flex-1 bg-transparent p-2 focus:outline-none text-slate-700 placeholder-slate-400 ml-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || severity === 'crisis'}
            className="bg-neuro-accent text-white p-3 rounded-xl hover:bg-neuro-primary disabled:opacity-50 shadow-md transition-all"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          Messages are analyzed for safety but never stored with your identity.
        </p>
      </div>
    </div>
  );
};

export default Chat;
