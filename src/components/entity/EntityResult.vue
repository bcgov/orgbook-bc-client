<template>
  <div>
    <v-icon>mdi-arrow-left</v-icon
    ><a href="/" append-icon="mdi-map-marker">Back to search</a>
    <h3>{{ entityName }}</h3>
    <p>
      Business number: <br />{{ $t(entityState) }} •
      {{ $t(entityJurisdiction) }}
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
        ><a @click="toggleCredentialsExpanded"
          >Show all Credential statuses</a
        ></v-col
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
              {{ entityName }} is a
              <a>{{ $t(entityJurisdiction) }}</a>
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

    <EntityCard
      title="Relationships"
      ref="relationships"
      v-if="businessAsRelationship.length > 0"
    >
      <template #subtitle>
        <v-container>
          <p>{{ entityName }} is doing business as:</p>
        </v-container>
      </template>
      <template #expansionPanels>
        <CredentialItem
          v-for="(_, i) in Math.min(
            businessAsRelationship.length - relationshipStartIndex,
            itemsDisplayed
          )"
          :key="i"
          authority="CRA"
          :effectiveDate="
            businessAsRelationship[i + relationshipStartIndex].credential
              .effective_date
          "
        >
          <template #header>
            <h3>
              <a>{{
                getRelationshipName(
                  businessAsRelationship[i + relationshipStartIndex]
                )
              }}</a>
            </h3>
          </template>
        </CredentialItem>
      </template>
      <template #footer>
        <v-container>
          <v-row>
            <v-col cols="12">
              <p>Items displayed</p>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="itemsDisplayed"
                :items="[5, 10, 100]"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <p>
                {{ relationshipStartIndex + 1 }} -
                {{
                  Math.min(
                    Math.min(itemsDisplayed, businessAsRelationship.length) +
                      relationshipStartIndex,
                    businessAsRelationship.length
                  )
                }}
                of {{ businessAsRelationship.length }}
              </p>
            </v-col>
            <v-col cols="1"
              ><v-icon @click="incRelationshipStartIndex(-1)"
                >mdi-chevron-left</v-icon
              ></v-col
            >
            <v-col cols="1"
              ><v-icon @click="incRelationshipStartIndex(1)"
                >mdi-chevron-right</v-icon
              ></v-col
            >
          </v-row>
        </v-container>
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
              <div class="text-body-2 float-right">
                <a @click="switchCredentialTimeOrder">Sort by date</a>
                <v-icon v-if="credentialTimeOrder === 1">mdi-arrow-up</v-icon>
                <v-icon v-else>mdi-arrow-down</v-icon>
              </div>
            </v-col>
          </v-row>
          <EntityFilterChips />
        </v-container>
        <!-- body of the credential card -->
        <v-row>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="12"
            md="5"
            class="pa-0 elevation-2"
          >
            <EntityFilterFacetPanels />
          </v-col>

          <v-col cols="12" md="7">
            <v-timeline dense class="on-bottom">
              <!-- creates a timeline item for each credential in the entity -->
              <v-timeline-item
                color="blue"
                small
                v-for="(cred, i) in filteredEntityCredentials"
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
                              <h3>
                                {{ entityTypeToName[cred.local_name.type] }}
                              </h3>
                            </v-col>
                            <v-responsive width="100%"> </v-responsive>

                            <v-col>
                              <p
                                v-if="
                                  cred.credential_type.description ===
                                  'relationship.registries.ca'
                                "
                              >
                                {{ getRelatedName(cred) }}
                              </p>
                              <p v-else>
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
          </v-col>
        </v-row>
      </template>
    </EntityCard>
  </div>
</template>

<script lang="ts">
import {
  IFormattedTopic,
  ITopic,
  ITopicAttribute,
} from "@/interfaces/api/v2/topic.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import { Component, Vue } from "vue-property-decorator";
import { VuetifyGoToTarget } from "vuetify/types/services/goto";
import { mapActions, mapGetters } from "vuex";
import EntityCard from "@/components/entity/entityCard/EntityCard.vue";
import CredentialItem from "@/components/entity/credentialItem/CredentialItem.vue";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ICredential } from "@/interfaces/api/v2/credential.interface";
import {
  selectAllAttrItem,
  selectFirstAttrItem,
} from "@/utils/attributeFilter";
import "@/utils/dateFilter";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import moment from "moment";
import SearchFilter from "@/components/search/filter/SearchFilter.vue";
import EntityFilterChips from "@/components/entity/filter/EntityFilterChips.vue";
import EntityFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";
import EntityFilterDialog from "@/components/entity/filter/EntityFilterDialog.vue";
import { Filter } from "@/store/modules/entityFilter";

interface Data {
  currentTab: string;
  credentialTimeOrder: number;
  tabItems: Array<{ text: string; refname: string }>;
  entityTypeToName: {
    business_number: string;
    entity_name: string;
  };
  itemsDisplayed: number;
  relationshipStartIndex: number;
}

