<template>
  <v-expansion-panels multiple flat accordion v-model="panel" class="on-bottom">
    <EntityFilterFacetPanel filterField="Authorities" :fields="getAuthorities">
      <template v-slot:title> Authority </template>
    </EntityFilterFacetPanel>
    <EntityFilterFacetPanel
      filterField="Credential_type"
      :fields="getCredentialTypes"
    >
      <template v-slot:title> Credential type </template>
    </EntityFilterFacetPanel>
    <EntityFilterFacetPanel
      filterField="Registration_type"
      :fields="getRegistrationTypes"
    >
      <template v-slot:title> Registration type </template>
    </EntityFilterFacetPanel>
    <CustomFilterFacetPanel>
      <template #title> Date effective</template>
      <template #content>
        <v-row>
          <v-col cols="12" sm="12">
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
                    :value="getEntityFilters['Date_min']"
                    label="From:"
                    :append-icon="mdiCalendar"
                    readonly
                    clearable
                    @click:clear="resetMinDate"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                :value="
                  isEntityFilterActive('Date_min', getEntityFilters)
                    ? fromDate
                    : ''
                "
                @input="menuFrom = false"
                @change="handleMinDateChange"
                header-color="#38598A"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12">
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
                    :value="getEntityFilters['Date_max']"
                    label="To:"
                    :append-icon="mdiCalendar"
                    readonly
                    clearable
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
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </template>
    </CustomFilterFacetPanel>

    <CustomFilterFacetPanel>
      <template #title>Show Expired</template>
      <template #content>
        <v-container>
          <v-col>
            <p>
              Show Expired
              <v-switch
                :input-value="
                  isEntityFilterActive('Show_expired', getEntityFilters)
                "
                :value="isEntityFilterActive('Show_expired', getEntityFilters)"
                @change="handleSwitchChange"
              ></v-switch>
            </p>
          </v-col>
        </v-container>
      </template>
    </CustomFilterFacetPanel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { IEntityFacetField } from "@/interfaces/entity-filter.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import EntityFilterFacetPanel from "@/components/entity/filter/EntityFilterFacetPanel.vue";
import CustomFilterFacetPanel from "@/components/entity/filter/CustomFilterFacetPanel.vue";
import { Filter } from "@/store/modules/entity";
import { isEntityFilterActive } from "@/utils/entity";

interface Data {
  menuFrom: boolean;
  menuTo: boolean;
  fromDate: string;
  toDate: string;
  panel: number[];
}

@Component({
  components: {
    EntityFilterFacetPanel,
    CustomFilterFacetPanel,
  },
  computed: {
    ...mapGetters([
      "searchTopicFacets",
      "getAuthorities",
      "getCredentialTypes",
      "getRegistrationTypes",
      "getEntityFilters",
      "mdiCalendar",
    ]),
  },
  methods: {
    ...mapActions(["setFilter"]),
  },
})
export default class EntityFilterFacetPanels extends Vue {
  private getAuthorities!: Array<IEntityFacetField>;
  private getCredentialTypes!: Array<IEntityFacetField>;
  private getRegistrationTypes!: Array<IEntityFacetField>;
  getEntityFilters!: Filter;
  setFilter!: (filter: Filter) => void;
  isEntityFilterActive: (
    filterField: string,
    getEntityFilters: Filter,
    filterString?: string
  ) => boolean = isEntityFilterActive;
  data(): Data {
    return {
      menuFrom: false,
      menuTo: false,
      fromDate: "",
      toDate: "",
      panel: [0, 1, 4],
    };
  }
  handleSwitchChange(newVal: boolean): void {
    var currFilters = { ...this.getEntityFilters };
    currFilters.Show_expired = newVal;
    this.setFilter(currFilters);
  }
  resetMinDate(): void {
    var currFilters = { ...this.getEntityFilters };
    currFilters.Date_min = "";
    this.setFilter(currFilters);
  }
  resetMaxDate(): void {
    var currFilters = { ...this.getEntityFilters };
    currFilters.Date_max = "";
    this.setFilter(currFilters);
  }
  handleMinDateChange(newVal: string): void {
    var currFilters = { ...this.getEntityFilters };
    currFilters.Date_min = newVal;
    this.setFilter(currFilters);
  }
  handleMaxDateChange(newVal: string): void {
    var currFilters = { ...this.getEntityFilters };
    currFilters.Date_max = newVal;
    this.setFilter(currFilters);
  }
}
</script>

<style scoped>
.date-color {
  color: red;
}
</style>
