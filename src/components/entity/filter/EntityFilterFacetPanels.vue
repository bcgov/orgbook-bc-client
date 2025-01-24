<template>
  <div class="entity-facet-panels">
    <v-expansion-panels
      multiple
      flat
      accordion
      v-model="panels"
      class="on-bottom"
    >
      <EntityFilterFacetPanel
        v-if="getAuthorities?.length"
        filterField="authorities"
        :fields="getAuthorities"
      >
        <template v-slot:title>
          <div class="flex">
            Authority
            <Dialog>
              <template #activator>
                <v-icon small class="mx-1">{{ mdiInformationOutline }}</v-icon>
              </template>
              <template #content>
                <h3>Authority:</h3>
                <p>
                  The organization that issued the credential to OrgBook BC. An
                  example of an authority in OrgBook BC is BC Registries, the
                  issuer of Registrations, Business Numbers, and more.
                </p>
              </template>
            </Dialog>
          </div>
        </template>
      </EntityFilterFacetPanel>
      <EntityFilterFacetPanel
        v-if="getCredentialTypes?.length"
        filterField="credential_type"
        :fields="getCredentialTypes"
      >
        <template v-slot:title>
          <div class="flex">
            Credential type
            <Dialog>
              <template #activator>
                <v-icon small class="mx-1">{{ mdiInformationOutline }}</v-icon>
              </template>
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
      </EntityFilterFacetPanel>
      <EntityFilterFacetPanel
        v-if="getRegistrationTypes?.length"
        filterField="registration_type"
        :entityType="entityType"
        :fields="getRegistrationTypes"
      >
        <template v-slot:title>
          <div class="flex">
            Registration type
            <Dialog>
              <template #activator>
                <v-icon small class="mx-1">{{
                  mdiInformationOutline
                }}</v-icon></template
              >
              <template #content>
                <h3>Registration type:</h3>
                <p>
                  How an organization is legally registered in British Columbia.
                  For example, an organization in OrgBook BC may be legally
                  registered as a Sole Proprietorship.
                </p>
              </template>
            </Dialog>
          </div>
        </template>
      </EntityFilterFacetPanel>
      <CustomFilterFacetPanel>
        <template #title>
          <div class="flex">
            Date effective
            <Dialog>
              <template #activator>
                <v-icon small class="mx-1">{{
                  mdiInformationOutline
                }}</v-icon></template
              >
              <template #content>
                <h3>Date effective:</h3>
                <p>
                  The date that a credential became effective. An effective
                  credential is one that is considered valid and usable.
                </p>
              </template>
            </Dialog>
          </div>
        </template>
        <template #content>
          <div class="pt-2 pb-2">
            <v-menu
              v-model="menuFrom"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="text-body-2 float-middle">
                  <v-text-field
                    dense
                    outlined
                    readonly
                    clearable
                    label="From:"
                    :value="getEntityFilters['date_min']"
                    :append-icon="mdiCalendar"
                    @click:clear="resetMinDate"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                :value="
                  isEntityFilterActive('date_min', getEntityFilters)
                    ? fromDate
                    : ''
                "
                @input="menuFrom = false"
                @change="handleMinDateChange"
                header-color="#38598A"
              ></v-date-picker>
            </v-menu>
            <v-menu
              v-model="menuTo"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <div class="text-body-2 float-middle">
                  <v-text-field
                    dense
                    outlined
                    readonly
                    clearable
                    label="To:"
                    :value="getEntityFilters['date_max']"
                    :append-icon="mdiCalendar"
                    @click:clear="resetMaxDate"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                @input="menuTo = false"
                @change="handleMaxDateChange"
                header-color="#38598A"
              ></v-date-picker>
            </v-menu>
          </div>
        </template>
      </CustomFilterFacetPanel>
      <CustomFilterFacetPanel>
        <template #title>
          <div class="flex">
            Show Inactive Credentials
            <Dialog>
              <template #activator>
                <v-icon small class="mx-1">{{
                  mdiInformationOutline
                }}</v-icon></template
              >
              <template #content>
                <h3>Expired credential:</h3>
                <p>
                  An expired credential is one that has an expiry date before
                  the current date, or has been revoked by the credential
                  issuer.
                </p>
              </template>
            </Dialog>
          </div>
        </template>
        <template #content>
          <v-list class="pt-2 pb-2" flat>
            <v-list-item-group multiple active-class="">
              <v-list-item
                class="facet-filter pa-0"
                @click="
                  toggleShowExpired(
                    isEntityFilterActive('show_expired', getEntityFilters)
                  )
                "
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action class="mt-1 mb-1 mr-1">
                    <v-simple-checkbox
                      :ripple="false"
                      :input-value="active"
                      :value="
                        isEntityFilterActive('show_expired', getEntityFilters)
                      "
                      @click="
                        toggleShowExpired(
                          isEntityFilterActive('show_expired', getEntityFilters)
                        )
                      "
                      class="checkbox"
                    ></v-simple-checkbox>
                  </v-list-item-action>
                  <v-list-item-content class="pt-1 pb-1">
                    <div>Show Inactive Credentials</div>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </CustomFilterFacetPanel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { mapState, mapActions as pmapActions } from "pinia";
