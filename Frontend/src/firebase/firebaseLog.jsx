import { db } from './firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

/* 🔥 LOG CHECK-IN */
export const logCheckIn = async ({ emotion, category }) => {
  try {
    const docRef = await addDoc(collection(db, 'checkins'), {
      emotion,
      category,
      severity:
        emotion === 'Distressed'
          ? 'high'
          : emotion === 'Tired' || emotion === 'Calm'
          ? 'moderate'
          : 'low',
      source: 'checkin',
      createdAt: serverTimestamp(),
    });

    // ✅ STEP 5 — CONSOLE CONFIRMATION
    console.log('✅ Check-in logged:', docRef.id, emotion, category);
  } catch (err) {
    console.error('❌ Error logging check-in:', err);
  }
};

/* 🔥 START ACTIVE SESSION */
export const startSession = async () => {
  try {
    const docRef = await addDoc(collection(db, 'sessions'), {
      startedAt: serverTimestamp(),
    });

    console.log('🟢 Session started:', docRef.id);
  } catch (err) {
    console.error('❌ Error starting session:', err);
  }
};
