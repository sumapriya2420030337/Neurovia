import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import CheckIn from './pages/CheckIn';
import SOS from './pages/SOS';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/checkin" element={<Layout><CheckIn /></Layout>} />
        <Route path="/sos" element={<Layout><SOS /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;