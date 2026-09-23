import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "sl";

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    planner: "Travel Planner",
    gallery: "Gallery",
    contact: "Contact",
    startPlanning: "Start Planning",

    // Common UI & Actions
    back: "Back",
    next: "Next",
    submitPlan: "Submit plan",
    requiredNotice: "Red asterisks (*) indicate required fields.",

    // Footer
    tagline: "Personal travel planning designed around you. Less planning, more exploring.",
    explore: "Explore",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    chatWithUs: "Chat with us",
    allRightsReserved: "All rights reserved.",
  },
  sl: {
    // Navigation
    home: "Domov",
    about: "O nas",
    planner: "Načrtovalec potovanja",
    gallery: "Galerija",
    contact: "Kontakt",
    startPlanning: "Začni z načrtovanjem",

    // Common UI & Actions
    back: "Nazaj",
    next: "Naprej",
    submitPlan: "Oddaj načrt",
    requiredNotice: "Rdeča zvezdica (*) označuje obvezna polja.",

    // Footer
    tagline: "Osebno načrtovanje potovanj po vaši meri. Manj načrtovanja, več raziskovanja.",
    explore: "Razišči",
    legal: "Pravno",
    privacyPolicy: "Pravilnik o zasebnosti",
    termsOfService: "Pogoji poslovanja",
    chatWithUs: "Pišite nam",
    allRightsReserved: "Vse pravice pridržane.",
  },
} as const;

type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("viarra_lang") as Language | null;
    if (saved === "en" || saved === "sl") {
      setLangState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem("viarra_lang", lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "sl" : "en";
    setLanguage(nextLang);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}