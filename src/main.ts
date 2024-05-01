import { createApp } from "vue";

import App from "./App.vue";

import i18n from "./i18n";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// import { dateFilter } from "@/filters/date.filter";
// import { claimFormat } from "@/filters/claim.filter";

// import docs from "@/assets/docs.json";

// import { defaultDoc, processDocRoute } from "./utils/doc";

import { newTracker, trackPageView } from "@snowplow/browser-tracker";

import "./registerServiceWorker";

// Vue.config.productionTip = false;
// Vue.filter("formatDate", dateFilter);
// Vue.filter("formatClaim", claimFormat);

// const docRoutes = [defaultDoc, ...docs].map(processDocRoute);
// docRoutes.forEach((docRoute) => {
//   router.addRoute("About", docRoute);
// });

async function init() {
  const app = createApp(App, {
    // created: () => {
    //   store.dispatch("setDocRoutes", docRoutes);
    // },
  });
  app.use(i18n);
  app.use(router);
  app.use(store);
  app.use(vuetify);

  app.mount("#app");

  // Snowplow tracking
  newTracker("OrgBookClient", "spt.apps.gov.bc.ca", {
    appId: "#app",
    plugins: [],
  });
  trackPageView();
}

init();
