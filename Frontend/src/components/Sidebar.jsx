import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Heart, Phone, MessageSquarePlus } from 'lucide-react'; 

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/checkin', icon: Heart, label: 'Check-In' },
    { path: '/sos', icon: Phone, label: 'Support & SOS', isAlert: true },
    // 🌟 FEEDBACK LINK ADDED HERE
    { path: '/feedback', icon: MessageSquarePlus, label: 'Feedback' }, 
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 fixed left-0 top-0 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50">
      
      {/* LOGO HEADER */}
      <div className="p-6 border-b border-slate-50 flex items-center gap-3">
        {/* Ensure this logo path matches your file! */}
        <img 
          src="/images/neurovia-logo.jpeg" 
          alt="Neurovia Logo" 
          className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-100"
        />
        <div>
          <h1 className="text-2xl font-bold text-neuro-primary font-display tracking-tight">Neurovia</h1>
          <p className="text-xs text-neuro-secondary font-medium">Student Support</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-neuro-bg text-neuro-primary font-bold shadow-sm border border-neuro-light' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-neuro-primary'}
                ${item.isAlert ? 'mt-8 text-neuro-danger hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100' : ''}
                ${item.label === 'Feedback' ? 'mt-2' : ''} 
              `}
            >
              <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-50">
        <div className="bg-neuro-bg rounded-xl p-4 text-center">
            <p className="text-xs text-slate-400 font-medium">
                "Here, with you."
            </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;