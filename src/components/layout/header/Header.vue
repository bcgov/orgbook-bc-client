<template>
  <div>
    <v-app-bar app flat class="app-bar">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="d-flex align-center">
          <v-col
            :class="{
              'pl-1': $vuetify.breakpoint.smAndDown,
              'pl-5': $vuetify.breakpoint.mdAndUp,
              'd-flex align-center': true,
            }"
          >
            <v-toolbar-title class="app-bar-title">
              <img
                class="small-logo"
                v-if="$vuetify.breakpoint.smAndDown"
                src="logo.svg"
                alt="British Columbia"
              />
              <img
                class="large-logo"
                v-if="$vuetify.breakpoint.mdAndUp"
                src="logo-banner.svg"
                alt="British Columbia"
              />
              <span
                :class="{
                  'font-weight-black d-inline-flex align-middle': true,
                  'pl-4': $vuetify.breakpoint.smAndDown,
                  'pl-8': $vuetify.breakpoint.mdAndUp,
                }"
              >
                <span>OrgBook BC</span>
                <span class="beta-tag text-uppercase">&nbsp;Beta</span>
              </span>
            </v-toolbar-title>
          </v-col>
          <v-col class="pa-0 d-flex justify-end align-center">
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <v-btn
                v-for="link in links"
                :key="link.path"
                plain
                text
                color="white"
                :to="{ name: link.name }"
                :ripple="false"
                class="text-capitalize"
                >{{ link.label }}</v-btn
              >
            </div>
            <v-app-bar-nav-icon
              v-if="$vuetify.breakpoint.smAndDown"
              class="mr-n2 app-bar-nav-icon"
              @click="drawer = true"
            ></v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav>
        <v-list-item v-for="link in links" :key="link.path" :to="link.path">{{
          link.label
        }}</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { INavLink } from "@/interfaces/nav-link.interface";
import { headerLinks } from "@/data/nav";

interface Data {
  drawer: boolean;
  links: INavLink[];
}

@Component
export default class Header extends Vue {
  data(): Data {
    return {
      drawer: false,
      links: headerLinks || [],
    };
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  background: $primary-color !important;
  color: $white !important;
  border-bottom: 2px solid $accent-color !important;
}
.app-bar-title {
  color: $white !important;
  .small-logo {
    vertical-align: middle;
    width: 48px;
  }
  .large-logo {
    vertical-align: middle;
    height: 48px;
  }
}
.app-bar-nav-icon {
  color: $white !important;
}
.beta-tag {
  color: $accent-color;
  vertical-align: super;
  font-size: small;
}
</style>
