<template>
  <v-container>
    <v-card>
      <v-card-title v-if="title">{{ title }}</v-card-title>
      <v-expansion-panels
        v-if="$slots.expansionPanels"
        accordion
        class="on-bottom"
      >
        <slot name="expansionPanels"></slot>
      </v-expansion-panels>
      <slot></slot>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EntityCard extends Vue {
  @Prop({ default: "" }) title!: string;
}
</script>
