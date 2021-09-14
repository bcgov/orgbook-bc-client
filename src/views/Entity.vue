<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
    <EntityResult />
  </v-container>
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
