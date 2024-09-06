<template>
  <v-row
    v-if="
      extendedSearchFilterFields.length ||
      activeSearchFilters.length ||
      pagedSearchTopics
    "
  >
    <template v-if="extendedSearchFilterFields.length">
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="4" class="pa-0">
        <SearchFilterFacetPanels />
      </v-col>
    </template>
    <template v-if="activeSearchFilters.length || pagedSearchTopics">
      <v-col
        cols="12"
        md="8"
        :class="{
          'pa-0 d-flex flex-column': true,
          'pt-2 pb-5 pl-6 pr-8': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <template v-if="pagedSearchTopics">
          <SearchFilterResultCount class="flex-grow-0" />
        </template>
        <template v-if="activeSearchFilters.length">
          <SearchFilterChips class="flex-grow-0" />
        </template>
        <template v-if="pagedSearchTopics">
          <SearchTopicPage class="flex-grow-1" />
          <SearchTopicPageNavigation class="flex-grow-0" />
        </template>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchTopicPage from "./page/SearchTopicPage.vue";
import SearchTopicPageNavigation from "./page/SearchTopicPageNavigation.vue";
import SearchFilterResultCount from "./filter/SearchFilterResultCount.vue";
import SearchFilterChips from "./filter/SearchFilterChips.vue";
import SearchFilterFacetPanels from "./filter/SearchFilterFacetPanels.vue";
import { mapGetters } from "vuex";
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import { isFilterActive } from "@/utils/search";

@Component({
  components: {
    SearchTopicPage,
    SearchTopicPageNavigation,
    SearchFilterResultCount,
    SearchFilterChips,
    SearchFilterFacetPanels,
  },
  computed: {
    ...mapGetters([
      "searchQuery",
      "extendedSearchFilterFields",
      "searchFilters",
      "pagedSearchTopics",
    ]),
  },
})
export default class SearchResult extends Vue {
  extendedSearchFilterFields!: ISearchFilter[];
  searchFilters!: ISearchFilter[];

  get activeSearchFilters(): ISearchFilter[] {
    return this.extendedSearchFilterFields.filter((field) =>
      isFilterActive(this.searchFilters, field)
    );
  }
}
</script>
