
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Helper per gestire l'accesso alle variabili d'ambiente in modo sicuro nel browser
const getSafeEnv = (key: string): string => {
  try {
    // Prova ad accedere a process.env (iniettato da molti ambienti build)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Fallback per variabili globali se configurate diversamente
    if ((window as any)._env_ && (window as any)._env_[key]) {
      return (window as any)._env_[key];
    }
  } catch (e) {
    console.error(`Error accessing env key ${key}:`, e);
  }
  return "";
};

const firebaseConfig = {
  apiKey: getSafeEnv('FIREBASE_API_KEY'),
  authDomain: getSafeEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getSafeEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getSafeEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getSafeEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getSafeEnv('FIREBASE_APP_ID')
};

let db: any = null;
let storage: any = null;

// Verifica se la configurazione è valida (almeno il Project ID deve esserci)
const isConfigValid = !!firebaseConfig.projectId && firebaseConfig.projectId !== "undefined" && firebaseConfig.projectId !== "";

try {
  if (isConfigValid) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("Firebase Arena initialized with Firestore and Storage.");
  } else {
    console.warn("Firebase: Configurazione mancante. L'app userà i dati locali (DEFAULT_CONFIG). Assicurati di aver impostato le Environment Variables su Vercel.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { db, storage };