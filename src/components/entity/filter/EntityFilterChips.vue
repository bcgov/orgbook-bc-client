<template>
  <v-row>
    <v-col class="pl-0 pr-0">
      <v-chip
        v-for="(field, i) of activeEntityFilters"
        :key="i"
        outlined
        close
        :close-icon="mdiClose"
        class="ma-1"
        @click:close="
          toggleEntityFilter({
            filterString: field.filterString,
            filterField: field.filterField,
          })
        "
      >
        <span v-t="field.filterString"></span>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapState, mapActions as pmapActions } from "pinia";
import { useEntityState, useIconState } from "@/stores";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";

export interface EntityChips {
  filterString: string | boolean;
  filterField: string;
}
export default {
  computed: {
    ...mapState(useIconState, ["mdiClose"]),
    ...mapState(useEntityState, ["getEntityFilters"]),
    activeEntityFilters: function (): EntityChips[] {
      let chips: EntityChips[] = [];
      Object.keys(this.getEntityFilters).forEach((key) => {
        if (Array.isArray(this.getEntityFilters[key])) {
          chips.push(
            ...(this.getEntityFilters[key] as string[]).map((item) => {
              return { filterField: key, filterString: item };
            })
          );
        } else if (
          typeof this.getEntityFilters[key] === "string" &&
            this.getEntityFilters[key] !== ""
        ) {
          let prefix = "";
          if (key.startsWith("date")) {
            prefix = key === "date_min" ? "From: " : "To: ";
          }
          chips.push({
            filterField: key,
            filterString: (prefix + this.getEntityFilters[key]) as string,
          });
        } else if (this.getEntityFilters[key]) {
          chips.push({
            filterField: key,
            filterString:
            key === "show_expired"
              ? "Show Inactive Credentials"
              : (key as string),
          });
        }
      });
      return chips;
    },
  },
  methods: {
    ...pmapActions(useEntityState, ["toggleEntityFilter"]),
  }
}
</script>
