<template>
  <div>
    <SearchFilter />
    <SearchFilterChips />
    <SearchTopicPage />
    <SearchTopicPageNavigation />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchTopicPage from "./page/SearchTopicPage.vue";
import SearchTopicPageNavigation from "./page/SearchTopicPageNavigation.vue";
import SearchFilter from "./filter/SearchFilter.vue";
import SearchFilterChips from "./filter/SearchFilterChips.vue";

@Component({
  components: {
    SearchTopicPage,
    SearchTopicPageNavigation,
    SearchFilter,
    SearchFilterChips,
  },
})
export default class SearchResult extends Vue {}
</script>
