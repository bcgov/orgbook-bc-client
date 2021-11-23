<template>
  <div v-if="!loading">
    <BackTo />
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

    <!-- topic -->
    <EntityCard ref="registration" :expanded="credentialsExpanded">
      <template #expansionPanels>
        <CredentialItem
          :authority="entityRegistrationIssuer"
          :authorityLink="entityRegistrationIssuerUrl"
          :effectiveDate="entityEffectiveDate"
          :credId="entityNameCredId"
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
            <Dialog>
              <template #activator
                ><span class="fake-link" v-t="entityJurisdiction"></span
                ><v-icon class="fake-link">{{
                  mdiInformationOutline
                }}</v-icon></template
              >
              <template #content>
                <div v-html="entityDesc.html"></div>
              </template>
            </Dialog>
          </div>
          <div class="text-body-2">
            <div>
              {{
                `${entityTypeToRegValue(
                  $t(entityJurisdiction)
                )}: ${entityIncorporationNumber} `
              }}
            </div>
            <div>Registered on: {{ entityRegistrationDate | formatDate }}</div>
            <div>
              Business name effective: {{ entityEffectiveDate | formatDate }}
            </div>
          </div>
        </div>
      </template>
    </EntityCard>

    <!-- relationships related to -->
    <EntityCard
      ref="relationships"
      :expanded="credentialsExpanded"
      v-if="businessAsRelationship.length > 0"
    >
      <template #title>
        <div class="flex">
          Relationships
          <Dialog>
            <template #activator>
              <span class="fake-link"
                ><v-icon>{{ mdiInformationOutline }}</v-icon></span
              ></template
            >
            <template #content>
              <h3>Relationships:</h3>
              <p>
                The organizational connections between this credential and other
                credentials. An example relationship in OrgBook BC is one
                registered organization “Doing Business As” another.
              </p>
            </template>
          </Dialog>
        </div>
      </template>
      <template #subtitle>
        <div class="pl-5 pr-5 mb-5 text-body-2">
          <p>{{ entityName }} is doing business as:</p>
        </div>
      </template>
      <template #expansionPanels>
        <CredentialItem
          v-for="(_, i) in Math.min(
            businessAsRelationship.length - relationshipStartIndex,
            itemsDisplayed
          )"
          :key="i"
          :expired="
            businessAsRelationship[i + relationshipStartIndex].credential
              .revoked
          "
          :authority="
            credOrRelationshipToDisplay(
              businessAsRelationship[i + relationshipStartIndex],
              credSet
            ).authority
          "
          :authorityLink="
            credOrRelationshipToDisplay(
              businessAsRelationship[i + relationshipStartIndex],
              credSet
            ).authorityLink
          "
          :effectiveDate="
            businessAsRelationship[i + relationshipStartIndex].credential
              .effective_date
          "
          :credId="
            businessAsRelationship[i + relationshipStartIndex].credential.id
          "
        >
          <template #header>
            <div class="text-body-2 timeline-cred-header">
              <div
                v-if="
                  businessAsRelationship[i + relationshipStartIndex].credential
                    .revoked
                "
                class="expired-credential"
              >
                Expired:
                {{
                  businessAsRelationship[i + relationshipStartIndex].credential
                    .revoked_date | formatDate
                }}
              </div>
              <h3>
                <span class="fake-link">{{
                  getRelationshipName(
                    businessAsRelationship[i + relationshipStartIndex]
                  )
                }}</span>
              </h3>
            </div>
          </template>
        </CredentialItem>
      </template>
      <template #footer>
        <div
          :class="{
            'pa-5 d-flex': true,
            'align-right': $vuetify.breakpoint.lgAndUp,
          }"
        >
          <span class="text-body-2">
            <v-row>
              <v-col
                v-if="!$vuetify.breakpoint.lgAndUp"
                class="pb-0"
                cols="12"
                sm="12"
                lg="3"
              >
                <p class="mb-0">Items displayed</p>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                :class="{
                  'aligned pl-0': $vuetify.breakpoint.lgAndUp,
                  'pt-0': !$vuetify.breakpoint.lgAndUp,
                }"
              >
                <v-row class="align-right">
                  <v-col
                    v-if="$vuetify.breakpoint.lgAndUp"
                    class="aligned"
                    lg="3"
                  >
                    <p>Items displayed</p>
                  </v-col>
                  <v-col class="pl-0" cols="4" sm="2" lg="3">
                    <v-select
                      v-model="itemsDisplayed"
                      class="pt-0 mt-0 aligned"
                      :items="[5, 10, 25, 100]"
                    ></v-select>
                  </v-col>
                  <v-col cols="8" sm="10" lg="4">
                    {{ relationshipStartIndex + 1 }} -
                    {{
                      Math.min(
                        Math.min(
                          itemsDisplayed,
                          businessAsRelationship.length
                        ) + relationshipStartIndex,
                        businessAsRelationship.length
                      )
                    }}
                    of {{ businessAsRelationship.length }}
                    <v-btn icon @click="incRelationshipStartIndex(-1)">
                      <v-icon>{{ mdiChevronLeft }}</v-icon>
                    </v-btn>
                    <v-btn icon @click="incRelationshipStartIndex(1)">
                      <v-icon>{{ mdiChevronRight }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </span>
        </div>
      </template>
    </EntityCard>

    <!-- relationships related from -->
    <EntityCard
      ref="relationships"
      :expanded="credentialsExpanded"
      v-if="ownedByRelationship"
    >
      <template #title>
        <div class="flex">
          Relationships
          <Dialog>
            <template #activator>
              <span class="fake-link"
                ><v-icon>{{ mdiInformationOutline }}</v-icon></span
              >
            </template>
            <template #content>
              <h3>Relationships:</h3>
              <p>
                The organizational connections between this credential and other
                credentials. An example relationship in OrgBook BC is one
                registered organization “Doing Business As” another.
              </p>
            </template>
          </Dialog>
        </div>
      </template>
      <template #subtitle>
        <div class="pl-5 pr-5 mb-5 text-body-2">
          {{ entityName }} is owned by:
        </div>
      </template>
      <template #expansionPanels>
        <CredentialItem
          :authority="
            credOrRelationshipToDisplay(ownedByRelationship, credSet).authority
          "
          :authorityLink="
            credOrRelationshipToDisplay(ownedByRelationship, credSet)
              .authorityLink
          "
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

    <!-- credential timeline -->
    <EntityCard :expanded="credentialsExpanded" ref="credentials">
      <template #title>
        <div class="flex">
          Credentials
          <Dialog>
            <template #activator>
              <span class="fake-link"
                ><v-icon>{{ mdiInformationOutline }}</v-icon></span
              ></template
            >
            <template #content>
              <h3>Credential:</h3>
              <p>
                Something that details a qualification, registration or
                authority of an organization. An example of a credential in
                OrgBook BC is the Business Number credential for a registered
                corporation.
              </p>
            </template>
          </Dialog>
        </div>
      </template>
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
            class="pa-0"
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
                      <CredentialItem :cred="cred" :timeline="true">
                        <template #header>
                          <div class="text-body-2 timeline-cred-header">
                            <div v-if="cred.revoked" class="expired-credential">
                              Expired: {{ cred.revoked_date | formatDate }}
                            </div>
                            <div
                              v-if="cred.registration_reason"
                              class="font-weight-bold"
                              v-t="cred.registration_reason"
                            ></div>
                            <div
                              v-else-if="
                                cred.relationship_types &&
                                cred.relationship_types.length
                              "
                            >
                              <div class="font-weight-bold">
                                DBA name registered
                              </div>
                            </div>
                            <div v-else>
                              <div class="font-weight-bold">
                                {{ getCredentialLabel(cred) }}
                              </div>
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
  getCredentialLabel,
} from "@/utils/entity";
import BackTo from "@/components/shared/BackTo.vue";
import CredentialItem from "@/components/entity/CredentialItem.vue";
import EntityCard from "@/components/entity/EntityCard.vue";
import EntityHeader from "@/components/entity/EntityHeader.vue";
import EntityFilterChips from "@/components/entity/filter/EntityFilterChips.vue";
import EntityFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";
import EntityFilterDialog from "@/components/entity/filter/EntityFilterDialog.vue";
import moment from "moment";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";
import { ITopicName } from "@/interfaces/api/v2/topic.interface";
import Dialog from "@/components/shared/Dialog.vue";
import { IEntityDesc } from "@/interfaces/entity-desc";

