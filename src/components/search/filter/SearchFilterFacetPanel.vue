<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="font-weight-bold">
      <slot name="title">{{ title }}</slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <SearchFilterFacets class="pt-0" :fields="fields" />
      <template v-if="more.length">
        <a class="d-flex align-center justify-center" @click="show = !show"
          ><span v-if="show">Show less</span><span v-else>Show more</span></a
        >
        <SearchFilterFacets v-if="show" :fields="more" />
      </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import SearchFilterFacets from "@/components/search/filter/SearchFilterFacets.vue";

interface Data {
  show: boolean;
}

@Component({
  components: {
    SearchFilterFacets,
  },
})
export default class SearchFilterFacetPanel extends Vue {
  @Prop({ default: () => [] }) fields!: ISearchFilter[];
  @Prop({ default: () => [] }) more!: ISearchFilter[];

  data(): Data {
    return {
      show: false,
    };
  }
}
</script>
