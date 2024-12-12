import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";

Vue.use(VueI18n);

// Define the shape of your JSON files
interface LocaleData {
  [key: string]: string;
}

async function loadLocaleMessages(): Promise<LocaleMessages> {
  const locales: Record<string, () => Promise<LocaleData>> = import.meta.glob(
    "./[A-Za-z0-9-_,s]+.json"
  );
  const messages: LocaleMessages = {};
  for (const key in locales) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const x = locales[key];
      messages[locale] = await locales[key]();
    }
  }
  console.log("local messages are", messages);
  return messages;
}

export default new VueI18n({
  locale: import.meta.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: await loadLocaleMessages(),
});
