<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
    <EntityResult />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntityResult from "@/components/entity/EntityResult.vue";
import { NavigationGuardNext, Route } from "vue-router";
import { mapActions as pmapActions } from "pinia";
import { useEntityState } from "@/stores";

Component.registerHooks(["beforeRouteLeave"]);

export default {
  methods: {
    ...pmapActions(useEntityState, ["setScrollY", "clearFilter"]),
  },
  async beforeRouteLeave(
    to: Route,
    from: Route,
    next: NavigationGuardNext<Vue>
  ): Promise<void> {
    this.setScrollY(window.scrollY);
    if (!to.fullPath.includes(from.fullPath)) {
      this.clearFilter();
    }
    next();
  }
}
</script>
