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

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  de: { translation: de },
  fr: { translation: fr },
};

export const setI18nConfig = async () => {
  // Debug log: confirm available RNLocalize functions
  console.log("RNLocalize keys:", Object.keys(RNLocalize));
  console.log("findBestAvailableLanguage:", RNLocalize.findBestAvailableLanguage);
  console.log("findBestLanguageTag:", RNLocalize.findBestLanguageTag);

  const savedLang = await AsyncStorage.getItem(LANG_KEY);
  const fallback = "en";

  // Use findBestLanguageTag instead of deprecated findBestAvailableLanguage
  const best = RNLocalize.findBestLanguageTag
    ? RNLocalize.findBestLanguageTag(Object.keys(resources))
    : null;

  // Determine language to use
  const defaultLang = savedLang || best || fallback;

  // Handle RTL for Arabic
  const isRTL = defaultLang === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  // Initialize i18next
  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLang,
    fallbackLng: fallback,
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

  console.log("i18n initialized, loaded languages:", Object.keys(i18n.services.resourceStore.data));
};

export const changeLanguage = async (lang) => {
  if (!resources[lang]) {
    console.warn(`changeLanguage: language code "${lang}" not found in resources`);
    return;
  }
  await AsyncStorage.setItem(LANG_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default setI18nConfig;
