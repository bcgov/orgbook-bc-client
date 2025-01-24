import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { dateFilter } from "@/filters/date.filter";
import { claimFormat } from "@/filters/claim.filter";
import docs from "@/assets/docs.json";
import { defaultDoc, processDocRoute } from "./utils/doc";
import { newTracker, trackPageView } from "@snowplow/browser-tracker";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;
Vue.filter("formatDate", dateFilter);
Vue.filter("formatClaim", claimFormat);

const docRoutes = [defaultDoc, ...docs].map(processDocRoute);
docRoutes.forEach((docRoute) => {
  router.addRoute("About", docRoute);
});

async function init() {
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    created: () => {
      store.dispatch("setDocRoutes", docRoutes);
    },
    render: (h) => h(App),
    pinia,
  }).$mount("#app");

  // Snowplow tracking
  newTracker("OrgBookClient", "spt.apps.gov.bc.ca", {
    appId: "#app",
    plugins: [],
  });
  trackPageView();
}

init();
