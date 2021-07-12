<template>
  <div>
    <SubHeader v-if="$vuetify.breakpoint.mdAndUp" :links="links" />
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-8">
      <h1>About goes here!</h1>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import { NavLink } from "@/interfaces/nav-link";
import { subHeaderLinks } from "@/config/nav";

interface Data {
  links: NavLink[];
}

@Component({
  components: {
    SubHeader,
  },
})
export default class About extends Vue {
  data(): Data {
    return {
      links: subHeaderLinks || [],
    };
  }
}
</script>
