import React from 'react';
import { ShieldAlert, Phone } from 'lucide-react';

const SOSPanel = () => {
  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <ShieldAlert size={64} className="text-neuro-danger" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Support Paused</h2>
      <p className="text-center text-slate-600 max-w-md mb-8">
        We noticed you might be going through a difficult crisis. 
        The AI has stopped to prioritize your safety.
      </p>

      <div className="w-full max-w-sm space-y-3">
        <a href="tel:9820466726" className="flex items-center justify-between w-full bg-neuro-danger text-white p-4 rounded-xl font-bold hover:bg-red-600 transition">
          <span>Suicide Prevention</span>
          <Phone size={20} />
        </a>
        <a href="tel:112" className="flex items-center justify-between w-full bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-black transition">
          <span>Emergency (112)</span>
          <Phone size={20} />
        </a>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Strict Privacy: This interaction was NOT saved.
      </p>
    </div>
  );
};

export default SOSPanel;