<template>
  <v-expansion-panels multiple flat accordion v-model="panel">
    <SearchFilterFacetPanel :fields="topEntityTypes" :more="moreEntityTypes">
      <template v-slot:title> Organization Type </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel :fields="entityStatuses">
      <template v-slot:title> Organization Status </template>
    </SearchFilterFacetPanel>
    <SearchFilterFacetPanel :fields="credentialTypes">
      <template v-slot:title> Credential </template>
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
  processField,
  topFieldSelector,
} from "@/utils/search";
import {
  entityTypeSpec,
  entityStatusSpec,
  credentialTypeSpec,
} from "@/data/search";

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

  get entityStatuses(): ISearchFilter[] {
    const options = {
      ...entityStatusSpec,
      keySelector: (filter?: ISearchFilter) =>
        fieldKeyFormatter((filter?.value || "::") as string),
      valueSelector: (filter?: ISearchFilter) =>
        fieldValueFormatter((filter?.value || "::") as string),
    };
    return (this.searchFilterFields.category as unknown as ISearchFilter[])
      .filter((filter) => options.keySelector(filter) === options.key)
      .map((filter) => processField(options, filter));
  }

  get credentialTypes(): ISearchFilter[] {
    const options = {
      ...credentialTypeSpec,
      keySelector: (filter?: ISearchFilter) => filter?.text || "",
      valueSelector: (filter?: ISearchFilter) => filter?.value || "",
    };
    return (
      this.searchFilterFields.credential_type_id as unknown as ISearchFilter[]
    ).map((filter) => processField(options, filter));
  }
}
</script>
