<template>
  <v-expansion-panels multiple flat accordion v-model="panel">
    <SearchFilterFacetPanel :fields="topEntityTypes" :more="topEntityStatuses">
      <template v-slot:title> Organization Type </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel :fields="topEntityStatuses">
      <template v-slot:title> Organization Status </template>
    </SearchFilterFacetPanel>
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

interface Data {
  panel: number[];
}

@Component({
  components: {
    SearchFilterFacetPanel,
  },
  computed: {
    ...mapGetters(["searchTopicFacets"]),
  },
})
export default class SearchFilterFacetPanels extends Vue {
  private searchTopicFacets!: ISearchFacetRecord;
  private topTypes: string[] = ["BC", "CP", "GP", "S", "SP"];
  private topStatuses: string[] = ["ACT", "HIS"];

  data(): Data {
    return {
      panel: [0, 1, 2],
    };
  }

  private topFieldFormatter(top: string[], type: string): ISearchFacetField[] {
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

  get topEntityTypes(): ISearchFacetField[] {
    return this.topFieldFormatter(this.topTypes, "entity_type");
  }

  get topEntityStatuses(): ISearchFacetField[] {
    return this.topFieldFormatter(this.topStatuses, "entity_status");
  }

  get facets(): ISearchFacetRecord {
    return this.searchTopicFacets;
  }

  get fields(): Record<string, ISearchFacetField[] | unknown> {
    return this.facets.fields;
  }

  fieldSelector(type: string): ISearchFacetField[] {
    return (this.fields.category as ISearchFacetField[]).filter((cat) =>
      (cat.value as string).includes(type)
    );
  }

  fieldValueFormatter(value: string): string {
    return value.split("::")[1];
  }
}
</script>