interface Data {
  currentTab: string;
  credentialTimeOrder: number;
  itemsDisplayed: number;
  relationshipStartIndex: number;
  credentialsExpanded: boolean;
}

@Component({
  components: {
    BackTo,
    CredentialItem,
    Dialog,
    EntityCard,
    EntityHeader,
    EntityFilterChips,
    EntityFilterFacetPanels,
    EntityFilterDialog,
  },
  computed: {
    ...mapGetters([
      "credentialTypes",
      "entityDesc",
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
      "mdiInformationOutline",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchCredentialTypes",
      "fetchFormattedIdentifiedTopic",
      "fetchTopicFullCredentialSet",
      "setCredentialType",
      "setEntityDesc",
      "setRegistrationType",
      "setIssuers",
      "fetchRelationships",
    ]),
  },
})
export default class EntityResult extends Vue {
  setLoading!: (loading: boolean) => void;
  currentTab!: string;
  entityDesc!: IEntityDesc;
  setEntityDesc!: (name: string) => void;
  setIssuers!: (creds: ICredentialDisplayType[]) => void;
  setCredentialType!: (creds: ICredentialDisplayType[]) => void;
  setRegistrationType!: (creds: ICredentialDisplayType[]) => void;
  fetchRelationships!: (id: number) => Promise<void>;
  fetchCredentialTypes!: (paging: boolean) => Promise<void>;

  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  fetchTopicFullCredentialSet!: (id: number) => Promise<void>;
  credOrRelationshipToDisplay = credOrRelationshipToDisplay;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  selectedTopic!: IFormattedTopic;
  credentialTimeOrder!: number;
  getEntityFilters!: IEntityFilter;
  getRelationships!: IRelationship[];
  relationshipStartIndex!: number;
  itemsDisplayed!: number;
  loading!: boolean;
  credentialsExpanded!: boolean;

