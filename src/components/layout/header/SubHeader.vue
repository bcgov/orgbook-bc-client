<template>
  <v-toolbar class="sub-header" flat dense>
    <v-container :fluid="$vuetify.display.smAndDown" class="pa-0">
      <v-row v-if="links.length" class="d-flex align-center">
        <v-col class="pa-1">
          <v-btn
            v-for="link in links"
            :key="link.path"
            variant="plain"
            color="white"
            :to="link.path"
            :ripple="false"
            class="text-capitalize sub-header-link"
            selected-class="active"
            >{{ link.label }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import { INavLink } from "@/interfaces/nav-link.interface";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    links: { default: () => [], type: Array as PropType<INavLink[]> },
  },
});
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
