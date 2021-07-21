<template>
  <div>
    <SearchTopic v-for="result in results" :key="result.id" :topic="result" />
  </div>
</template>

<script lang="ts">
import { ISearchTopic } from "@/interfaces/api/v4/search-topic.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchTopic from "./SearchTopic.vue";

@Component({
  components: {
    SearchTopic,
  },
})
export default class SearchTopicPage extends Vue {
  @Prop({ default: () => [] }) results!: ISearchTopic[];
}
</script>
