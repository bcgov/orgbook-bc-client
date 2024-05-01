<!-- eslint-disable vuetify/no-deprecated-components -->
<template>
  <v-list variant="flat">
    <v-list-item-group multiple>
      <v-list-item
        v-for="field in fields"
        :key="field.label"
        @click="toggleSearchFilter(field)"
        class="facet-filter pa-0"
      >
        <template v-slot:default="{ isActive }">
          <v-list-item-action start class="mt-1 mb-1 mr-1">
            <v-checkbox-btn
              :ripple="false"
              :value="isFilterActive(searchFilters, field)"
              :model-value="isActive"
              @click="toggleSearchFilter(field)"
              class="checkbox"
            ></v-checkbox-btn>
          </v-list-item-action>
          <div class="pt-1 pb-1">
            <div v-if="field.translated">{{ field.label }}</div>
            <div v-else v-t="field.label"></div>
          </div>
          <v-list-item-action class="d-flex justify-end mt-1 mb-1">
            <div>{{ field.count }}</div>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";
import { isFilterActive } from "@/utils/search";
import { mapActions, mapGetters } from "vuex";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  computed: {
    ...mapGetters(["searchFilters"]),
  },
  methods: {
    ...mapActions(["toggleSearchFilter"]),
  },
  data() {
    return {
      isFilterActive,
    };
  },
  props: {
    fields: { default: () => [], type: Array as PropType<ISearchFilter[]> },
  },
});
</script>

<style lang="scss" scoped>
.facet-filter {
  min-height: 0 !important;
}
</style>
