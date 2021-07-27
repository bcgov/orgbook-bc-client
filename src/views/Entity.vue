<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-8">
      <h1>Entity goes here!</h1>
      <EntityResult />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntityResult from "@/components/entity/EntityResult.vue";

@Component({
  components: {
    EntityResult,
  },
})
export default class Entity extends Vue {}
</script>
