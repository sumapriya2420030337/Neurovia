import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Users, Activity, Heart } from 'lucide-react';

const Home = () => {
  // Mock Data for the Dashboard
  const weeklyStats = [
    { day: 'M', h: 'h-16' },
    { day: 'T', h: 'h-24' },
    { day: 'W', h: 'h-20' },
    { day: 'T', h: 'h-32' },
    { day: 'F', h: 'h-28' },
    { day: 'S', h: 'h-12' },
    { day: 'S', h: 'h-10' },
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center animate-fadeIn p-6 pb-24">
      
      {/* 1. Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mt-8 mb-12">
        <h1 className="text-5xl font-bold text-neuro-primary font-display tracking-tight">
          Welcome to <span className="text-neuro-accent">Neurovia</span>
        </h1>
        <p className="text-xl text-slate-500 font-light leading-relaxed">
          Your safe, anonymous space on campus. <br/>
          We are here to listen, not to judge.
        </p>
      </div>

      {/* 2. 📊 DASHBOARD SECTION */}
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6 mb-12">
        
        {/* Card 1: Active Users */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
               <Users size={24} />
             </div>
             <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full animate-pulse">
               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
               LIVE
             </span>
           </div>
           <div className="mt-4">
             <h3 className="text-4xl font-bold text-slate-800">142</h3>
             <p className="text-slate-400 text-sm font-medium">Students Online Now</p>
           </div>
        </div>

        {/* Card 2: Total Impact */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
               <Heart size={24} />
             </div>
             <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
               Total
             </span>
           </div>
           <div className="mt-4">
             <h3 className="text-4xl font-bold text-slate-800">1,284</h3>
             <p className="text-slate-400 text-sm font-medium">Students Supported</p>
           </div>
        </div>

        {/* Card 3: Weekly Activity */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
           <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
               <Activity size={20} />
             </div>
             <p className="text-sm font-bold text-slate-600">Weekly Check-ins</p>
           </div>
           
           <div className="flex items-end justify-between gap-2 h-32">
             {weeklyStats.map((stat, i) => (
               <div key={i} className="flex flex-col items-center gap-2 w-full">
                 <div className={`w-full ${stat.h} bg-neuro-accent/20 rounded-t-lg hover:bg-neuro-accent transition-colors duration-300 relative group`}>
                   {/* Tooltip */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     Stats
                   </div>
                 </div>
                 <span className="text-[10px] text-slate-400 font-bold">{stat.day}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* 3. Main Action Area */}
      <div className="w-full max-w-md space-y-6">
        <Link to="/sos" className="flex items-center justify-center gap-3 w-full bg-neuro-danger text-white p-5 rounded-2xl hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200 hover:-translate-y-1 group">
           <ShieldAlert size={28} className="group-hover:animate-pulse" />
           <span className="font-bold text-xl">Get Immediate Help</span>
        </Link>
        
        <div className="text-center">
            {/* 🌟 UPDATED TEXT: Chat with NIA */}
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Or Chat with NIA below ↘
            </p>
        </div>
      </div>

      {/* 4. Floating Character Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end animate-slideUp">
        {/* 🌟 UPDATED TOOLTIP: Chat with NIA */}
        <div className="bg-white px-4 py-2 rounded-2xl rounded-tr-none shadow-md border border-neuro-light mb-2 mr-4 animate-bounce">
          <p className="text-neuro-primary text-sm font-bold">Chat with NIA 👋</p>
        </div>

        <Link to="/chat" className="group relative">
           <div className="absolute inset-0 bg-neuro-accent/30 rounded-full blur-2xl group-hover:bg-neuro-accent/50 transition-all duration-500"></div>
           <img 
             src="/images/chat-boy.jpeg" 
             alt="Chat with NIA" 
             className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-2xl hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-pointer"
           />
        </Link>
      </div>

    </div>
  );
};

export default Home;