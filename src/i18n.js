import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

console.log('🌐 i18n.js: Starting i18n initialization...');

try {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr }
      },
      lng: localStorage.getItem("lang") || "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });

  console.log('✅ i18n.js: i18n initialized successfully');
} catch (error) {
  console.error('❌ i18n.js: Error initializing i18n:', error);
}

export default i18n;
