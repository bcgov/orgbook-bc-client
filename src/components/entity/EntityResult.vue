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

    <!-- enitity card credential holder -->
    <EntityCard title="Credentials" ref="credentials">
      <template>
        <v-container>
          <!-- header content for the credential card -->
          <v-row>
            <v-col v-if="$vuetify.breakpoint.smAndDown" class="pl-0 pr-0">
              <div class="flex-row flex-align-items-center">
                <EntityFilterDialog />
              </div>
            </v-col>
            <v-col class="pl-0 pr-0">
              <div
                class="text-body-2 float-right"
              >
              <a @click="switchCredentialTimeOrder">Sort by date</a>
              <v-icon v-if="credentialTimeOrder === 1">mdi-arrow-up</v-icon>
              <v-icon v-else>mdi-arrow-down</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <!-- body of the credential card -->
        <v-timeline dense class="on-bottom">
          <!-- creates a timeline item for each credential in the entity -->
          <v-timeline-item
            color="blue"
            small
            v-for="(cred, i) in entityCredntials"
            :key="i"
          >
            <v-container>
              {{ cred.effective_date | formatDate }}
              <EntityCard class="pl-0">
                <template #expansionPanels>
                  <CredentialItem
                    :authority="entityRegistrationIssuer"
                    :expired="cred.revoked"
                    :reason="
                      cred.latest && cred.local_name.type === 'entity_name'
                        ? entityRegistrationReason
                        : ''
                    "
                    :dropdownDivider="true"
                  >
                    <template #header>
                      <v-row>
                        <v-col v-if="cred.revoked">
                          <span style="color: red">
                            Expired {{ cred.revoked_date | formatDate }}
                          </span>
                        </v-col>
                        <v-responsive width="100%"> </v-responsive>

                        <v-col>
                          <h3>DBA name registered</h3>
                        </v-col>
                        <v-responsive width="100%"> </v-responsive>

                        <v-col>
                          <p>
                            {{ cred.local_name.text }}
                          </p>
                        </v-col>
                      </v-row>
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
import EntityCard from "@/components/entity/entityCard/entityCard.vue";
import CredentialItem from "@/components/entity/credentialItem/credentialItem.vue";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ICredential } from "@/interfaces/api/v2/credential.interface";
import { selectFirstAttrItem } from "@/utils/attributeFilter";
import "@/utils/dateFilter";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import moment from "moment";
import SearchFilter from "@/components/search/filter/SearchFilter.vue";
import SearchFilterChips from "@/components/search/filter/SearchFilterChips.vue";
import SearchFilterFacetPanels from "@/components/search/filter/SearchFilterFacetPanels.vue";
import EntityFilterDialog from "@/components/entity/filter/EntityFilterDialog.vue";

@Component({
  components: {
    EntityCard,
    CredentialItem,
    SearchFilter,
    SearchFilterChips,
    SearchFilterFacetPanels,
    EntityFilterDialog,
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
  credentialTimeOrder!: number;

  data() {
    return {
      currentTab: null,
      credItemsExpanded: false,
      credentialTimeOrder: 1,
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
    console.log(
      JSON.stringify(this.selectedTopicCredentialSet[0]?.credentials)
    );
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

  switchCredentialTimeOrder() {
    this.credentialTimeOrder *= -1;
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

  get entityCredntials(): Array<ICredential> | undefined {
    if (!this.selectedTopicCredentialSet) {
      return undefined;
    }
    return this.selectedTopicCredentialSet[0]?.credentials.sort(
      (cred1, cred2) =>
        (moment(cred1.effective_date).isBefore(cred2.effective_date) ? 1 : -1) *
        this.credentialTimeOrder
    );
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

  get entityRegistrationReason(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "reason_description" },
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
