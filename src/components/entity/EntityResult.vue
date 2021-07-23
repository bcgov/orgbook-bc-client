<template>
  <div>
    <v-icon>mdi-arrow-left</v-icon><a  href="/" append-icon="mdi-map-marker">Back to search</a>
    <div>Entity Result goes here</div>
    <v-tabs v-model="currentTab">
      <v-tab v-for="(item,i) in tabItems" :key="i" @click="tabClick(item.refname)">{{item.text}}</v-tab>
    </v-tabs>
    <div v-if="selectedTopic">{{ selectedTopic }}</div>
    <div v-if="selectedTopicCredentialSet">
      {{ selectedTopicCredentialSet }}
    </div>
    <div id="ItemOne">
      #ItemOne.
    </div>
  </div>
</template>

<script lang="ts">
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import router from "@/router/index"

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
  currentTab!: string;
  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  fetchTopicCredentialSet!: (id: number) => Promise<void>;

  data (){
    return{
      currentTab:null,
      tabItems:[
        {text:"Item One", refname:"ItemOne"},
        {text:"Item Two", refname:"ItemTwo"},
        {text:"Item Three", refname:"ItemThree"}
      ]
    }
  }

  tabClick(refname:string){
    this.$vuetify.goTo(refname, {duration:500, easing:'easeInOutCubic'})
  }

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
