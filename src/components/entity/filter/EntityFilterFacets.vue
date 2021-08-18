<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item v-for="field in fields" :key="field.value">
        <template v-slot>
          <v-list-item-action>
            <v-simple-checkbox class="checkbox"
              @click="toggleEntityFilter({filterString:field.text, filterField:filterField})"
              :value="isEntityFilterActive(filterField, getEntityFilters, field.text)"
              :input-value="active"
            ></v-simple-checkbox>
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
import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface";
import { Filter } from "@/store/modules/entityFilter";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import { isEntityFilterActive } from "@/utils/entityFilter"

@Component({
  computed: {
    ...mapGetters(["getEntityFilters"]),
  },
  methods: {
    ...mapActions(["toggleEntityFilter"]),
  },
})
export default class EntityFilterFacets extends Vue {
  @Prop({ default: () => [] }) filterField!: string;
  @Prop({ default: () => [] }) fields!: IEntityFacetField[];
  getEntityFilters!: Filter;
  isEntityFilterActive: (filterField: string, getEntityFilters: Filter, filterString?: string) => boolean = isEntityFilterActive;
}
</script>
