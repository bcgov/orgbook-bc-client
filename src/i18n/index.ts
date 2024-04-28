/// <reference types="vite/client" />

import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = import.meta.glob("./*.json", { eager: true });
  const messages: LocaleMessages = {};
  Object.keys(locales).forEach((key: string) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales[key] as LocaleMessages;
    }
  });
  return messages;
}

export default new VueI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
});
