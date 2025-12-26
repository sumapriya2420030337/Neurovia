import React from 'react';
import { Phone, MapPin, ShieldAlert } from 'lucide-react';

const SOS = () => {
  const helplines = [
    { name: "National Suicide Prevention", number: "98204 66726", tag: "24/7 Support" },
    { name: "Vandrevala Foundation", number: "1860 266 2345", tag: "Mental Health" },
    { name: "Emergency Services", number: "112", tag: "Police/Fire/Ambulance" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-red-50 border-l-4 border-neuro-danger p-6 rounded-r-xl">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <ShieldAlert className="text-neuro-danger" size={32} />
          Immediate Support
        </h1>
        <p className="text-slate-600 mt-2">
          You are not alone. If you are in distress, please reach out to these resources immediately.
        </p>
      </div>

      {/* Helplines Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {helplines.map((line, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition">
            <div>
              <h3 className="font-bold text-neuro-primary">{line.name}</h3>
              <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{line.tag}</span>
            </div>
            <a href={`tel:${line.number.replace(/\s/g, '')}`} className="bg-neuro-accent text-white p-3 rounded-full hover:bg-sky-500 transition">
              <Phone size={20} />
            </a>
          </div>
        ))}
      </div>

      {/* Campus Resource */}
      <div className="bg-neuro-primary text-white p-6 rounded-2xl shadow-lg mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin size={24} className="text-neuro-accent" /> Campus Support
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span>Student Counselor (Dr. Priya)</span>
            <span className="text-neuro-accent">Block C, Room 104</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOS;
