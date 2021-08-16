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
    ...mapGetters([
      "topEntityTypes",
      "moreEntityTypes",
      "entityStatuses",
      "credentialTypes",
    ]),
  },
})
export default class SearchFilterFacetPanels extends Vue {
  data(): Data {
    return {
      panel: [0, 1, 2],
    };
  }
}
</script>
