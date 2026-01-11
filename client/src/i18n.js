// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enJSON from "./locales/en.json";
import catJSON from "./locales/cat.json";
import esJSON from "./locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      es: { translation: esJSON },
      ca: { translation: catJSON },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es", "ca"],
    defaultNS: "translation",
    debug: import.meta.env.DEV,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
