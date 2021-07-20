<template>
  <div>
    <div>Search Result goes here</div>
    <SearchTopicPage :results="page && page.results" />
    <SearchTopicPageNavigation :page="page" />
    <SearchFilter />
    <SearchFilterChips />
  </div>
</template>

<script lang="ts">
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchTopic } from "@/interfaces/api/v4/search-topic.interface";
import { defaultPageResult } from "@/utils/result";
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchTopicPage from "./SearchTopicPage.vue";
import SearchTopicPageNavigation from "./SearchTopicPageNavigation.vue";
import SearchFilter from "./SearchFilter.vue";
import SearchFilterChips from "./SearchFilterChips.vue";

@Component({
  components: {
    SearchTopicPage,
    SearchTopicPageNavigation,
    SearchFilter,
    SearchFilterChips,
  },
})
export default class SearchResult extends Vue {
  @Prop({ default: () => defaultPageResult<ISearchTopic>() })
  page!: IApiPagedResult<ISearchTopic>;
}
</script>
