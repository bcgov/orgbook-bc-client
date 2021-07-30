<template>
  <v-expansion-panels multiple flat accordion v-model="panel" class="on-bottom">
    <v-btn @click="test">TEST</v-btn>
    <SearchFilterFacetPanel :fields="topEntityTypes" :more="moreEntityTypes">
      <template v-slot:title> Authority </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel :fields="topEntityStatuses">
      <template v-slot:title> Credential type </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel>
      <template v-slot:title> Registration type </template>
    </SearchFilterFacetPanel>
    <CustomFilterFacetPanel>
      <template #title> Date effective</template>
      <template #content
        ><v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-row>
                  <v-col class="pl-0 pr-0">
                    <div class="flex-row flex-align-items-center">
                      <p>From:</p>
                    </div>
                  </v-col>
                  <v-col class="pl-0 pr-0">
                    <div class="text-body-2 float-right">
                      <v-text-field
                      v-model="date"
                      label="Picker without buttons"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pl-0 pr-0">
                    <div class="flex-row flex-align-items-center">
                      <p>From:</p>
                    </div>
                  </v-col>
                  <v-col class="pl-0 pr-0">
                    <div class="text-body-2 float-right">
                      <v-text-field
                      v-model="date"
                      label="Picker without buttons"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </template>
    </CustomFilterFacetPanel>
  </v-expansion-panels>
</template>

<script lang="ts">
import {
  ISearchFacetField,
  ISearchFacetRecord,
} from "@/interfaces/api/v4/search-topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterFacetPanel from "@/components/search/filter/SearchFilterFacetPanel.vue";
import CustomFilterFacetPanel from "@/components/entity/filter/CustomFilterFacetPanel.vue";

@Component({
  components: {
    SearchFilterFacetPanel,
    CustomFilterFacetPanel,
  },
  computed: {
    ...mapGetters(["searchTopicFacets"]),
  },
})
export default class EntityFilterFacetPanels extends Vue {
  private searchTopicFacets!: ISearchFacetRecord;
  private topTypes: string[] = [
    "Canada Revenue Agency",
    "BC Corporate Registry",
    "Liquor & Cannabis Regulation Branch",
    "Ministry of Energy, Mines and Low Carbon Innovation",
  ];
  private topStatuses: string[] = [
    "Business number",
    "BC Mines Act permit",
    "Cannabis marketing license",
    "Cannabis retail license",
    "Registration",
  ];

  data() {
    return {
      menu2: false,
      date: "",
      panel: [0, 1],
    };
  }

  private topFieldSelector(top: string[], type: string): ISearchFacetField[] {
    const fields = [] as ISearchFacetField[];
    for (const value of top) {
      const field = this.fieldSelector(type).find(
        (field) => this.fieldValueFormatter(field.value) === value
      );
      fields.push({
        value: field?.value ? this.fieldValueFormatter(field?.value) : value,
        count: field?.count || 0,
        text: field?.text || "",
      });
    }
    return fields;
  }
  test() {
    console.log(this.searchTopicFacets);
  }

  get topEntityTypes(): ISearchFacetField[] {
    return this.topFieldSelector(this.topTypes, "entity_type");
  }

  get moreEntityTypes(): ISearchFacetField[] {
    return this.fieldSelector("entity_type")
      .filter(
        (field) =>
          !this.topTypes.includes(this.fieldValueFormatter(field.value))
      )
      .map((field) => ({
        value: this.fieldValueFormatter(field?.value) || "",
        count: field?.count || 0,
        text: field?.text || "",
      }));
  }

  get topEntityStatuses(): ISearchFacetField[] {
    return this.topFieldSelector(this.topStatuses, "entity_status");
  }

  get facets(): ISearchFacetRecord {
    return this.searchTopicFacets;
  }

  get fields(): Record<string, ISearchFacetField[] | unknown> {
    return (this?.facets?.fields || {}) as Record<
      string,
      ISearchFacetField[] | unknown
    >;
  }

  get categories(): ISearchFacetField[] {
    return (this?.fields?.category || []) as ISearchFacetField[];
  }

  fieldSelector(type: string): ISearchFacetField[] {
    return (this.categories as ISearchFacetField[]).filter((cat) =>
      (cat.value as string).includes(type)
    );
  }

  fieldValueFormatter(value: string): string {
    return value.split("::")[1];
  }
}
</script>
