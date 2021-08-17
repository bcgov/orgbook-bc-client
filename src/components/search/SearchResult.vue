<template>
  <div>
    <v-row>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="4" class="pa-0">
        <SearchFilterFacetPanels />
      </v-col>
      <v-col
        cols="12"
        md="8"
        :class="{
          'pa-0': true,
          'pt-2 pb-5 pl-6 pr-8': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <SearchFilter />
        <SearchFilterChips />
        <SearchTopicPage />
        <SearchTopicPageNavigation />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchTopicPage from "./page/SearchTopicPage.vue";
import SearchTopicPageNavigation from "./page/SearchTopicPageNavigation.vue";
import SearchFilter from "./filter/SearchFilter.vue";
import SearchFilterChips from "./filter/SearchFilterChips.vue";
import SearchFilterFacetPanels from "./filter/SearchFilterFacetPanels.vue";

@Component({
  components: {
    SearchTopicPage,
    SearchTopicPageNavigation,
    SearchFilter,
    SearchFilterChips,
    SearchFilterFacetPanels,
  },
})
export default class SearchResult extends Vue {}
</script>
