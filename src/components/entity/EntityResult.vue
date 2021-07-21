<template>
  <div>
    <div>Entity Result goes here</div>
    <div v-if="selectedTopic">{{ selectedTopic }}</div>
    <div v-if="selectedTopicCredentialSet">
      {{ selectedTopicCredentialSet }}
    </div>
  </div>
</template>

<script lang="ts">
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["selectedTopic", "selectedTopicCredentialSet"]),
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchFormattedIdentifiedTopic",
      "fetchTopicCredentialSet",
    ]),
  },
})
export default class EntityResult extends Vue {
  setLoading!: (loading: boolean) => void;
  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  fetchTopicCredentialSet!: (id: number) => Promise<void>;

  async created(): Promise<void> {
    this.setLoading(true);
    const { sourceId } = this.$route.params;
    if (sourceId) {
      await this.fetchFormattedIdentifiedTopic({
        sourceId,
        type: "registration.registries.ca",
      });
      const topic: ITopic = this.$store.getters.selectedTopic;
      if (topic?.id) {
        await this.fetchTopicCredentialSet(topic.id);
      }
    }
    this.setLoading(false);
  }
}
</script>
