<template>
  <div>
    <v-app-bar app color="primary" dark flat>
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <v-row class="flex-col-align-center">
          <v-col
            :class="{
              'pl-1': $vuetify.breakpoint.smAndDown,
              'pl-5': $vuetify.breakpoint.mdAndUp,
              'flex-row flex-align-items-center': true,
            }"
          >
            <v-app-bar-title>Logo here!</v-app-bar-title>
          </v-col>
          <v-col
            class="
              pa-0
              flex-row flex-justify-content-flex-end flex-align-items-center
            "
          >
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
              class="mr-n2"
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
