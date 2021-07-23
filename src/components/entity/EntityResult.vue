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
    <v-btn @click="test">
      Test
    </v-btn>
    <EntityCard ref="registration" >
      <template #expansionPanels>
        <CredentialItem authority="test" effectiveDate="1914-01-30T08:00:00+00:00">
        <template #header>
          <h3>Registration</h3>
        </template>
        <template #content>
          <p>test</p>
        </template>
      </CredentialItem>

      <CredentialItem title="Message" authority="hello" effectiveDate="1914-01-30T08:00:00+00:00">
        <template #header>
          <h3>Message</h3>
        </template>
        <template #content>
          <p>Hello World!</p>
        </template>
      </CredentialItem>
      </template>      
    </EntityCard>

    <EntityCard title="Addresses" ref="addresses" >
      <template #expansionPanels>
        <CredentialItem authority="CRA" effectiveDate="1914-01-30T08:00:00+00:00">
        <template #header>
          <h3>Physical address</h3>
        </template>
        <template #content>
          <p>Credential Value Here</p>
        </template>
      </CredentialItem>

      <CredentialItem authority="CRA" effectiveDate="1914-01-30T08:00:00+00:00">
        <template #header>
          <h3>Mailing address</h3>
        </template>
        <template #content>
          <p>Test Rd, Victoria BC</p>
        </template>
      </CredentialItem>
      </template>      
    </EntityCard>
  </div>
</template>

<script lang="ts">
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { VuetifyGoToTarget } from "vuetify/types/services/goto";
import { mapActions, mapGetters } from "vuex";
import EntityCard from "@/components/entityCard/entityCard.vue"
import CredentialItem from "@/components/credentialItem/credentialItem.vue"
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";


@Component({
  components:{
    EntityCard,
    CredentialItem
  },
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
  selectedTopicCredentialSet!: ICredentialSet | null;
  selectedTopic!: ITopic | null;

  data (){
    return{
      currentTab:null,
      tabItems:[
        {text:"Registration", refname:"registration"},
        {text:"Addresses", refname:"addresses"},
        {text:"Item Three", refname:"ItemThree"}
      ]
    }
  }

  test(){
    console.log(this.selectedTopicCredentialSet)
  }

  tabClick(refname:string){
    this.$vuetify.goTo(this.$refs[refname] as VuetifyGoToTarget, {duration:500, easing:'easeInOutCubic'})
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
