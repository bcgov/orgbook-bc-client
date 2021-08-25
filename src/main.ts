import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { IAppConfig, getAppConfig } from "./services/config/config.service";
import { IDoc, getDocs } from "./services/doc/doc.service";

Vue.config.productionTip = false;

async function init() {
  const config: IAppConfig = await getAppConfig();
  const docs: IDoc[] = await getDocs();
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    created: () => {
      store.dispatch("setApiUrl", new URL(config.apiUrl));
      store.dispatch("setDocs", docs);
    },
    render: (h) => h(App),
  }).$mount("#app");
}

init();
