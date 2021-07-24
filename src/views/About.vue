<template>
  <div>
    <SubHeader v-if="$vuetify.breakpoint.mdAndUp" :links="links" />
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <h1>About goes here!</h1>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import { INavLink } from "@/interfaces/nav-link.interface";
import { subHeaderLinks } from "@/data/nav";

interface Data {
  links: INavLink[];
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
