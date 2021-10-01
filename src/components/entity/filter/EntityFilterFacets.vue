<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item
        v-for="field in fields"
        :key="field.value"
        @click="
          toggleEntityFilter({
            filterString: field.value,
            filterField: filterField,
          })
        "
        class="facet-filter pa-0"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action class="mt-1 mb-1 mr-1">
            <v-simple-checkbox
              :ripple="false"
              :input-value="active"
              :value="
                isEntityFilterActive(filterField, getEntityFilters, field.value)
              "
              @click="
                toggleEntityFilter({
                  filterString: field.value,
                  filterField: filterField,
                })
              "
              class="checkbox"
            ></v-simple-checkbox>
          </v-list-item-action>
          <v-list-item-content class="pt-1 pb-1" v-t="field.value">
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import {
  IEntityFacetField,
  IEntityFilter,
} from "@/interfaces/entity-filter.interface";
import { isEntityFilterActive } from "@/utils/entity";

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
  getEntityFilters!: IEntityFilter;
  isEntityFilterActive: (
    filterField: string,
    getEntityFilters: IEntityFilter,
    filterString?: string
  ) => boolean = isEntityFilterActive;
}
</script>

<style lang="scss" scoped>
.facet-filter {
  min-height: 0 !important;
}
</style>
