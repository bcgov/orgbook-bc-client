<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item
        v-for="field in fields"
        :key="field.label"
        @click="toggleSearchFilter(field)"
        class="facet-filter pa-0"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action class="mt-1 mb-2 mr-1">
            <v-simple-checkbox
              :ripple="false"
              :value="isFilterActive(searchFilters, field)"
              :input-value="active"
              @click="toggleSearchFilter(field)"
              class="checkbox"
            ></v-simple-checkbox>
          </v-list-item-action>
          <v-list-item-content class="pt-1 pb-1">
            <div>{{ $t(field.label) }}</div>
          </v-list-item-content>
          <v-list-item-action class="d-flex justify-end mt-1 mb-1">
            <div>{{ field.count }}</div>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import {
  ISearchFilter,
  ISearchQuery,
} from "@/interfaces/api/v4/search-topic.interface";
import { getFilterValue } from "@/utils/search";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["searchQuery", "searchFilters"]),
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
})
export default class SearchFilterFacets extends Vue {
  searchQuery!: ISearchQuery | null;

  @Prop({ default: () => [] }) fields!: ISearchFilter[];

  isFilterActive(filters: ISearchFilter[], field: ISearchFilter): boolean {
    return !!filters.find(
      (filter) =>
        filter.key === field.key &&
        getFilterValue(filter) === getFilterValue(field)
    );
  }
}
</script>

<style lang="scss" scoped>
.facet-filter {
  min-height: 0 !important;
}
</style>
