<template>
  <v-expansion-panels multiple flat accordion v-model="panel" class="on-bottom">
    <SearchFilterFacetPanel :fields="topEntityTypes" :more="moreEntityTypes">
      <template v-slot:title> Organization Type </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel :fields="topEntityStatuses">
      <template v-slot:title> Organization Status </template>
    </SearchFilterFacetPanel>
  </v-expansion-panels>
</template>

<script lang="ts">
import {
  ISearchFilter,
  ISearchFilterFieldRecord,
} from "@/interfaces/api/v4/search-topic.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterFacetPanel from "@/components/search/filter/SearchFilterFacetPanel.vue";
import {
  fieldKeyFormatter,
  fieldValueFormatter,
  moreFieldSelector,
  topFieldSelector,
} from "@/utils/search";
import { entityTypeSpec, entityStatusSpec } from "@/data/search";

interface Data {
  panel: number[];
}

@Component({
  components: {
    SearchFilterFacetPanel,
  },
  computed: {
    ...mapGetters(["searchFilterFields"]),
  },
})
export default class SearchFilterFacetPanels extends Vue {
  private searchFilterFields!: ISearchFilterFieldRecord;
  private topTypes: string[] = ["BC", "CP", "GP", "S", "SP"];
  private topStatuses: string[] = ["ACT", "HIS"];

  data(): Data {
    return {
      panel: [0, 1, 2],
    };
  }

  get topEntityTypes(): ISearchFilter[] {
    return topFieldSelector(
      {
        ...entityTypeSpec,
        inclusions: this.topTypes,
        keySelector: (filter?: ISearchFilter) =>
          fieldKeyFormatter((filter?.value || "::") as string),
        valueSelector: (filter?: ISearchFilter) =>
          fieldValueFormatter((filter?.value || "::") as string),
      },
      this.searchFilterFields.category as unknown as ISearchFilter[]
    );
  }

  get moreEntityTypes(): ISearchFilter[] {
    return moreFieldSelector(
      {
        ...entityTypeSpec,
        exclusions: this.topTypes,
        keySelector: (filter?: ISearchFilter) =>
          fieldKeyFormatter((filter?.value || "::") as string),
        valueSelector: (filter?: ISearchFilter) =>
          fieldValueFormatter((filter?.value || "::") as string),
      },
      this.searchFilterFields.category as unknown as ISearchFilter[]
    );
  }

  get topEntityStatuses(): ISearchFilter[] {
    return topFieldSelector(
      {
        ...entityStatusSpec,
        inclusions: this.topStatuses,
        keySelector: (filter?: ISearchFilter) =>
          fieldKeyFormatter((filter?.value || "::") as string),
        valueSelector: (filter?: ISearchFilter) =>
          fieldValueFormatter((filter?.value || "::") as string),
      },
      this.searchFilterFields.category as unknown as ISearchFilter[]
    );
  }
}
</script>
