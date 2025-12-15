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

/* ---------------- RESOURCES ---------------- */

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
  de: { translation: de },
};

/* ---------------- INIT ---------------- */

export const setI18nConfig = async () => {
  try {
    const savedLang = await AsyncStorage.getItem(LANG_KEY);
    const fallbackLang = "en";

    // Detect device language safely
    const bestMatch = RNLocalize.findBestLanguageTag(
      Object.keys(resources)
    );

    // Extract string ONLY (very important)
    const detectedLang = bestMatch?.languageTag?.split("-")[0];

    // Final language MUST be STRING
    const finalLang =
      savedLang ||
      detectedLang ||
      fallbackLang;

    console.log("i18n language:", finalLang);

    // Disable RTL globally (even for Arabic)
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    await i18n
      .use(initReactI18next)
      .init({
        resources,

        lng: finalLang,              // ✅ STRING ONLY
        fallbackLng: [fallbackLang], // ✅ ARRAY ONLY

        compatibilityJSON: "v3",
        interpolation: {
          escapeValue: false,
        },
      });

    console.log("i18n initialized successfully");
  } catch (error) {
    console.error("Error initializing i18n:", error);
  }
};

/* ---------------- CHANGE LANGUAGE ---------------- */

export const changeLanguage = async (lang) => {
  if (!lang || typeof lang !== "string") {
    console.warn("Invalid language code:", lang);
    return;
  }

  try {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    await AsyncStorage.setItem(LANG_KEY, lang);
    await i18n.changeLanguage(lang);

    console.log("Language changed to:", lang);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export default i18n;
