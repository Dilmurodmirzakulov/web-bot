// src/LanguageContext.js
import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default language: Russian ("ru")
  const [language, setLanguage] = useState("ru");

  // Toggle between Russian and Uzbek
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ru" ? "uz" : "ru"));
  };

  // Optionally, load/save language to localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
