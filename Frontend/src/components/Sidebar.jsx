import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Heart, Phone } from 'lucide-react'; // <--- Changed icons to safe ones

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/checkin', icon: Heart, label: 'Check-In' },
    { path: '/sos', icon: Phone, label: 'Support & SOS', isAlert: true }, // <--- Using standard Phone icon
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-neuro-primary">Neurovia</h1>
        <p className="text-xs text-slate-400">Student Support</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
                ${isActive 
                  ? 'bg-neuro-bg text-neuro-accent font-semibold shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-neuro-primary'}
                ${item.isAlert ? 'mt-8 text-neuro-danger hover:bg-red-50 hover:text-red-600' : ''}
              `}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;