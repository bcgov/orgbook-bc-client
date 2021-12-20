<template>
  <div>
    <div class="text-h6 font-weight-bold">{{ name }}</div>
    <div v-if="businessNumber">Business number: {{ businessNumber }}</div>
    <div class="mb-1">
      <span v-t="state"></span>
      <span class="font-weight-bold">&nbsp;&middot;&nbsp;</span>
      <span v-t="jurisdiction"></span>
    </div>
    <div
      :class="{
        'pt-1 pb-1 pl-2 pr-2 d-inline-flex text-uppercase text-caption font-weight-bold': true,
        'good-standing': state === 'entity_status.ACT',
        'not-good-standing': state !== 'entity_status.ACT',
      }"
    >
      <span v-if="state === 'entity_status.ACT'">Active</span>
      <span v-if="state === 'entity_status.HIS'">Historical</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EntityHeader extends Vue {
  @Prop({ default: "" }) name!: string;
  @Prop({ default: "" }) businessNumber!: string;
  @Prop({ default: "" }) jurisdiction!: string;
  @Prop({ default: "" }) state!: string;
}
</script>

<style lang="scss" scoped>
.good-standing {
  background-color: $active;
  color: $white;
}
.not-good-standing {
  background-color: $historical;
  color: $white;
}
</style>
