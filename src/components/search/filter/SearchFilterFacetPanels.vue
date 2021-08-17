<template>
  <div v-if="searchFilterFields.length" class="search-facet-panels">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterFacetPanel from "@/components/search/filter/SearchFilterFacetPanel.vue";
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";

interface Data {
  panel: number[];
}

@Component({
  components: {
    SearchFilterFacetPanel,
  },
  computed: {
    ...mapGetters([
      "topEntityTypes",
      "moreEntityTypes",
      "entityStatuses",
      "credentialTypes",
    ]),
  },
})
export default class SearchFilterFacetPanels extends Vue {
  searchFilters!: ISearchFilter[];
  topEntityTypes!: ISearchFilter[];
  moreEntityTypes!: ISearchFilter[];
  entityStatuses!: ISearchFilter[];
  credentialTypes!: ISearchFilter[];

  get searchFilterFields(): ISearchFilter[] {
    return [
      ...this.topEntityTypes,
      ...this.moreEntityTypes,
      ...this.entityStatuses,
      ...this.credentialTypes,
    ];
  }
  data(): Data {
    return {
      panel: [0, 1, 2],
    };
  }
}
</script>

<style lang="scss" scoped>
.search-facet-panels {
  height: 100%;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  box-shadow: 3px 3px 6px -3px $border-color;
}
</style>
