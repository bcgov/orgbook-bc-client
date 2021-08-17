<template>
  <v-row>
    <v-col class="pl-0 pr-0">
      <v-chip
        v-for="field of activeSearchFilters"
        :key="field.key"
        outlined
        close
        close-icon="mdi-close"
        class="ma-1"
        @click:close="toggleSearchFilter(field)"
      >
        {{ $t(field.label) }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import { isFilterActive } from "@/utils/search";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters([
      "topEntityTypes",
      "moreEntityTypes",
      "entityStatuses",
      "credentialTypes",
      "searchFilters",
    ]),
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
})
export default class SearchFilterChips extends Vue {
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

  get activeSearchFilters(): ISearchFilter[] {
    return this.searchFilterFields.filter((field) =>
      isFilterActive(this.searchFilters, field)
    );
  }
}
</script>