  credentialFilters: {
    (creds: Array<ICredentialDisplayType>): Array<ICredentialDisplayType>;
  }[] = [
    this.applyDateFilter,
    this.applyExpiredFilter,
    this.applyCredentialTypeFilter,
    this.applyIssuerFilter,
    this.applyRegistrationTypeFilter,
  ];
  getRelationshipName = getRelationshipName;
  getCredentialLabel = getCredentialLabel;

  data(): Data {
    return {
      currentTab: "",
      credentialTimeOrder: 1,
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
    if (this.entityJurisdiction) {
      //convert entity type to file name
      let fname = this.$t(this.entityJurisdiction) as string;
      fname = fname.toLowerCase().replace(" ", "-");
      this.setEntityDesc(fname);
    }
  }

  toggleCredentialsExpanded(): void {
    this.credentialsExpanded = !this.credentialsExpanded;
  }

  private applyIssuerFilter(creds: Array<ICredentialDisplayType>) {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.authorities as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter((cred) =>
      (this.getEntityFilters.authorities as string[]).includes(cred.authority)
    );
  }

  private applyCredentialTypeFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.credential_type as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter((cred) =>
      (this.getEntityFilters.credential_type as string[]).includes(
        getCredentialLabel(cred)
      )
    );
  }

  private applyRegistrationTypeFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];
    if ((this.getEntityFilters.registration_type as string[]).length <= 0) {
      return filteredCreds;
    }
    return filteredCreds.filter(
      (cred) =>
        cred.registration_reason !== undefined &&
        (this.getEntityFilters.registration_type as string[]).includes(
          cred.registration_reason
        )
    );
  }

  private applyDateFilter(
    creds: Array<ICredentialDisplayType>
  ): Array<ICredentialDisplayType> {
    var filteredCreds = [...creds];

    if (this.getEntityFilters.date_min !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        //take the negative condition so we don't have to do another check with isSame
        return !moment(this.getEntityFilters.date_min as string).isAfter(
          cred.date_effective
        );
      });
    }

    if (this.getEntityFilters.date_max !== "") {
      filteredCreds = filteredCreds.filter((cred) => {
        return !moment(this.getEntityFilters.date_max as string).isBefore(
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
    if (!this.getEntityFilters.show_expired) {
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

  entityTypeToRegValue(entityType: string): string {
    const entityTypeTable: Record<string, string> = {
      "BC Company": "Incorporation number",
      "BC Corporation": "Incorporation number",
      Society: "Incorporation number",
      Cooperative: "Incorporation number",
      "Sole Proprietorship": "Registration number",
      "General Partnership": "Registration number",
      "Limited Partnership": "Registration number",
      "Extraprovincial Limited Partnership": "Registration number",
      "Limited Liability Partnership": "Registration number",
      "Extrapro Limited Liability Partnership": "Registration number",
      "Miscellaneous Firm": "Registration number",
    };
    return entityTypeTable[entityType] !== undefined
      ? entityTypeTable[entityType]
      : entityType;
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
      this.selectedTopic?.names as ITopicName[]
    )?.text;
  }

  get entityNameCredId(): number | undefined {
    const ret = selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names as ITopicName[]
    )?.credential_id;
    return ret;
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

  get credSet(): ICredential[] | undefined {
    if (!this.selectedTopicFullCredentialSet) {
      return undefined;
    }
    var credentialSet: ICredential[] = [];
    this.selectedTopicFullCredentialSet.forEach((credSet) =>
      credentialSet.push(...credSet.credentials)
    );
    return credentialSet;
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
      fullCredentials.push(credOrRelationshipToDisplay(rel, this.credSet));
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

    const ret = state?.type + "." + state?.value;
    if (ret.includes("undefined")) {
      return undefined;
    }
    return ret;
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
      { key: "type", value: "entity_type" },
      this.selectedTopic?.attributes
    );
    const ret = "entity_type." + state?.value;
    if (ret.includes("undefined")) {
      return undefined;
    }
    return ret;
  }

  get entityRegistrationIssuer(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.issuer?.name;
  }

  get entityRegistrationIssuerUrl(): string | URL | undefined {
    const ret = selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.issuer?.url;
    return ret;
  }

  async created(): Promise<void> {
    this.setLoading(true);
    const { sourceId } = this.$route.params;

    if (sourceId) {
      await this.fetchFormattedIdentifiedTopic({
        sourceId,
        type: "registration.registries.ca",
      });
      if (!this.selectedTopic) {
        //sourceid is invalid, go back to search
        console.error("Failed to fetch topic. Invalid source id");
        this.$router.push("/");
      }
      const topic: ITopic = this.$store.getters.selectedTopic;
      if (topic?.id) {
        await Promise.all([
          this.fetchRelationships(topic.id),
          this.fetchTopicFullCredentialSet(topic.id),
          this.fetchCredentialTypes(false),
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
.progress {
  color: $secondary-color;
}
.flex {
  display: flex;
}
.aligned {
  display: flex;
  align-items: center;
}
.align-right {
  display: flex;
  justify-content: right;
  justify-items: right;
}
</style>
