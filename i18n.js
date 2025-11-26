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

// Define the order explicitly here:
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
  console.log("RNLocalize keys:", Object.keys(RNLocalize));
  console.log("findBestAvailableLanguage:", RNLocalize.findBestAvailableLanguage);
  console.log("findBestLanguageTag:", RNLocalize.findBestLanguageTag);

  const savedLang = await AsyncStorage.getItem(LANG_KEY);

  const fallback = "en";

  // findBestAvailableLanguage is deprecated / removed in your version,
  // use findBestLanguageTag instead:
  const best = RNLocalize.findBestLanguageTag(Object.keys(resources)) || null;

  // best will be string or null
  const defaultLang = savedLang || best || fallback;

  const isRTL = defaultLang === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLang,
    fallbackLng: fallback,
    interpolation: {
      escapeValue: false,
    },
  });

  console.log("i18n initialized, loaded languages:", Object.keys(resources));
};

export const changeLanguage = async (lang) => {
  await AsyncStorage.setItem(LANG_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default setI18nConfig;
