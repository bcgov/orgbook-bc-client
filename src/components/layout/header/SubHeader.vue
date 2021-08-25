<template>
  <v-toolbar class="sub-header" flat dense>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
      <v-row v-if="links.length" class="d-flex align-center">
        <v-col class="pa-1">
          <v-btn
            v-for="link in links"
            :key="link.path"
            plain
            text
            color="white"
            :to="link.path"
            :ripple="false"
            class="text-capitalize sub-header-link"
            active-class="active"
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

<style lang="scss" scoped>
.sub-header {
  background: $secondary-color !important;
  color: $white;
}

.sub-header-link {
  height: 48px !important;
  border-radius: 0px;

  &.active {
    background: lighten($color: $secondary-color, $amount: 20%);
    border-bottom: 2px solid $accent-color;
  }
}
</style>
