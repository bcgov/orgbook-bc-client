<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="font-weight-bold">
      <slot name="title">{{ title }}</slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <EntityFilterFacets :filterField="filterField" :fields="fields" />
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
import { Component, Prop, Vue } from "vue-property-decorator";
import EntityFilterFacets from "@/components/entity/filter/EntityFilterFacets.vue";

interface Data {
  show: boolean;
}

@Component({
  components: {
    EntityFilterFacets,
  },
})
export default class EntityFilterFacetPanel extends Vue {
  @Prop({ default: () => [] }) filterField!: string;
  @Prop({ default: () => [] }) fields!: IEntityFacetField[];
  @Prop({ default: () => [] }) more!: IEntityFacetField[];

  data(): Data {
    return {
      show: false,
    };
  }
}
</script>
