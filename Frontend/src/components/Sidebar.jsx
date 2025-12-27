import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  Home,
  MessageCircle,
  Heart,
  ShieldAlert,
  MessageSquare,
  ClipboardList, // ✅ QUIZ ICON
} from 'lucide-react';

const Sidebar = () => {
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all
     ${
       isActive
         ? 'bg-neuro-bg text-neuro-primary'
         : 'text-slate-500 hover:bg-slate-100'
     }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col justify-between px-4 py-6">
      
      {/* LOGO */}
      <div>
        <div className="flex items-center gap-3 px-3 mb-10">
          <img
            src={logo}
            alt="Neurovia"
            className="w-10 h-10"
          />
          <div>
            <h2 className="font-bold text-lg text-neuro-primary">Neurovia</h2>
            <p className="text-xs text-slate-400">Student Support</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="space-y-2">
          <NavLink to="/" className={navItemClass}>
            <Home size={20} />
            Home
          </NavLink>

          <NavLink to="/chat" className={navItemClass}>
            <MessageCircle size={20} />
            Chat
          </NavLink>

          <NavLink to="/checkin" className={navItemClass}>
            <Heart size={20} />
            Check‑In
          </NavLink>

          {/* ✅ NEW QUIZ ENTRY */}
          <NavLink to="/quiz" className={navItemClass}>
            <ClipboardList size={20} />
            Wellness Quiz
          </NavLink>

          <NavLink to="/sos" className={navItemClass}>
            <ShieldAlert size={20} />
            Support & SOS
          </NavLink>

          <NavLink to="/feedback" className={navItemClass}>
            <MessageSquare size={20} />
            Feedback
          </NavLink>
        </nav>
      </div>

      {/* FOOTER */}
      <div className="bg-neuro-bg text-neuro-primary text-xs font-semibold text-center py-3 rounded-xl">
        “Here, with you.”
      </div>
    </aside>
  );
};

export default Sidebar;
