<template>
  <div v-if="total">
    <!-- <SearchTopic
      v-for="result in pagedSearchTopics.results"
      :key="result.id"
      :topic="result"
    /> -->
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import SearchTopic from "./SearchTopic.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SearchTopic,
  },
  computed: {
    ...mapGetters(["pagedSearchTopics"]),
    total(): number {
      return this?.pagedSearchTopics?.total || 0;
    },
  },
});
</script>
