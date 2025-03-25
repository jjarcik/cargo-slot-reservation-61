
import { i18n } from "@lingui/core";
import { en, cs } from "make-plural/plurals";
import { messages as enMessages } from "./locales/en/messages";
import { messages as csMessages } from "./locales/cs/messages";

// Set up the plurals for each language
i18n.loadLocaleData({
  en: { plurals: en },
  cs: { plurals: cs },
});

// Load the translations
i18n.load({
  en: enMessages,
  cs: csMessages,
});

// Detect browser language or use stored preference
export function initI18n() {
  const storedLocale = localStorage.getItem("locale") || navigator.language.split("-")[0];
  const locale = ["en", "cs"].includes(storedLocale) ? storedLocale : "en";
  activateLocale(locale);
  return locale;
}

export function activateLocale(locale: string) {
  localStorage.setItem("locale", locale);
  i18n.activate(locale);
  document.documentElement.lang = locale;
  return locale;
}

export { i18n };
