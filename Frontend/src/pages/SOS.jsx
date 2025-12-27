import React, { useState } from 'react';
import { Phone, MapPin, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

// 🌟 IMPORT IMAGE FROM ASSETS
import sosImg from '../assets/sos-character.jpeg';

const SOS = () => {
  // State to handle the toggle (Expand/Collapse)
  const [isCampusOpen, setIsCampusOpen] = useState(false);

  const facultyContacts = [
    { name: "Dr. Priya Sharma", role: "Student Counselor", phone: "+91 98765 43210", loc: "Block C, Room 104" },
    { name: "Dr. Arjun Verma", role: "Campus Psychologist", phone: "+91 99887 76655", loc: "Health Center" },
    { name: "Prof. Anjali Desai", role: "Chief Warden", phone: "+91 11223 34455", loc: "Admin Block" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-neuro-danger font-display flex items-center justify-center gap-3">
          <ShieldAlert size={32} />
          Emergency Support
        </h1>
        <p className="text-slate-500">You are not alone. Help is available 24/7.</p>
      </div>

      {/* 1. NATIONAL HOTLINES (Static) - Now 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* National Helpline */}
        <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group h-full">
          <div className="mb-2">
            <h3 className="font-bold text-red-700 text-lg">National Helpline</h3>
            <p className="text-red-500 text-xs">Suicide Prevention</p>
          </div>
          <a href="tel:14416" className="text-2xl font-bold text-red-600 group-hover:scale-105 transition-transform text-right block">
            14416
          </a>
        </div>

        {/* Roshni Helpline (New) */}
        <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group h-full">
          <div className="mb-2">
            <h3 className="font-bold text-purple-700 text-lg">Roshni Helpline</h3>
            <p className="text-purple-500 text-xs">Emotional Support</p>
          </div>
          <a href="tel:04066202000" className="text-xl font-bold text-purple-600 group-hover:scale-105 transition-transform text-right block">
            040-66202000
          </a>
        </div>

        {/* Medical Emergency */}
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group h-full">
          <div className="mb-2">
            <h3 className="font-bold text-orange-700 text-lg">Medical</h3>
            <p className="text-orange-500 text-xs">Ambulance</p>
          </div>
          <a href="tel:108" className="text-2xl font-bold text-orange-600 group-hover:scale-105 transition-transform text-right block">
            108
          </a>
        </div>

      </div>

      {/* 🌟 2. CAMPUS SUPPORT (Interactive Dropdown) */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-neuro-primary pl-1">On Campus Help</h2>
        
        <div 
          onClick={() => setIsCampusOpen(!isCampusOpen)}
          className="bg-neuro-primary rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-neuro-accent/20 border border-neuro-primary"
        >
          {/* Main Card Header */}
          <div className="p-6 flex items-center justify-between relative">
            <div className="flex items-center gap-4 z-10">
              <div className="bg-white/10 p-3 rounded-full text-white">
                 <MapPin size={24} />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-xl">Campus Support Team</h3>
                <p className="text-neuro-light text-sm opacity-90">
                  {isCampusOpen ? "Click to close list" : "Click to view faculty contacts"}
                </p>
              </div>
            </div>

            {/* 🌟 THE CIRCULAR SOS CHARACTER (Imported) */}
            <div className="flex items-center gap-4 z-10">
               <img 
                 src={sosImg} 
                 alt="SOS Help" 
                 className="w-16 h-16 rounded-full border-4 border-white/20 shadow-md object-cover bg-white"
               />
               {isCampusOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
            </div>

            {/* Decorative BG glow */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-neuro-accent/20 blur-3xl rounded-full"></div>
          </div>

          {/* 🌟 EXPANDABLE LIST */}
          {isCampusOpen && (
            <div className="bg-white p-4 space-y-3 animate-slideUp">
              {facultyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neuro-bg rounded-xl border border-slate-100 hover:border-neuro-accent/30 transition-colors">
                  <div>
                    <h4 className="font-bold text-neuro-primary">{contact.name}</h4>
                    <p className="text-xs text-neuro-secondary font-medium">{contact.role}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                       <MapPin size={10} /> {contact.loc}
                    </div>
                  </div>
                  
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-green-100 transition-colors">
                    <Phone size={14} />
                    Call
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOS;