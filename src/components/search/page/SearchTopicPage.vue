<template>
  <div v-if="total">
    <SearchTopic
      v-for="result in pagedSearchTopics.results"
      :key="result.id"
      :topic="result"
    />
  </div>
</template>

<script lang="ts">
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchTopic } from "@/interfaces/api/v4/search-topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchTopic from "./SearchTopic.vue";

@Component({
  components: {
    SearchTopic,
  },
  computed: {
    ...mapGetters(["pagedSearchTopics"]),
  },
})
export default class SearchTopicPage extends Vue {
  pagedSearchTopics!: IApiPagedResult<ISearchTopic>;

  get total(): number {
    return this?.pagedSearchTopics?.total || 0;
  }
}
</script>
