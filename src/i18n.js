import { createI18n } from "vue-i18n";

import enMessages from "./locales/en.json";
const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: enMessages,
  },
  globalInjection: true,
});

export default i18n;
