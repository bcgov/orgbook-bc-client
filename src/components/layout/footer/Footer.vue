<template>
  <div>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fixed
      bottom
      fab
      tile
      right
      :retain-focus-on-click="true"
      class="accent rounded"
      @click="toTop"
    >
      <v-icon>{{ mdiArrowUp }}</v-icon>
    </v-btn>
    <div class="footer-feedback">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <Feedback class="pl-2 pr-2" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="footer-about">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="ma-0">
          <v-col>
            <About class="pl-2 pr-2" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-footer class="footer pl-0 pr-0">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row>
          <v-col class="pl-1 pr-2 pt-0 pb-0">
            <template v-for="link in links">
              <v-btn
                v-if="!link.external"
                :key="link.path"
                plain
                text
                color="white"
                :to="{ name: link.name }"
                :ripple="false"
                :block="$vuetify.breakpoint.smAndDown"
                class="d-inline-flex justify-start text-capitalize"
                >{{ link.label }}</v-btn
              >
              <v-btn
                v-if="link.external"
                :key="link.path"
                plain
                text
                color="white"
                :href="link.path"
                target="_"
                :ripple="false"
                :block="$vuetify.breakpoint.smAndDown"
                class="d-inline-flex justify-start text-capitalize"
                >{{ link.label }}</v-btn
              >
            </template>
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
import { mapState } from "pinia";
import { useIconState } from "@/stores";

interface Data {
  links: INavLink[];
  fab: boolean;
}

@Component({
  components: {
    About,
    Feedback,
  },
  computed: {
    ...mapState(useIconState, ["mdiArrowUp"]),
  },
})
export default class Footer extends Vue {
  fab!: boolean;

  data(): Data {
    return {
      links: footerLinks || [],
      fab: false,
    };
  }

  get feedbackSubmitted(): boolean {
    return (
      window.sessionStorage.getItem("Feedback") !== null &&
      window.sessionStorage.getItem("Feedback") === "true"
    );
  }

  onScroll(): void {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || 0;
    this.fab = top > 20;
  }

  toTop(): void {
    this.$vuetify.goTo(0);
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: $primary-color !important;
  color: $white;
}
.footer-feedback {
  background: $background-color;
  color: $text-color;
  border-top: 1px solid $border-color;
}
.footer-about {
  background: $secondary-color;
  color: $white;
}
.accent {
  background-color: $accent-color !important;
  color: $black !important;
}
.accent:focus::before {
  opacity: 0;
}
</style>
