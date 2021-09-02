<template>
  <div>
    <BackToSearch />
    <EntityHeader
      :name="entityName"
      :businessNumber="entityBusinessNumber"
      :jurisdiction="entityJurisdiction"
      :state="entityState"
      class="mb-2"
    />
    <v-tabs v-model="currentTab" slider-size="5px">
      <v-tab
        v-for="(item, i) in tabItems"
        :key="i"
        :ripple="false"
        active-class="tab-active"
        @click="tabClick(item.refname)"
        class="text-capitalize"
        >{{ item.text }}</v-tab
      >
    </v-tabs>
    <v-divider></v-divider>
    <v-row>
      <v-col
        :class="{
          'pa-0 pt-2 pb-4': true,
          'text-right': $vuetify.breakpoint.smAndUp,
        }"
        ><span
          class="text-body-2 show-all-statuses vertical-align-middle"
          @click="toggleCredentialsExpanded"
          >Show all Credential statuses</span
        ></v-col
      >
    </v-row>

    <!-- Topic -->
    <EntityCard ref="registration" :expanded="credentialsExpanded">
      <template #expansionPanels>
        <CredentialItem
          :authority="entityRegistrationIssuer"
          :authorityLink="entityRegistrationIssuerUrl"
          :effectiveDate="entityEffectiveDate"
        >
          <template #header>
            <div class="text-h6 font-weight-bold">Registration</div>
          </template>
        </CredentialItem>
      </template>
      <template #content>
        <div class="pa-5">
          <div class="mb-6 text-body-2">
            <span>{{ entityName }}</span>
            <span>&nbsp;is a&nbsp;</span>
            <span class="fake-link" v-t="entityJurisdiction"></span>
          </div>
          <div class="text-body-2">
            <div>Incorporation number: {{ entityIncorporationNumber }}</div>
            <div>Registered on: {{ entityRegistrationDate | formatDate }}</div>
            <div>
              Business name effective: {{ entityEffectiveDate | formatDate }}
            </div>
          </div>
        </div>
      </template>
    </EntityCard>

    <!-- Relationships related to -->
    <EntityCard
      title="Relationships"
      ref="relationships"
      :expanded="credentialsExpanded"
      v-if="businessAsRelationship && businessAsRelationship.length > 0"
    >
      <template #subtitle>
        <div class="pl-5 pr-5 mb-5 text-body-2">
          {{ entityName }} is doing business as:
        </div>
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
            <div class="fake-link font-weight-bold">
              {{
                getRelationshipName(
                  businessAsRelationship[i + relationshipStartIndex]
                )
              }}
            </div>
          </template>
        </CredentialItem>
      </template>
      <template #footer>
        <div class="pa-5 d-flex align-center justify-end">
          <span class="text-body-2"
            >Items displayed {{ relationshipStartIndex + 1 }} -
            {{
              Math.min(
                Math.min(itemsDisplayed, businessAsRelationship.length) +
                  relationshipStartIndex,
                businessAsRelationship.length
              )
            }}
            of {{ businessAsRelationship.length }}
          </span>
          <v-btn icon @click="incRelationshipStartIndex(-1)">
            <v-icon>{{ mdiChevronLeft }}</v-icon>
          </v-btn>
          <v-btn icon @click="incRelationshipStartIndex(1)">
            <v-icon>{{ mdiChevronRight }}</v-icon>
          </v-btn>
        </div>
      </template>
    </EntityCard>

    <!-- Relationships related from -->
    <EntityCard
      title="Relationships"
      ref="relationships"
      :expanded="credentialsExpanded"
      v-if="ownedByRelationship"
    >
      <template #subtitle>
        <div class="pl-5 pr-5 mb-5 text-body-2">
          {{ entityName }} is owned by:
        </div>
      </template>
      <template #expansionPanels>
        <CredentialItem
          authority="CRA"
          :effectiveDate="ownedByRelationship.credential.effective_date"
        >
          <template #header>
            <div class="fake-link font-weight-bold">
              {{ getRelationshipName(ownedByRelationship) }}
            </div>
          </template>
        </CredentialItem>
      </template>
    </EntityCard>

    <!-- enitity card credential holder -->
    <EntityCard
      :expanded="credentialsExpanded"
      title="Credentials"
      ref="credentials"
    >
      <template>
        <!-- header content for the credential card -->
        <v-row>
          <v-col
            class="d-flex justify-start align-end pl-5 pt-0"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            <EntityFilterDialog />
          </v-col>
          <v-col class="d-flex justify-end align-end pr-5 pt-0">
            <div class="text-body-2">
              <span class="fake-link" @click="switchCredentialTimeOrder"
                >Sort by date</span
              >
              <v-icon
                class="icon-dense"
                dense
                v-if="credentialTimeOrder === 1"
                >{{ mdiArrowUp }}</v-icon
              >
              <v-icon class="icon-dense" dense v-else>{{
                mdiArrowDown
              }}</v-icon>
            </div>
          </v-col>
        </v-row>
        <!-- body content of the credential card -->
        <v-row>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="12"
            md="4"
            class="pa-0 elevation-2"
          >
            <EntityFilterFacetPanels />
          </v-col>
          <v-col cols="12" md="8" class="pa-5 pl-3 pt-0">
            <EntityFilterChips class="pb-2" />
            <v-timeline dense align-top class="pa-0">
              <v-timeline-item
                v-for="(cred, i) in filteredEntityCredentials"
                :key="i"
                color="#38598A"
                small
              >
                <div class="pl-3 mt-n3">
                  <div class="text-body-2 font-weight-bold mb-2">
                    {{ cred.date_effective | formatDate }}
                  </div>
                  <EntityCard
                    :expanded="credentialsExpanded"
                    :timeline="true"
                    class="pl-0 timeline-cred"
                  >
                    <template #expansionPanels>
                      <CredentialItem
                        :authority="cred.authority"
                        :expired="cred.revoked"
                        :reason="
                          cred.type === 'entity_name'
                            ? cred.registration_reason
                            : ''
                        "
                        :timeline="true"
                      >
                        <template #header>
                          <div class="text-body-2 timeline-cred-header">
                            <div v-if="cred.revoked" class="expired-credential">
                              Expired: {{ cred.revoked_date | formatDate }}
                            </div>
                            <div v-if="cred.type" class="font-weight-bold">
                              {{ entityTypeToName[cred.type] }}
                            </div>
                            <div v-if="cred.value">
                              {{ cred.value }}
                            </div>
                          </div>
                        </template>
                      </CredentialItem>
                    </template>
                  </EntityCard>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </template>
    </EntityCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VuetifyGoToTarget } from "vuetify/types/services/goto";
