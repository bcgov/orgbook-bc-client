<template>
  <div>
    <v-row>
      <v-col>
        <About class="pa-4 pl-8 pr-8" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Feedback class="pa-4 pl-8 pr-8" />
      </v-col>
    </v-row>
    <v-footer color="primary">
      <v-btn
        v-for="link in links"
        :key="link.path"
        plain
        text
        color="white"
        :to="link.path"
        :ripple="false"
        :block="$vuetify.breakpoint.smAndDown"
        class="text-capitalize flex-text-left"
        >{{ link.label }}</v-btn
      >
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { footerLinks } from "@/config/nav";
import { NavLink } from "@/interfaces/nav-link";
import About from "@/components/layout/footer/About.vue";
import Feedback from "@/components/layout/footer/Feedback.vue";

interface Data {
  links: NavLink[];
}

@Component({
  components: {
    About,
    Feedback,
  },
})
export default class Footer extends Vue {
  data(): Data {
    return {
      links: footerLinks || [],
    };
  }
}
</script>
