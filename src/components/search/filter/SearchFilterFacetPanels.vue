<template>
  <div class="search-facet-panels">
    <v-expansion-panels multiple flat accordion v-model="panels">
      <SearchFilterFacetPanel
        v-if="entityStatusFilters?.length"
        :fields="entityStatusFilters"
      >
        <template v-slot:title> Organization Status </template>
      </SearchFilterFacetPanel>
      <SearchFilterFacetPanel
        v-if="topEntityTypeFilters?.length || moreEntityTypeFilters?.length"
        :fields="topEntityTypeFilters"
        :more="moreEntityTypeFilters"
      >
        <template v-slot:title> Organization Type </template>
      </SearchFilterFacetPanel>
      <SearchFilterFacetPanel
        v-if="credentialTypeFilters?.length"
        :fields="credentialTypeFilters"
      >
        <template v-slot:title> Credential </template>
      </SearchFilterFacetPanel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterFacetPanel from "@/components/search/filter/SearchFilterFacetPanel.vue";

interface Data {
  panels: number[];
}

@Component({
  components: {
    SearchFilterFacetPanel,
  },
  computed: {
    ...mapGetters([
      "topEntityTypeFilters",
      "moreEntityTypeFilters",
      "entityStatusFilters",
      "credentialTypeFilters",
    ]),
  },
})
export default class SearchFilterFacetPanels extends Vue {
  data(): Data {
    return {
      panels: [0, 1, 2],
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
