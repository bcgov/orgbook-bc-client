<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="font-weight-bold">
      <slot name="title">{{ title }}</slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <EntityFilterFacets
        :entityType="entityType"
        :filterField="filterField"
        :fields="fields"
      />
      <template v-if="more.length">
        <span
          class="flex-row flex-align-items-center justify-center fake-link"
          @click="show = !show"
          ><span v-if="show">Show less</span><span v-else>Show more</span></span
        >
        <EntityFilterFacets v-if="show" :fields="more" />
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { IEntityFacetField } from "@/interfaces/entity-filter.interface";

import EntityFilterFacets from "@/components/entity/filter/EntityFilterFacets.vue";

interface Data {
  show: boolean;
}

export default {
        data(): Data {
                return {
                        show: false,
                }
        },
        components: {
                EntityFilterFacets,
        },
        props: {
                entityType: {
                        type: String,
                        default: "",
                },
                filterField: {
                        type: String,
                        default: () => [],
                },
                fields: {
                        type:  Array<IEntityFacetField>,
                        default: () => [],
                },
                more: {
                        type: Array<IEntityFacetField>,
                        default: () => [],
                }
        }
}
</script>
