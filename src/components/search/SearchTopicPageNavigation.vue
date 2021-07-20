<template>
  <div>
    <div>Search Topic Page Navigation goes here</div>
    <!-- {{ page }} -->
  </div>
</template>

<script lang="ts">
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchTopic } from "@/interfaces/api/v4/search-topic.interface";
import { defaultPageResult } from "@/utils/result";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SearchTopicPageNavigation extends Vue {
  @Prop({ default: () => defaultPageResult<ISearchTopic>() })
  page!: IApiPagedResult<ISearchTopic>;
}
</script>
