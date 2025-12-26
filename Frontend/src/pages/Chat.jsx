import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import SOSPanel from "../components/SOSPanel";
import { logSupportLabel } from "../firebase/writeSession";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm here to listen. What's on your mind?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [severity, setSeverity] = useState("low");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || severity === "crisis") return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await res.json();

      if (data.supportLevel === "crisis") {
        setSeverity("crisis");
        return;
      }

      // log ONLY labels (no text)
      logSupportLabel(data.supportLevel, data.stressCategory);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I hear you. Want to tell me a bit more?",
          sender: "bot"
        }
      ]);

    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">

      {severity === "crisis" && <SOSPanel />}

      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          disabled={severity === "crisis"}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || severity === "crisis"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
