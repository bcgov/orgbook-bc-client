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
        <div v-if="field.translated">{{ field.label }}</div>
        <div v-else v-t="field.label"></div>
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
    ...mapGetters(["extendedSearchFilterFields", "searchFilters"]),
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
})
export default class SearchFilterChips extends Vue {
  extendedSearchFilterFields!: ISearchFilter[];
  searchFilters!: ISearchFilter[];

  get activeSearchFilters(): ISearchFilter[] {
    return this.extendedSearchFilterFields.filter((field) =>
      isFilterActive(this.searchFilters, field)
    );
  }
}
</script>
