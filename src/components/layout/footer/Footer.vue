<template>
  <div>
    <div id="footerAbout">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <About class="pl-4 pr-4" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="footerFeedback">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <Feedback class="pl-4 pr-4" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-footer color="primary" class="pl-0 pr-0">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row>
          <v-col class="pt-0 pb-0">
            <v-btn
              v-for="link in links"
              :key="link.path"
              plain
              text
              color="white"
              :to="link.path"
              :ripple="false"
              :block="$vuetify.breakpoint.smAndDown"
              class="text-capitalize flex-justify-content-start"
              >{{ link.label }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { footerLinks } from "@/config/nav";
import { INavLink } from "@/interfaces/nav-link.interface";
import About from "@/components/layout/footer/About.vue";
import Feedback from "@/components/layout/footer/Feedback.vue";

interface Data {
  links: INavLink[];
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

<style scoped>
#footerAbout {
  background: #e3e3e3;
}
</style>
