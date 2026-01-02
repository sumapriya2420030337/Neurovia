import React, { useState, useEffect, useRef } from "react";
import { Send, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SOSPanel from "../components/SOSPanel";

const API_URL = import.meta.env.VITE_API_URL;

const Chat = () => {
  const location = useLocation();
  const injectedRef = useRef(false);
  const messagesEndRef = useRef(null);

  const emotion = location.state?.emotion;
  const cause = location.state?.cause;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm here to listen. No judgment, just a safe space. How are things?",
      sender: "assistant",
      time: "Now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [severity, setSeverity] = useState("low");

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto‑prefill once (from check‑in)
  useEffect(() => {
    if (injectedRef.current || !emotion || !cause) return;
    injectedRef.current = true;

    const intro = `I'm feeling ${emotion.toLowerCase()} because ${cause.toLowerCase()}.`;
    sendMessage(intro);
  }, [emotion, cause]);

  const sendMessage = async (text) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user", time: timeNow },
    ]);

    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
        }),
      });

      const data = await res.json();

      if (data.triggerSOS) setSeverity("crisis");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: "assistant",
          time: timeNow,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Connection error.",
          sender: "assistant",
          time: timeNow,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="relative flex flex-col h-[85vh] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
      {severity === "crisis" && <SOSPanel />}

      {/* Header */}
      <div className="p-4 px-6 border-b flex justify-between items-center bg-white">
        <div>
          <h2 className="font-bold text-lg">
            NIA{" "}
            <span className="text-sm font-medium text-slate-500">
              (Neurovia Companion)
            </span>
          </h2>
          <p className="text-xs text-slate-500">Your AI Mental Health Companion</p>
        </div>

        <Link
          to="/sos"
          className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full text-sm font-bold border border-red-100"
        >
          <Shield size={16} />
          Emergency
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col max-w-[70%]">
              <div
                className={`p-4 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white self-end"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {msg.text}
              </div>

              {/* NIA label */}
              {msg.sender === "assistant" && (
                <span className="text-[10px] text-neuro-accent font-semibold mt-1 ml-1">
                  NIA
                </span>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-slate-400 ml-2">NIA is typing…</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-3 items-center bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            disabled={severity === "crisis"}
            className="flex-1 bg-transparent p-2 focus:outline-none text-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || severity === "crisis"}
            className="bg-green-500 text-white p-3 rounded-xl disabled:opacity-50"
          >
            <Send size={18} />
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
