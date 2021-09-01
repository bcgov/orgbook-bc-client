<template>
  <v-card elevation="0" rounded="sm" class="card mb-5">
    <div v-if="title" class="pl-6 pr-6 pt-4 pb-4 text-h6 font-weight-bold">
      {{ title }}
    </div>
    <slot name="subtitle"></slot>
    <v-expansion-panels
      v-if="$slots.expansionPanels"
      flat
      accordion
      multiple
      :value="panelList"
    >
      <slot name="expansionPanels"></slot>
    </v-expansion-panels>
    <slot name="content"></slot>
    <slot name="footer"></slot>
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EntityCard extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: false }) expanded!: boolean;

  get panelList(): number[] {
    return this.expanded
      ? [...Array(this.$slots.expansionPanels?.length).keys()]
      : [];
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card-raised;
}
</style>
