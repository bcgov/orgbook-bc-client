<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="font-weight-bold">
      <slot name="title">{{ title }}</slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot name="content"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CustomFilterFacetPanel extends Vue {
  @Prop({ default: "" }) title!: string;
}
</script>