import { useEntityState } from "@/stores";

import {
  IEntityFacetField,
  IEntityFilter,
} from "@/interfaces/entity-filter.interface";

import { isEntityFilterActive } from "@/utils/entity";

import Dialog from "@/components/shared/Dialog.vue";
import CustomFilterFacetPanel from "@/components/entity/filter/CustomFilterFacetPanel.vue";
import EntityFilterFacetPanel from "@/components/entity/filter/EntityFilterFacetPanel.vue";

interface Data {
  menuFrom: boolean;
  menuTo: boolean;
  fromDate: string;
  toDate: string;
  panels: number[];
}

export default {
        props: {
                entityType: {
                        type: String,
                        default: ""
                }
        },
        data(): Data {
                return {
                        menuFrom: false,
                        menuTo: false,
                        fromDate: "",
                        toDate: "",
                        panels: [0, 1, 2, 4],
                };
        },
        computed: {
                ...mapGetters({
                        mdiCalendar: "mdiCalendar",
                        mdiInformationOutline: "mdiInformationOutline",
                }),
                ...mapState(useEntityState, [
                        "getAuthorities",
                        "getCredentialTypes",
                        "getRegistrationTypes",
                        "getEntityFilters",
                ])
        },
        methods: {
                isEntityFilterActive,
                ...pmapActions(useEntityState, ["setFilter"]),
                toggleShowExpired(newVal: boolean): void {
                        var currFilters = { ...this.getEntityFilters };
                        currFilters.show_expired = !newVal;
                        this.setFilter(currFilters);
                },
                resetMinDate(): void {
                        var currFilters = { ...this.getEntityFilters };
                        currFilters.date_min = "";
                        this.setFilter(currFilters);
                },
                resetMaxDate(): void {
                        var currFilters = { ...this.getEntityFilters };
                        currFilters.date_max = "";
                        this.setFilter(currFilters);
                },
                handleMinDateChange(newVal: string): void {
                        var currFilters = { ...this.getEntityFilters };
                        currFilters.date_min = newVal;
                        this.setFilter(currFilters);
                },
                handleMaxDateChange(newVal: string): void {
                        var currFilters = { ...this.getEntityFilters };
                        currFilters.date_max = newVal;
                        this.setFilter(currFilters);
                }

        }
}
</script>

<style lang="scss" scoped>
.date-color {
  color: $error-color;
}
.entity-facet-panels {
  height: 100%;
  border-right: 1px solid $border-color;
  box-shadow: 3px 3px 6px -3px $border-color;
}
.facet-filter {
  min-height: 0 !important;
}
.flex {
  display: flex;
  align-items: center;
}
</style>
