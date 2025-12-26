import React, { useState, useEffect, useRef } from "react";
import { Send, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SOSPanel from "../components/SOSPanel";
import { logSupportLabel } from "../firebase/writeSession";

/* 🔁 Call backend AI */
const analyzeWithBackend = async (message) => {
  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm here to listen. No judgment, just a safe space. How are things?",
      sender: "bot",
      time: "Now"
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [severity, setSeverity] = useState("low");

  const messagesEndRef = useRef(null);

  /* Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || severity === "crisis") return;

    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: timeNow
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResult = await analyzeWithBackend(userMsg.text);

      console.log("AI RESULT:", aiResult);

      const { supportLevel, stressCategory } = aiResult;

      /* 🚨 CRISIS: STOP AI, SHOW SOS */
      if (supportLevel === "crisis") {
        setSeverity("crisis");
        return;
      }

      /* Normal supportive response */
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I hear you. You're not alone — want to talk more about it?",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);

      /* 🔐 Store ONLY labels */
      logSupportLabel(supportLevel, stressCategory);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[85vh] bg-neuro-bg rounded-3xl shadow-xl overflow-hidden border border-slate-200">

      {/* 🚨 CRISIS OVERRIDE */}
      {severity === "crisis" && <SOSPanel />}

      {/* Header */}
      <div className="bg-white p-4 px-6 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border">
            <img
              src="/images/chat-boy.jpeg"
              alt="Companion"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Neurovia Companion</h2>
            <p className="text-xs text-slate-500">Always here for you</p>
          </div>
        </div>

        <Link
          to="/sos"
          className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full text-sm font-bold"
        >
          <Shield size={16} />
          Emergency
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src="/images/chat-boy.jpeg"
                  alt="Bot"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="max-w-[75%]">
              <div
                className={`p-4 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-neuro-accent text-white"
                    : "bg-white border text-slate-700"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400">{msg.time}</span>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 ml-3 flex items-center justify-center bg-neuro-light rounded-full">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-slate-400 animate-pulse">
            Companion is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            disabled={severity === "crisis"}
            className="flex-1 p-3 border rounded-xl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || severity === "crisis"}
            className="bg-neuro-accent text-white p-3 rounded-xl"
          >
            <Send size={20} />
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400 mt-2">
          Messages are analyzed for safety — never stored with identity.
        </p>
      </div>
    </div>
  );
};

export default Chat;
