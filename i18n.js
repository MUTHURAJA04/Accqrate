import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

const LANG_KEY = "appLanguage";

const resourcesArray = [
  { code: "en", resource: en },
  { code: "ar", resource: ar },
  { code: "fr", resource: fr },
  { code: "de", resource: de },
];

// Build resources object in correct order
const resources = {};
resourcesArray.forEach(({ code, resource }) => {
  resources[code] = { translation: resource };
});

export const setI18nConfig = async () => {
  try {
    const savedLang = await AsyncStorage.getItem(LANG_KEY);
    const fallback = "en";

    // Use findBestLanguageTag (string) - returns best matching tag or null
    const bestLanguageTag = RNLocalize.findBestLanguageTag(Object.keys(resources)) || null;

    // Determine language: savedLang > best detected > fallback
    const defaultLang = savedLang || bestLanguageTag || fallback;

    console.log("Detected language:", defaultLang);

    // Disable RTL completely for all languages including Arabic
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    await i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: defaultLang,
        fallbackLng: fallback,
        interpolation: {
          escapeValue: false,
        },
        compatibilityJSON: 'v3', // Add this for better React Native support
      });

    console.log("i18n initialized with languages:", Object.keys(resources));
    console.log("RTL disabled for all languages");
  } catch (error) {
    console.error("Error initializing i18n:", error);
  }
};

export const changeLanguage = async (lang) => {
  if (!lang || typeof lang !== "string") {
    console.warn("changeLanguage: invalid language code", lang);
    return;
  }
  
  try {
    // Disable RTL when changing language as well
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    
    await AsyncStorage.setItem(LANG_KEY, lang);
    await i18n.changeLanguage(lang);
    
    console.log(`Language changed to: ${lang}, RTL disabled`);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export default setI18nConfig;