import { mapActions, mapGetters } from "vuex";
import {
  ICredential,
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { IFormattedTopic, ITopic } from "@/interfaces/api/v2/topic.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import { selectFirstAttrItem } from "@/utils/attribute";
import {
  getRelationshipName,
  credOrRelationshipToDisplay,
} from "@/utils/entity";
import BackToSearch from "@/components/shared/BackToSearch.vue";
import CredentialItem from "@/components/entity/CredentialItem.vue";
import EntityCard from "@/components/entity/EntityCard.vue";
import EntityHeader from "@/components/entity/EntityHeader.vue";
import EntityFilterChips from "@/components/entity/filter/EntityFilterChips.vue";
import EntityFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";
import EntityFilterDialog from "@/components/entity/filter/EntityFilterDialog.vue";
import moment from "moment";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";

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
    BackToSearch,
    CredentialItem,
    EntityCard,
    EntityHeader,
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
  getEntityFilters!: IEntityFilter;
  getRelationships!: IRelationship[];
  relationshipStartIndex!: number;
  itemsDisplayed!: number;
  loading!: boolean;
  credentialsExpanded!: boolean;

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
      credentialsExpanded: false,
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

  toggleCredentialsExpanded(): void {
    this.credentialsExpanded = !this.credentialsExpanded;
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

  get entityBusinessNumber(): string | undefined {
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
.show-all-statuses {
  cursor: pointer;
  text-decoration: underline;
  color: $input-color;
}
.tab-active {
  border-bottom: 5px solid $secondary-color;
}
.expired-credential {
  color: $error-color;
}
</style>
