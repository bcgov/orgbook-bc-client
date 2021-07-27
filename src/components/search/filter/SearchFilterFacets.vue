<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item v-for="field in fields" :key="field.value">
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <div>{{ field.value }}</div>
          </v-list-item-content>
          <v-list-item-action>
            <div>{{ field.count }}</div>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { ISearchFacetField } from "@/interfaces/api/v4/search-topic.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SearchFilterFacets extends Vue {
  @Prop({ default: () => [] }) fields!: ISearchFacetField[];
}
</script>
