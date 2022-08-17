import i18n, { ReactOptions, InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const options: ReactOptions & InitOptions = {
  fallbackLng: "ru",
  supportedLngs: ["ru"],
  detection: {
    order: ["header"],
  },
  load: "languageOnly",
  ns: ["home", "about", "app"],
  saveMissing: true,
  debug: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
    format: (value, format) => {
      if (format === "uppercase") return value.toUpperCase();
      return value;
    },
  },
  useSuspense: process && !process.release,
};

if (process && !process.release) {
  i18n.use(Backend).use(initReactI18next).use(LanguageDetector);
}

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;
