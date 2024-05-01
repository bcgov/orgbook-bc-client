/// <reference types="vite/client" />

import { createI18n } from "vue-i18n";

function loadLocaleMessages(): any {
  const locales = import.meta.glob("./*.json", { eager: true });
  const messages: any = {};
  Object.keys(locales).forEach((key: string) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales[key] as any;
    }
  });
  return messages;
}

export default createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
});
