<template>
  <div>
    <v-icon>mdi-arrow-left</v-icon
    ><a href="/" append-icon="mdi-map-marker">Back to search</a>
    <h3>{{ entityName }}</h3>
    <p>
      Business number: <br />{{ entityActive }}
      <span v-if="entityJurisdiction === 'BC'">• BC Corporation</span>
    </p>

    <v-tabs v-model="currentTab">
      <v-tab
        v-for="(item, i) in tabItems"
        :key="i"
        @click="tabClick(item.refname)"
        >{{ item.text }}</v-tab
      >
    </v-tabs>
    <v-divider></v-divider>
    <v-btn @click="test">TEST</v-btn>

    <v-row>
      <v-col :class="$vuetify.breakpoint.smAndUp ? 'text-right' : ''"
        ><a @click="toggleShowCreds">Show all Credential statuses</a></v-col
      >
    </v-row>

    <EntityCard ref="registration">
      <template #expansionPanels>
        <CredentialItem
          :authority="entityRegistrationIssuer"
          effectiveDate="1914-01-30T08:00:00+00:00"
        >
          <template #header>
            <h3>Registration</h3>
          </template>
          <template #content>
            <p>
              {{ entityName }} is
              <span v-if="entityJurisdiction !== 'BC'">not</span> a
              <a>BC Corporation</a>
            </p>

            <p>
              Incorporation number: {{ entityIncorporationNumber }} <br />
              Registered on: {{ entityRegistrationDate | formatDate }} <br />
              Business name effective: {{ entityEffectiveDate | formatDate }}
            </p>
          </template>
        </CredentialItem>
      </template>
    </EntityCard>

    <EntityCard title="Addresses" ref="addresses">
      <template #expansionPanels>
        <CredentialItem
          authority="CRA"
          effectiveDate="1914-01-30T08:00:00+00:00"
        >
          <template #header>
            <h3>Physical address</h3>
          </template>
          <template #content>
            <p>Credential Value Here</p>
          </template>
        </CredentialItem>

        <CredentialItem
          authority="CRA"
          effectiveDate="1914-01-30T08:00:00+00:00"
          :expanded="credItemsExpanded"
        >
          <template #header>
            <h3>Mailing address</h3>
          </template>
          <template #content>
            <p>Test Rd, Victoria BC</p>
          </template>
        </CredentialItem>
      </template>
    </EntityCard>

    <EntityCard title="Credentials" ref="credentials">
      <template>
        <v-timeline dense>
          <v-timeline-item color="blue" small v-for="(cred,i) in entityCredntials" :key="i">
            <v-container>
              {{cred.create_timestamp|formatDate}}
              <EntityCard class="pl-0">
                <template #expansionPanels>
                  <CredentialItem
                    :authority="entityRegistrationIssuer"
                    effectiveDate="1914-01-30T08:00:00+00:00"
                  >
                    <template #header>
                      <h3>DBA name registered</h3><br/>
                      {{cred.local_name.text}}
                    </template>
                    
                  </CredentialItem>
                </template>
              </EntityCard>
            </v-container>
          </v-timeline-item>
        </v-timeline>
      </template>
    </EntityCard>
  </div>
</template>

<script lang="ts">
import { IFormattedTopic, ITopic } from "@/interfaces/api/v2/topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { VuetifyGoToTarget } from "vuetify/types/services/goto";
import { mapActions, mapGetters } from "vuex";
import EntityCard from "@/components/entityCard/entityCard.vue";
import CredentialItem from "@/components/credentialItem/credentialItem.vue";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ICredential } from "@/interfaces/api/v2/credential.interface";
import { selectFirstAttrItem } from "@/utils/attributeFilter";
import "@/utils/dateFilter";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";

@Component({
  components: {
    EntityCard,
    CredentialItem,
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
  credItemsExpanded!: boolean;
  currentTab!: string;
  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  fetchTopicCredentialSet!: (id: number) => Promise<void>;
  selectedTopicCredentialSet!: Array<ICredentialSet>;
  selectedTopic!: IFormattedTopic;

  data() {
    return {
      currentTab: null,
      credItemsExpanded: false,
      tabItems: [
        { text: "Registration", refname: "registration" },
        { text: "Addresses", refname: "addresses" },
        { text: "Relationships", refname: "relationships" },
        { text: "Credentials", refname: "credentials" },
      ],
    };
  }

  test() {
    //console.log(this.selectedTopicCredentialSet.names)
    console.log(JSON.stringify(this.selectedTopicCredentialSet[0]?.credentials));
    // this.selectedTopic?.names.forEach(name=>{
    //   console.log(JSON.stringify(name))
    // })
  }

  toggleShowCreds() {
    this.credItemsExpanded = !this.credItemsExpanded;
    console.log(this.credItemsExpanded);
  }

  tabClick(refname: string) {
    this.$vuetify.goTo(this.$refs[refname] as VuetifyGoToTarget, {
      duration: 500,
      easing: "easeInOutCubic",
    });
  }

  get entityName(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.text;
  }

  get entitybusinessNumber(): string | undefined {
    return this.selectedTopic?.source_id;
  }

  get entityIncorporationNumber(): string | undefined {
    return this.selectedTopic?.source_id;
  }

  get entityCredntials(): Array<ICredential> | undefined{
    return this.selectedTopicCredentialSet[0]?.credentials
  }

  get entityActive(): string | undefined {
    const state = selectFirstAttrItem(
      { key: "type", value: "entity_status" },
      this.selectedTopic?.attributes
    )?.value;
    if (!state) {
      return state;
    } else {
      return state === "ACT" ? "Active" : "Inactive";
    }
  }

  get entityRegistrationDate(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "registration_date" },
      this.selectedTopic?.attributes
    )?.value;
  }

  get entityEffectiveDate(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_status_effective" },
      this.selectedTopic?.attributes
    )?.value;
  }

  get entityJurisdiction(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "home_jurisdiction" },
      this.selectedTopic?.attributes
    )?.value;
  }

  get entityRegistrationIssuer(): IIssuer | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.issuer;
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
