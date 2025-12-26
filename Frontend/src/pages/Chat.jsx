import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Shield } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import SOSPanel from '../components/SOSPanel'; 
import { logSupportLabel } from '../firebase/writeSession'; 

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello. I'm here to listen without judgment. How are you feeling today?", sender: 'bot', time: 'Now' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [severity, setSeverity] = useState('low'); 
  
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. User Message with Time
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), text: input, sender: 'user', time: timeNow };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Mock AI Delay
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let newSeverity = 'low';
      let category = 'other';
      let botResponse = "I hear you. Tell me more about that.";

      // --- TRIGGERS ---
      if (lowerInput.includes("exam") || lowerInput.includes("fail") || lowerInput.includes("stress")) {
        newSeverity = 'moderate';
        category = 'exams';
        botResponse = "It sounds like the academic pressure is really heavy. Remember, one grade doesn't define you. Are you getting enough rest?";
      } 
      else if (lowerInput.includes("die") || lowerInput.includes("kill") || lowerInput.includes("suicide")) {
        newSeverity = 'crisis'; 
        category = 'safety';
      }
      // ----------------

      if (newSeverity === 'crisis') {
        setSeverity('crisis'); 
      } else {
        setMessages(prev => [...prev, { id: Date.now()+1, text: botResponse, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        logSupportLabel(newSeverity, category); 
      }
      
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="relative flex flex-col h-[85vh] bg-neuro-bg rounded-3xl shadow-xl overflow-hidden border border-slate-200">
      
      {/* 🚨 CRISIS OVERRIDE LAYER */}
      {severity === 'crisis' && <SOSPanel />}

      {/* Modern Header */}
      <div className="bg-white p-4 px-6 border-b border-slate-100 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-neuro-primary rounded-full flex items-center justify-center text-white shadow-md">
             <Bot size={20} />
           </div>
           <div>
             <h2 className="font-bold text-slate-800 text-lg">Neurovia Support</h2>
             <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <p className="text-xs text-slate-500 font-medium">Online • Private • Anonymous</p>
             </div>
           </div>
        </div>
        
        <Link to="/sos" className="flex items-center gap-2 text-neuro-danger bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all text-sm font-bold border border-red-100">
           <Shield size={16} />
           <span>Emergency</span>
        </Link>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
            
            {/* Bot Avatar (Left) */}
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-neuro-primary flex items-center justify-center text-white mr-3 mt-1 shadow-sm flex-shrink-0">
                <Bot size={14} />
              </div>
            )}

            {/* Bubble */}
            <div className={`max-w-[75%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                ${msg.sender === 'user' 
                  ? 'bg-neuro-accent text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
              `}>
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>

            {/* User Avatar (Right) */}
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 ml-3 mt-1 flex-shrink-0">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
           <div className="flex justify-start animate-pulse pl-11">
             <div className="bg-slate-200 px-4 py-2 rounded-full text-xs text-slate-500 font-medium">
               Neurovia is typing...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Area */}
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
            className="bg-neuro-accent text-white p-3 rounded-xl hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all hover:scale-105 active:scale-95"
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