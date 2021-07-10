<template>
  <div>
    <v-app-bar app absolute color="primary" dark>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          v-for="link in links"
          :key="link.path"
          plain
          text
          color="white"
          :to="link.path"
          :ripple="false"
          class="text-capitalize"
          >{{ link.label }}</v-btn
        >
      </div>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
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
import { headerLinks } from "@/config/nav";
import { NavLink } from "@/interfaces/nav-link";

interface Data {
  drawer: boolean;
  links: NavLink[];
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
