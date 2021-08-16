import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { AppConfig, getAppConfig } from "./services/config/config.service";

Vue.config.productionTip = false;

async function init() {
  const config: AppConfig = await getAppConfig();
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    created: () => store.dispatch("setApiUrl", new URL(config.apiUrl)),
    render: (h) => h(App),
  }).$mount("#app");
}

init();
