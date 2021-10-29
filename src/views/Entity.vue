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
    ...mapActions(["clearFilter"]),
  },
})
export default class Entity extends Vue {
  clearFilter!: () => Promise<void>;

  async beforeRouteLeave(
    to: Route,
    from: Route,
    next: NavigationGuardNext<Vue>
  ): Promise<void> {
    if (!to.fullPath.includes(from.fullPath)) {
      console.log("filters cleared");
      this.clearFilter();
    } else {
      console.log("filters preserved");
    }
    next();
  }
}
</script>
