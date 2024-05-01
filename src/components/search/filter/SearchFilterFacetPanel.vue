<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="font-weight-bold">
      <slot name="title"></slot>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <SearchFilterFacets class="pt-0" :fields="fields" />
      <template v-if="more.length">
        <div
          class="fake-link text-body-2 d-flex align-center justify-center"
          @click="show = !show"
        >
          <span v-if="show">See less</span><span v-else>See more</span>
        </div>
        <SearchFilterFacets v-if="show" :fields="more" />
      </template>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts">
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import SearchFilterFacets from "@/components/search/filter/SearchFilterFacets.vue";
import { defineComponent, PropType } from "vue";

interface Data {
  show: boolean;
}

export default defineComponent({
  components: {
    SearchFilterFacets,
  },
  data(): Data {
    return {
      show: false,
    };
  },
  props: {
    fields: { default: () => [], type: Array as PropType<ISearchFilter[]> },
    more: { default: () => [], type: Array as PropType<ISearchFilter[]> },
  },
});
</script>
