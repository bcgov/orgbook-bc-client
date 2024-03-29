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
            <v-toolbar-title router-link to="/search" class="app-bar-title">
              <router-link to="/search">
                <img
                  class="logo"
                  v-if="$vuetify.breakpoint.smAndDown"
                  src="@/assets/img/logo.svg"
                  alt="British Columbia"
                  width="48px"
                  height="42px"
                />
                <img
                  class="logo"
                  v-if="$vuetify.breakpoint.mdAndUp"
                  src="@/assets/img/logo-banner.svg"
                  alt="British Columbia"
                  width="172px"
                  height="48px"
                />
              </router-link>
              <span
                :class="{
                  'font-weight-black d-inline-flex align-middle': true,
                  'pl-4': $vuetify.breakpoint.smAndDown,
                  'pl-8': $vuetify.breakpoint.mdAndUp,
                }"
              >
                <span>OrgBook BC</span>
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
              color="white"
              aria-label="nav-menu-button"
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
  .logo {
    vertical-align: middle;
  }
}
</style>
