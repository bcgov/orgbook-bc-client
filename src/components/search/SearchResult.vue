<template>
  <v-row
    v-if="
      extendedSearchFilterFields.length ||
      activeSearchFilters.length ||
      pagedSearchTopics
    "
  >
    <template v-if="extendedSearchFilterFields.length">
      <v-col v-if="$vuetify.display.mdAndUp" cols="12" md="4" class="pa-0">
        <SearchFilterFacetPanels />
      </v-col>
    </template>
    <template v-if="activeSearchFilters.length || pagedSearchTopics">
      <v-col
        cols="12"
        md="8"
        :class="{
          'pa-0 d-flex flex-column': true,
          'pt-2 pb-5 pl-6 pr-8': $vuetify.display.mdAndUp,
        }"
      >
        <template v-if="pagedSearchTopics">
          <SearchFilter class="flex-grow-0" />
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
import SearchTopicPage from "./page/SearchTopicPage.vue";
import SearchTopicPageNavigation from "./page/SearchTopicPageNavigation.vue";
import SearchFilter from "./filter/SearchFilter.vue";
import SearchFilterChips from "./filter/SearchFilterChips.vue";
import SearchFilterFacetPanels from "./filter/SearchFilterFacetPanels.vue";
import { mapGetters } from "vuex";
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import { isFilterActive } from "@/utils/search";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SearchTopicPage,
    SearchTopicPageNavigation,
    SearchFilter,
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
    activeSearchFilters(): ISearchFilter[] {
      return this.extendedSearchFilterFields.filter((field: ISearchFilter) =>
        isFilterActive(this.searchFilters, field)
      );
    },
  },
});
</script>
