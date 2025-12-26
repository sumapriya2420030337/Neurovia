import { db } from './init';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logSupportLabel = async (supportLevel, stressCategory) => {
  // 🛡️ SECURITY GUARD: Frontend Double-Check
  if (supportLevel === 'crisis') {
    console.warn("🚫 SECURITY: Crisis event detected. No data stored.");
    return; // STOP. Do not write anything to database.
  }

  try {
    // We only store the label, never the user's text.
    await addDoc(collection(db, "interactions"), {
      supportLevel: supportLevel,     // "low" | "moderate"
      stressCategory: stressCategory, // "exams" | "family" | "loneliness" | "other"
      createdAt: serverTimestamp()
    });
    console.log(`✅ Logged: ${supportLevel} | ${stressCategory}`);
  } catch (e) {
    console.error("Write Error (This is expected if rules block you):", e);
  }
};