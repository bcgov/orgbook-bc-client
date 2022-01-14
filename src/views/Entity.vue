<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
    <EntityResult />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntityResult from "@/components/entity/EntityResult.vue";
import { NavigationGuardNext, Route } from "vue-router";
import { mapActions } from "vuex";

Component.registerHooks(["beforeRouteLeave"]);

@Component({
  components: {
    EntityResult,
  },
  methods: {
    ...mapActions(["clearFilter", "setScrollY"]),
  },
})
export default class Entity extends Vue {
  clearFilter!: () => Promise<void>;
  setScrollY!: (top: number) => void;

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
