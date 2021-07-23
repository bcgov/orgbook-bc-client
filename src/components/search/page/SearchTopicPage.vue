<template>
  <div>
    <SearchTopic
      v-for="result in pagedSearchTopics.results"
      :key="result.id"
      :topic="result"
    />
  </div>
</template>

<script lang="ts">
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
export default class SearchTopicPage extends Vue {}
</script>
