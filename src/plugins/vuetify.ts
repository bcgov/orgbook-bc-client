import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    disable: true,
  },
  icons: {
    iconfont: "mdiSvg",
  },
});
