import React, { useState, useEffect, useRef } from "react";
import { Send, User, Shield } from "lucide-react";
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto‑prefill (once)
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
    <div className="relative flex flex-col h-[85vh] bg-white rounded-3xl shadow-xl overflow-hidden">
      {severity === "crisis" && <SOSPanel />}

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold">Neurovia Companion</h2>
        <Link to="/sos" className="text-red-600 flex items-center gap-1">
          <Shield size={16} /> Emergency
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-xl max-w-[70%] ${
              msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-100"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-xl p-3"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-green-500 text-white p-3 rounded-xl">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
