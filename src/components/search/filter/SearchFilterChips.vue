<template>
  <v-row>
    <v-col class="pl-0 pr-0">
      <v-chip
        v-for="field of activeSearchFilters"
        :key="field.key"
        variant="outlined"
        closable
        :close-icon="mdiClose"
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
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapGetters(["extendedSearchFilterFields", "searchFilters", "mdiClose"]),
    activeSearchFilters(): ISearchFilter[] {
      return this.extendedSearchFilterFields.filter((field: ISearchFilter) =>
        isFilterActive(this.searchFilters, field)
      );
    },
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
});
</script>
