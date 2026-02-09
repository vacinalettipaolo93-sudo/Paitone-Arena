
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DEFAULT_CONFIG: SiteConfig = {
  hero: {
    title: "PAITONE",
    highlight: "ARENA",
    subtitle: "L'eccellenza del Tennis e del Padel a Brescia. Strutture all'avanguardia progettate per la tua performance.",
    imageUrl: "https://images.unsplash.com/photo-1595435063511-2092285a73e6?auto=format&fit=crop&q=80&w=2000"
  },
  stats: {
    tennis: "2",
    padel: "3",
    members: "500+",
    coaches: "15"
  },
  events: [
    {
      id: "1",
      title: "Open Padel Trophy",
      date: "24 Giugno 2024",
      description: "Il torneo più atteso dell'estate bresciana. Categorie maschile, femminile e misto.",
      imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800",
      category: "Torneo"
    },
    {
      id: "2",
      title: "Clinic Tennis Pro",
      date: "10 Luglio 2024",
      description: "Migliora il tuo rovescio con i nostri maestri nazionali FITP. Posti limitati.",
      imageUrl: "https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?auto=format&fit=crop&q=80&w=800",
      category: "Clinics"
    }
  ],
  courts: {
    tennis: {
      title: "Synthetico Veloce",
      description: "Superfici hard court di ultima generazione, progettate per offrire un rimbalzo costante e proteggere le articolazioni.",
      imageUrl: "https://images.unsplash.com/photo-1595435061147-f272b0572031?auto=format&fit=crop&q=80&w=1200",
      tags: ["Superficie Pro", "Illuminazione 1000 Lux", "Docce Individuali"]
    },
    padel: {
      title: "Italian Padel Indoor",
      description: "Campi panoramici certificati Italian Padel, situati all'interno di una struttura climatizzata e luminosa.",
      imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200",
      tags: ["100% Indoor", "Erba Testurizzata", "Vetrate Panoramiche"]
    }
  },
  footer: {
    address: "Via dello Sport, 12, 25080 Paitone (BS)",
    phone: "+39 030 123 4567",
    email: "info@paitonearena.it"
  }
};

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => Promise<void>;
  isAdmin: boolean;
  setAdmin: (val: boolean) => void;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isAdmin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      if (!db) {
        console.log("SiteContext: Firebase non configurato, uso i dati predefiniti.");
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "config", "site_settings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as SiteConfig;
          setConfig({
            ...DEFAULT_CONFIG,
            ...data,
            hero: { ...DEFAULT_CONFIG.hero, ...data.hero },
            stats: { ...DEFAULT_CONFIG.stats, ...data.stats },
            courts: { 
              tennis: { ...DEFAULT_CONFIG.courts.tennis, ...data.courts