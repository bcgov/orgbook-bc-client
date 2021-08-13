<template>
  <v-toolbar color="secondary" flat>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
      <v-row v-if="links.length" class="d-flex align-center">
        <v-col class="pa-4">
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
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import { INavLink } from "@/interfaces/nav-link.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubHeader extends Vue {
  @Prop({ default: () => [] }) links!: INavLink[];
}
</script>
