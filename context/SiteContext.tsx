
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DEFAULT_SLOTS_90 = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "21:30"];
const DEFAULT_SLOTS_60 = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

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
    }
  ],
  courts: {
    tennis: {
      title: "Synthetico Veloce",
      description: "Superfici hard court di ultima generazione, progettate per offrire un rimbalzo costante.",
      imageUrls: ["https://images.unsplash.com/photo-1595435061147-f272b0572031?auto=format&fit=crop&q=80&w=1200"],
      tags: ["Superficie Pro", "Illuminazione 1000 Lux"],
      individualCourts: [
        { id: "T1", name: "Campo Tennis 1", slots: [...DEFAULT_SLOTS_90] },
        { id: "T2", name: "Campo Tennis 2", slots: ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00"] }
      ]
    },
    padel: {
      title: "Italian Padel Indoor",
      description: "Campi panoramici certificati Italian Padel, situati all'interno di una struttura climatizzata.",
      imageUrls: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200"],
      tags: ["100% Indoor", "Vetrate Panoramiche"],
      individualCourts: [
        { id: "P1", name: "Campo Padel 1", slots: [...DEFAULT_SLOTS_60] },
        { id: "P2", name: "Campo Padel 2", slots: [...DEFAULT_SLOTS_60] },
        { id: "P3", name: "Campo Padel 3", slots: [...DEFAULT_SLOTS_60] }
      ]
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
        setIsLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "config", "site_settings_v2");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig(docSnap.data() as SiteConfig);
        } else {
          await setDoc(docRef, DEFAULT_CONFIG);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const updateConfig = async (newConfig: SiteConfig) => {
    try {
      setConfig(newConfig);
      if (db) {
        const docRef = doc(db, "config", "site_settings_v2");
        await setDoc(docRef, newConfig);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <SiteContext.Provider value={{ config, updateConfig, isAdmin, setAdmin, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
};
