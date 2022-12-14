import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const options: InitOptions = {
  fallbackLng: "ru",
  supportedLngs: ["ru"],
  detection: {
    order: ["header"],
  },
  defaultNS: "app",
  fallbackNS: "app",
  load: "languageOnly",
  saveMissing: false,
  debug: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
    format: (value, format) => {
      if (format === "uppercase") return value.toUpperCase();
      return value;
    },
  },
  react: {
    useSuspense: process && !process.release,
  },
};

if (process && !process.release) {
  i18n.use(Backend).use(initReactI18next).use(LanguageDetector);
}

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