@Component({
  components: {
    EntityCard,
    CredentialItem,
    SearchFilter,
    EntityFilterChips,
    EntityFilterFacetPanels,
    EntityFilterDialog,
  },
  computed: {
    ...mapGetters([
      "selectedTopic",
      "selectedTopicCredentialSet",
      "getEntityFilters",
      "getRelationships",
    ]),
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchFormattedIdentifiedTopic",
      "fetchTopicCredentialSet",
      "fetchIssuers",
      "fetchCredntialType",
      "fetchFilters",
      "toggleCredentialsExpanded",
      "fetchRelationships",
    ]),
  },
})
export default class EntityResult extends Vue {
  setLoading!: (loading: boolean) => void;
  currentTab!: string;
  toggleCredentialsExpanded!: () => void;
  fetchIssuers!: () => Promise<void>;
  fetchCredntialType!: () => Promise<void>;
  fetchFilters!: (id: number) => Promise<void>;
  fetchRelationships!: (id: number) => Promise<void>;
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
  getEntityFilters!: Filter;
  getRelationships!: IRelationship[];
  relationshipStartIndex!: number;
  itemsDisplayed!: number;

  data(): Data {
    return {
      currentTab: "",
      credentialTimeOrder: 1,
      tabItems: [
        { text: "Registration", refname: "registration" },
        { text: "Addresses", refname: "addresses" },
        { text: "Relationships", refname: "relationships" },
        { text: "Credentials", refname: "credentials" },
      ],
      entityTypeToName: {
        business_number: "Business number issued",
        entity_name: "DBA name registered",
      },
      itemsDisplayed: 100,
      relationshipStartIndex: 0,
    };
  }

  // Credential Filters

  credentialFilters: { (creds: Array<ICredential>): Array<ICredential> }[] = [
    this.applyDateFilter,
    this.applyExpiredFilter,
    this.applyCredentialTypeFilter,
  ];

  private applyCredentialTypeFilter(
    creds: Array<ICredential>
  ): Array<ICredential> {
    var filteredCreds = creds;
    if ((this.getEntityFilters.Credential_type as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter((cred) =>
      (this.getEntityFilters.Credential_type as string[]).includes(
        cred.credential_type.description
      )
    );
  }

  private applyDateFilter(creds: Array<ICredential>): Array<ICredential> {
    var filteredCreds = creds;

    if (this.getEntityFilters.Date_min !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        //take the negative condition so we don't have to do another check with isSame
        return !moment(this.getEntityFilters.Date_min as string).isAfter(
          cred.effective_date
        );
      });
    }

    if (this.getEntityFilters.Date_max !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        return !moment(this.getEntityFilters.Date_max as string).isBefore(
          cred.effective_date
        );
      });
    }
    return filteredCreds;
  }

  private applyExpiredFilter(creds: Array<ICredential>): Array<ICredential> {
    var filteredCreds = creds;
    if (!this.getEntityFilters.Show_expired) {
      filteredCreds = creds.filter((cred) => !cred.revoked);
    }
    return filteredCreds;
  }

  //class methods
  test(): void {
    console.log(JSON.stringify(this.businessAsRelationship));
  }

  getRelatedName(cred: ICredential): string | undefined {
    return cred.related_topics[0]?.local_name?.text;
  }

  getRelationshipName(relationship: IRelationship): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      relationship.related_topic.names
    )?.text;
  }

  tabClick(refname: string): void {
    this.$vuetify.goTo(this.$refs[refname] as VuetifyGoToTarget, {
      duration: 500,
      easing: "easeInOutCubic",
    });
  }

  incRelationshipStartIndex(num: number): void {
    const interval = Math.min(
      this.businessAsRelationship.length,
      this.itemsDisplayed
    );
    if (
      this.relationshipStartIndex + num * interval >= 0 &&
      this.relationshipStartIndex + num * interval <
        this.businessAsRelationship.length
    )
      this.relationshipStartIndex += num * interval;
  }

  switchCredentialTimeOrder(): void {
    this.credentialTimeOrder *= -1;
  }

  get businessAsRelationship(): IRelationship[] {
    return this.getRelationships.filter(
      (relationship) =>
        selectFirstAttrItem(
          { key: "value", value: "Does Business As" },
          relationship.attributes
        ) !== undefined
    );
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

  get filteredEntityCredentials(): Array<ICredential> | undefined {
    if (this.entityCredentials === undefined) {
      return undefined;
    }
    var filteredCreds = this.entityCredentials;
    this.credentialFilters.forEach((filterFunc) => {
      filteredCreds = filterFunc(filteredCreds);
    });

    return filteredCreds;
  }

  get entityCredentials(): Array<ICredential> | undefined {
    if (!this.selectedTopicCredentialSet) {
      return undefined;
    }
    var fullCredentials: ICredential[] = [];
    this.selectedTopicCredentialSet.forEach((credSet) => {
      fullCredentials.push(...credSet.credentials);
    });
    return fullCredentials.sort(
      (cred1, cred2) =>
        (moment(cred1.effective_date).isBefore(cred2.effective_date) ? 1 : -1) *
        this.credentialTimeOrder
    );
  }

  get entityState(): string | undefined {
    const state = selectFirstAttrItem(
      { key: "type", value: "entity_status" },
      this.selectedTopic?.attributes
    );
    return state?.type + "." + state?.value;
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
    const state = selectFirstAttrItem(
      { key: "type", value: "home_jurisdiction" },
      this.selectedTopic?.attributes
    );
    return "entity_type." + state?.value;
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
        await Promise.all([
          this.fetchIssuers(),
          this.fetchCredntialType(),
          this.fetchRelationships(topic.id),
        ]);
        await this.fetchTopicCredentialSet(topic.id);
        await this.fetchFilters(topic.id);
      }
    }
    this.setLoading(false);
  }
}
</script>
