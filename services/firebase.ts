
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Funzione di utilità per verificare se la config è valida
const isConfigValid = !!firebaseConfig.projectId && firebaseConfig.projectId !== "undefined";

let db: any = null;

try {
  if (isConfigValid) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("Firebase: Project ID mancante. L'app funzionerà in modalità locale (fallback).");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { db };
