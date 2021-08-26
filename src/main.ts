import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

import docs from "@/assets/docs.json";
import { defaultDoc, processDocRoute } from "./utils/doc";

import { IAppConfig, getAppConfig } from "./services/config/config.service";

Vue.config.productionTip = false;

const docRoutes = [defaultDoc, ...docs].map(processDocRoute);
docRoutes.forEach((docRoute) => {
  router.addRoute("About", docRoute);
});

async function init() {
  const config: IAppConfig = await getAppConfig();
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    created: () => {
      store.dispatch("setApiUrl", new URL(config.apiUrl));
      store.dispatch("setDocRoutes", docRoutes);
    },
    render: (h) => h(App),
  }).$mount("#app");
}

init();
