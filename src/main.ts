import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { dateFilter } from "@/filters/date.filter";
import docs from "@/assets/docs.json";
import { defaultDoc, processDocRoute } from "./utils/doc";

Vue.config.productionTip = false;
Vue.filter("formatDate", dateFilter);

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
  }).$mount("#app");
}

init();
