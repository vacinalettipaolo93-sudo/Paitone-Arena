
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Helper per accedere in modo sicuro alle variabili d'ambiente
const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID')
};

const isConfigValid = !!firebaseConfig.projectId && firebaseConfig.projectId !== "undefined";

let db: any = null;

try {
  if (isConfigValid) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
  } else {
    console.warn("Firebase: Configurazione incompleta. L'app funzionerà in modalità locale (fallback).");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { db };
