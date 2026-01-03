import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

import {
  ShieldAlert,
  Users,
  Activity,
  ClipboardList,
} from 'lucide-react';

/* 🎨 Emotion → Color Map */
const EMOTION_COLORS = {
  Great: 'bg-green-400',
  Happy: 'bg-emerald-400',
  Calm: 'bg-blue-400',
  Tired: 'bg-yellow-400',
  Distressed: 'bg-red-400',
};

const Home = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [weeklyCounts, setWeeklyCounts] = useState([]);
  const [calendarData, setCalendarData] = useState({});

  /* 🔥 ACTIVE USERS (last 5 minutes) */
  useEffect(() => {
    const fetchActiveUsers = async () => {
      const fiveMinutesAgo = Timestamp.fromDate(
        new Date(Date.now() - 5 * 60 * 1000)
      );

      const q = query(
        collection(db, 'sessions'),
        where('startedAt', '>=', fiveMinutesAgo)
      );

      const snap = await getDocs(q);
      setActiveUsers(snap.size);
    };

    fetchActiveUsers();
  }, []);

  /* 📊 WEEKLY BAR CHART */
  useEffect(() => {
    const fetchWeekly = async () => {
      const snap = await getDocs(collection(db, 'checkins'));
      const counts = [0, 0, 0, 0, 0, 0, 0]; // Sun → Sat

      snap.forEach((doc) => {
        const d = doc.data().createdAt?.toDate();
        if (!d) return;
        counts[d.getDay()] += 1;
      });

      setWeeklyCounts(counts);
    };

    fetchWeekly();
  }, []);

  /* 🗓️ CALENDAR HEATMAP */
  useEffect(() => {
    const fetchCalendar = async () => {
      const snap = await getDocs(collection(db, 'checkins'));
      const map = {};

      snap.forEach((doc) => {
        const { createdAt, emotion } = doc.data();
        if (!createdAt || !emotion) return;

        const key = createdAt.toDate().toISOString().split('T')[0];
        map[key] = emotion;
      });

      setCalendarData(map);
    };

    fetchCalendar();
  }, []);

  /* 📆 LAST 14 DAYS */
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      key: d.toISOString().split('T')[0],
      label: d.getDate(),
    };
  });

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center p-6 pb-24">

      {/* HERO */}
      <div className="text-center space-y-4 max-w-2xl mt-8 mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neuro-primary">
          Welcome to <span className="text-neuro-accent">Neurovia</span>
        </h1>
        <p className="text-xl text-slate-500">
          Your safe, anonymous space on campus.
        </p>
      </div>

      {/* DASHBOARD */}
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6 mb-12">

        {/* ACTIVE USERS */}
        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between items-center">
            <Users className="text-green-500" />
            <span className="text-xs font-bold text-green-600">LIVE</span>
          </div>
          <h3 className="text-4xl font-bold mt-4">{activeUsers}</h3>
          <p className="text-slate-400 text-sm">Students Online Now</p>
        </div>

        {/* WEEKLY BAR CHART */}
        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-purple-500" />
            <p className="font-bold text-slate-600">Weekly Check-ins</p>
          </div>
          <div className="flex items-end gap-2 h-32">
            {weeklyCounts.map((v, i) => (
              <div
                key={i}
                style={{ height: `${v * 10 + 20}px` }}
                className="w-full bg-neuro-accent/30 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="bg-white p-6 rounded-3xl shadow border">
          <p className="font-bold text-slate-600 mb-4">Mood Calendar</p>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => (
              <div
                key={d.key}
                title={calendarData[d.key] || 'No check-in'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white
                  ${EMOTION_COLORS[calendarData[d.key]] || 'bg-slate-200'}
                `}
              >
                {d.label}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="w-full max-w-md space-y-4">
        <Link
          to="/quiz"
          className="flex justify-center gap-3 border-2 border-neuro-primary p-4 rounded-2xl font-bold"
        >
          <ClipboardList />
          Take Wellness Quiz
        </Link>

        <Link
          to="/sos"
          className="flex justify-center gap-3 bg-red-500 text-white p-5 rounded-2xl font-bold"
        >
          <ShieldAlert />
          Get Immediate Help
        </Link>
      </div>

      {/* FLOATING CHAT */}
      <Link to="/chat" className="fixed bottom-8 right-8">
        <img
          src="/images/chat-boy.jpeg"
          alt="Chat"
          className="w-32 h-32 rounded-full shadow-2xl hover:scale-110 transition"
        />
      </Link>
    </div>
  );
};

export default Home;
