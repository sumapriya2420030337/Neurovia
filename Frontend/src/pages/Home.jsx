import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neuro-primary">Welcome to Neurovia</h1>
      <p className="text-slate-500">Your safe space on campus.</p>

      <div className="grid grid-cols-2 gap-4">
         <Link to="/chat" className="bg-neuro-accent text-white p-6 rounded-xl hover:bg-sky-500 transition text-center font-bold text-xl">
            💬 Start Chat
         </Link>
         <Link to="/sos" className="bg-neuro-danger text-white p-6 rounded-xl hover:bg-red-600 transition text-center font-bold text-xl">
            📞 Get Help
         </Link>
      </div>
    </div>
  );
};

export default Home;