<template>
  <div>
    <v-icon>{{ mdiArrowLeft }}</v-icon
    ><a href="/" :append-icon="mdiMapMarker">Back to search</a>
    <h3>{{ entityName }}</h3>
      <p v-if="entitybusinessNumber !== undefined && entitybusinessNumber !== ''"> Business number: {{ entitybusinessNumber }} </p>
      <p><span v-t="entityState"></span> • <span v-t="entityJurisdiction"></span></p>
    <p>
      <span
        v-if="!loading"
        :class="entityState === 'entity_status.ACT' ? 'standing' : 'notStanding'"
        ><span v-if="entityState !== 'entity_status.ACT'">NOT</span> IN GOOD STANDING</span
      >
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
    <v-row>
      <v-col :class="{'text-right':$vuetify.breakpoint.smAndUp}"
        ><span class="fake-link" @click="toggleCredentialsExpanded"
          >Show all Credential statuses</span
        ></v-col
      >
    </v-row>
    <EntityCard ref="registration" :expanded="credentialsExpanded">
      <template #expansionPanels>
        <CredentialItem
          :authority="entityRegistrationIssuer"
          :authorityLink="entityRegistrationIssuerUrl"
          :effectiveDate="entityEffectiveDate"
        >
          <template #header>
            <h3>Registration</h3>
          </template>
          <template #content>
            <p>
              {{ entityName }} is a <span class="fake-link" v-t="entityJurisdiction"></span>
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
    <EntityCard
      title="Relationships"
      ref="relationships"
      :expanded="credentialsExpanded"
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
              <span class="fake-link">{{
                getRelationshipName(
                  businessAsRelationship[i + relationshipStartIndex]
                )
              }}</span>
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
                @change="relationshipStartIndex = 0"
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
              ><v-icon @click="incRelationshipStartIndex(-1)">{{
                mdiChevronLeft
              }}</v-icon></v-col
            >
            <v-col cols="1"
              ><v-icon @click="incRelationshipStartIndex(1)">{{
                mdiChevronRight
              }}</v-icon></v-col
            >
          </v-row>
        </v-container>
      </template>
    </EntityCard>

    <EntityCard
    :expanded="credentialsExpanded"
      title="Relationships"
      :ref="'relationships' ? businessAsRelationship.length <= 0 : ''"
      v-if="ownedByRelationship !== undefined"
    >
      <template #subtitle>
        <v-container>{{ entityName }} is owned by:</v-container></template
      >
      <template #expansionPanels>
        <CredentialItem
          authority="CRA"
          :effectiveDate="ownedByRelationship.credential.effective_date"
        >
          <template #header>
            <h3>
              <span class="fake-link">{{ getRelationshipName(ownedByRelationship) }}</span>
            </h3>
          </template>
        </CredentialItem>
      </template>
    </EntityCard>

    <!-- enitity card credential holder -->
    <EntityCard :expanded="credentialsExpanded" title="Credentials" ref="credentials">
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
                <span class="fake-link" @click="switchCredentialTimeOrder">Sort by date</span>
                <v-icon v-if="credentialTimeOrder === 1">{{
                  mdiArrowUp
                }}</v-icon>
                <v-icon v-else>{{ mdiArrowDown }}</v-icon>
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
                color="#38598A"
                small
                v-for="(cred, i) in filteredEntityCredentials"
                :key="i"
              >
                <v-container>
                  {{ cred.date_effective | formatDate }}
                  <EntityCard :expanded="credentialsExpanded" class="pl-0">
                    <template #expansionPanels>
                      <CredentialItem
                        :authority="cred.authority"
                        :expired="cred.revoked"
                        :reason="
                          cred.type === 'entity_name'
                            ? cred.registration_reason
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
                                {{ entityTypeToName[cred.type] }}
                              </h3>
                            </v-col>
                            <v-responsive width="100%"> </v-responsive>

                            <v-col>
                              <p>
                                {{ cred.value }}
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
import { IFormattedTopic, ITopic } from "@/interfaces/api/v2/topic.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import { Component, Vue } from "vue-property-decorator";
import { VuetifyGoToTarget } from "vuetify/types/services/goto";
import { mapActions, mapGetters } from "vuex";
import EntityCard from "@/components/entity/entityCard/EntityCard.vue";
import CredentialItem from "@/components/entity/credentialItem/CredentialItem.vue";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import {
  ICredential,
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import { selectFirstAttrItem } from "@/utils/attributeFilter";
import "@/utils/dateFilter";
import moment from "moment";
import EntityFilterChips from "@/components/entity/filter/EntityFilterChips.vue";
import EntityFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";
import EntityFilterDialog from "@/components/entity/filter/EntityFilterDialog.vue";
import { Filter } from "@/store/modules/entity";
import {
  getRelationshipName,
  credOrRelationshipToDisplay,
} from "@/utils/entity";
import { State } from "@/store/modules/app";

interface Data {
  currentTab: string;
  credentialTimeOrder: number;
  entityTypeToName: {
    business_number: string;
    entity_name: string;
  };
  itemsDisplayed: number;
  relationshipStartIndex: number;
  credentialsExpanded: boolean;
}

@Component({
  components: {
    EntityCard,
    CredentialItem,
    EntityFilterChips,
    EntityFilterFacetPanels,
    EntityFilterDialog,
  },
  computed: {
    ...mapGetters([
      "entityTest",
      "selectedTopic",
      "selectedTopicFullCredentialSet",
      "getEntityFilters",
      "getRelationships",
      "mdiArrowUp",
      "mdiArrowDown",
      "mdiArrowLeft",
      "mdiMapMarker",
      "mdiChevronLeft",
      "mdiChevronRight",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchFormattedIdentifiedTopic",
      "fetchTopicFullCredentialSet",
      "setCredentialType",
      "setRegistrationType",
      "setIssuers",
      "fetchRelationships",
    ]),
  },
})
export default class EntityResult extends Vue {
  setLoading!: (loading: boolean) => void;
  currentTab!: string;
  setIssuers!: (creds: ICredentialDisplayType[]) => void;
  setCredentialType!: (creds: ICredentialDisplayType[]) => void;
  setRegistrationType!: (creds: ICredentialDisplayType[]) => void;
  fetchRelationships!: (id: number) => Promise<void>;
  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  fetchTopicFullCredentialSet!: (id: number) => Promise<void>;
  getRelationshipName = getRelationshipName;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  selectedTopic!: IFormattedTopic;
  credentialTimeOrder!: number;
  getEntityFilters!: Filter;
  getRelationships!: IRelationship[];
  relationshipStartIndex!: number;
  itemsDisplayed!: number;
  loading!: boolean;
  credentialsExpanded!: boolean;

  entityTest!: State;

  data(): Data {
    return {
      currentTab: "",
      credentialTimeOrder: 1,
      entityTypeToName: {
        business_number: "Business number issued",
        entity_name: "DBA name registered",
      },
      itemsDisplayed: 100,
      relationshipStartIndex: 0,
      credentialsExpanded:false,
    };
  }

  loadingCallBack(): void {
    if (
      this.selectedTopicFullCredentialSet &&
      this.entityCredentials !== undefined
    ) {
      this.setCredentialType(this.entityCredentials);
      this.setRegistrationType(this.entityCredentials);
      this.setIssuers(this.entityCredentials);
    }
  }

  toggleCredentialsExpanded():void{
    this.credentialsExpanded = !this.credentialsExpanded
  }
  // Credential Filters

  credentialFilters: {
    (creds: Array<ICredentialDisplayType>): Array<ICredentialDisplayType>;
  }[] = [
    this.applyDateFilter,
    this.applyExpiredFilter,
    this.applyCredentialTypeFilter,
    this.applyIssuerFilter,
    this.applyRegistrationTypeFilter,
  ];

  private applyIssuerFilter(creds: Array<ICredentialDisplayType>) {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.Authorities as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter((cred) =>
      (this.getEntityFilters.Authorities as string[]).includes(cred.authority)
    );
  }

  private applyCredentialTypeFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.Credential_type as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter((cred) =>
      (this.getEntityFilters.Credential_type as string[]).includes(
        cred.credential_type
      )
    );
  }

  private applyRegistrationTypeFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.Registration_type as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter(
      (cred) =>
        cred.registration_reason !== undefined &&
        (this.getEntityFilters.Registration_type as string[]).includes(
          cred.registration_reason
        )
    );
  }

  private applyDateFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];

    if (this.getEntityFilters.Date_min !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        //take the negative condition so we don't have to do another check with isSame
        return !moment(this.getEntityFilters.Date_min as string).isAfter(
          cred.date_effective
        );
      });
    }

    if (this.getEntityFilters.Date_max !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        return !moment(this.getEntityFilters.Date_max as string).isBefore(
          cred.date_effective
        );
      });
    }
    return filteredCreds;
  }

  private applyExpiredFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];
    if (!this.getEntityFilters.Show_expired) {
      filteredCreds = creds.filter((cred) => !cred.revoked);
    }
    return filteredCreds;
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

  isRelationshipCred(cred: ICredential): boolean {
    return cred.credential_type.description === "relationship.registries.ca";
  }

  get hasAnyRelationships(): boolean {
    return (
      this.businessAsRelationship.length > 0 ||
      this.ownedByRelationship !== undefined
    );
  }

  get tabItems(): { text: string; refname: string }[] {
    let baseTabItems = [
      { text: "Registration", refname: "registration" },
      { text: "Credentials", refname: "credentials" },
    ];
    if (this.hasAnyRelationships) {
      baseTabItems.splice(1, 0, {
        text: "Relationships",
        refname: "relationships",
      });
    }
    return baseTabItems;
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

  get ownedByRelationship(): IRelationship | undefined {
    const relationships = this.getRelationships.filter(
      (relationship) =>
        selectFirstAttrItem(
          { key: "value", value: "IsOwned" },
          relationship.attributes
        ) !== undefined
    );

    return relationships.length > 0 ? relationships[0] : undefined;
  }

  get entityName(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.text;
  }

  get entitybusinessNumber(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "business_number" },
      this.entityCredentials?.map((cred) => {
        return {
          type: cred.type,
          text: cred.value,
        };
      })
    )?.text as string;
  }

  get entityIncorporationNumber(): string | undefined {
    return this.selectedTopic?.source_id;
  }

  get filteredEntityCredentials(): Array<ICredentialDisplayType> | undefined {
    var filteredCreds = this.entityCredentialsSorted;
    if (filteredCreds === undefined) {
      return undefined;
    }

    this.credentialFilters.forEach((filterFunc) => {
      filteredCreds = filterFunc(filteredCreds as ICredentialDisplayType[]);
    });

    return filteredCreds;
  }

  get entityCredentials(): Array<ICredentialDisplayType> | undefined {
    if (!this.selectedTopicFullCredentialSet) {
      return undefined;
    }

    var fullCredentials: ICredentialDisplayType[] = [];
    this.selectedTopicFullCredentialSet.forEach((credSet) => {
      //filter out all the raltionship credentials
      fullCredentials.push(
        ...credSet.credentials
          .filter((cred) => !this.isRelationshipCred(cred))
          .map((cred) => credOrRelationshipToDisplay(cred))
      );
    });
    this.getRelationships.forEach((rel) => {
      fullCredentials.push(credOrRelationshipToDisplay(rel));
    });
    return fullCredentials;
  }

  get entityCredentialsSorted(): Array<ICredentialDisplayType> | undefined {
    const cpa = (
      item1: ICredentialDisplayType,
      item2: ICredentialDisplayType
    ) => {
      return (
        (moment(item1.date_effective).isBefore(item2.date_effective) ? -1 : 1) *
        this.credentialTimeOrder
      );
    };
    return this.entityCredentials?.sort((cred1, cred2) => {
      return cpa(cred1, cred2);
    });
  }

  get entityState(): string | undefined {
    if (this.selectedTopic === undefined) {
      return undefined;
    }

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

  get entityJurisdiction(): string | undefined {
    const state = selectFirstAttrItem(
      { key: "type", value: "home_jurisdiction" },
      this.selectedTopic?.attributes
    );
    return "entity_type." + state?.value;
  }

  get entityRegistrationIssuer(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.issuer?.name;
  }

  get entityRegistrationIssuerUrl(): string | URL | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.issuer?.url;
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
          this.fetchRelationships(topic.id),
          this.fetchTopicFullCredentialSet(topic.id),
        ]);
      }
    }
    this.setLoading(false);
    this.loadingCallBack();
  }
}
</script>
<style lang="scss" scoped>
.standing {
  background-color: $active;
  border: 10px solid $active;
  color: $white;
}
.notStanding {
  background-color: $historical;
  border: 10px solid $historical;
}
</style>
