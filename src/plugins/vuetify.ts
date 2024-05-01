import { createVuetify } from "vuetify/lib/framework.mjs";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi, aliases } from "vuetify/iconsets/mdi-svg";

export default createVuetify({
  components,
  directives,
  // theme: {
  //   disable: true,
  // },
  icons: {
    defaultSet: "mdiSvg",
    aliases,
    sets: {
      mdiSvg: mdi,
    },
  },
});
