/**
 * Internationalization (i18n) configuration.
 * Uses react-i18next with a single file per language.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';
import { STORAGE_KEYS } from '@/config/constants';
import en from './locales/en.json';
import es from './locales/es.json';

/** Available translation resources */
const resources = {
  en: { translation: en },
  es: { translation: es },
};

/**
 * Get the initial language from localStorage or environment.
 */
function getInitialLanguage(): string {
  const storedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (storedLanguage && env.supportedLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }
  return env.defaultLanguage;
}

/**
 * Initialize i18next with React integration.
 */
void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: env.defaultLanguage,
  supportedLngs: env.supportedLanguages,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: true,
  },
});

/**
 * Change the current language and persist to localStorage.
 * @param language - The language code to switch to
 */
export async function changeLanguage(language: string): Promise<void> {
  if (env.supportedLanguages.includes(language)) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    await i18n.changeLanguage(language);
  }
}

/**
 * Get the current language.
 * @returns Current language code
 */
export function getCurrentLanguage(): string {
  return i18n.language;
}

export default i18n;
