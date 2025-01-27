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
          <v-list-item-content
            class="pt-1 pb-1"
            v-translate="
              field.value ? toTranslationFormat(field.value, entityType) : ''
            "
          >
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
import { mapState, mapActions as pmapActions} from "pinia";
import { useEntityState } from "@/stores";
import {
  IEntityFacetField,
  IEntityFilter,
} from "@/interfaces/entity-filter.interface";
import { translate } from "@/i18n/translate";
import { isEntityFilterActive, toTranslationFormat } from "@/utils/entity";

export default {
        computed: {
                ...mapState(useEntityState, ["getEntityFilters"]),
        },
        methods: {
                ...pmapActions(useEntityState, ["toggleEntityFilter"]),
                isEntityFilterActive,
                toTranslationFormat
        },
        directives: {
                translate,
        },
        props: {
                entityType: {
                        type:  String,
                        default: ""
                },
                filterField: {
                        type:  String,
                        default: () => []
                },
                fields: {
                        type:  Array<IEntityFacetField>,
                        default: () => []
                },
        }
}
</script>

<style lang="scss" scoped>
.facet-filter {
  min-height: 0 !important;
}
</style>
