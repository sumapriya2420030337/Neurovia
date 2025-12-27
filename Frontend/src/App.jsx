import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Chat from './pages/Chat';
import CheckIn from './pages/CheckIn';
import SOS from './pages/SOS';
import Feedback from './pages/Feedback';
import Quiz from './pages/quiz'; // ✅ capital Q

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
        <Sidebar />

        <main className="flex-1 ml-64 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
