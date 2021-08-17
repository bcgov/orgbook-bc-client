<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header
        class="pa-0 d-flex justify-end search-help-button"
        hide-actions
      >
        <template v-slot:default="{ open }">
          <a class="flex-grow-1 search-help-text"> How to search? </a>
          <v-icon class="flex-grow-0" color="white" v-if="open"
            >mdi-close</v-icon
          >
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="ml-n6 search-help-content">
        <slot name="content"></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Data {
  open: boolean;
}

@Component
export default class SearchHelp extends Vue {
  data(): Data {
    return {
      open: true,
    };
  }
}
</script>

<style lang="scss" scoped>
.search-help-button,
.search-help-content {
  background-color: $secondary-color !important;
  color: $white;
}
.search-help-text {
  text-decoration: underline;
  color: $white;
}
</style>
