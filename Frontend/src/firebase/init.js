import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 1. PLACEHOLDER CONFIG (Ask Member 3 for the real keys later)
const firebaseConfig = {
  apiKey: "AIzaSy_PLACEHOLDER",
  authDomain: "neurovia-project.firebaseapp.com",
  projectId: "neurovia-project",
  storageBucket: "neurovia-project.appspot.com",
  messagingSenderId: "00000000000",
  appId: "1:00000000000:web:000000000000"
};

// 2. INITIALIZE APP
const app = initializeApp(firebaseConfig);

// 3. EXPORT TOOLS
export const auth = getAuth(app);
export const db = getFirestore(app);

// 4. HELPER: Silent Anonymous Login
export const initAuth = () => {
  signInAnonymously(auth)
    .then(() => console.log("🔒 Anon Auth: Active"))
    .catch((error) => console.error("Auth Failed (Check Config)", error));
};