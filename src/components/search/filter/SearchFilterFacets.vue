<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item
        v-for="field in fields"
        :key="field.label"
        @click="toggleSearchFilter(field)"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <div>{{ field.label }}</div>
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
import {
  ISearchFilter,
  ISearchQuery,
} from "@/interfaces/api/v4/search-topic.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["searchQuery", "searchFilter"]),
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
})
export default class SearchFilterFacets extends Vue {
  searchQuery!: ISearchQuery | null;

  @Prop({ default: () => [] }) fields!: ISearchFilter[];
}
</script>
