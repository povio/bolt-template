import { resources as uiResources } from "@povio/ui";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "@/assets/locales/en/translation.json";

export const defaultLanguage = "en";
export const defaultNS = "main";
export const resources = {
  en: {
    ...uiResources.en,
    [defaultNS]: translationEN,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  fallbackLng: defaultLanguage,
  resources,
  ns: Object.keys(resources.en),
  defaultNS,
  lng: defaultLanguage,
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
