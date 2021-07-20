<template>
  <div>
    <div id="footerAbout">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <About class="pl-2 pr-2" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="footerFeedback">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <Feedback class="pl-2 pr-2" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-footer color="primary" class="pl-0 pr-0">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row>
          <v-col class="pl-1 pr-2 pt-0 pb-0">
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
import { footerLinks } from "@/data/nav";
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
