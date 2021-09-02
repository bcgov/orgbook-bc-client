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
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";

export interface EntityChips {
  filterString: string | boolean;
  filterField: string;
}

@Component({
  computed: {
    ...mapGetters(["getEntityFilters", "mdiClose"]),
  },
  methods: {
    ...mapActions(["toggleEntityFilter"]),
  },
})
export default class EntityFilterChips extends Vue {
  getEntityFilters!: IEntityFilter;

  get activeEntityFilters(): EntityChips[] {
    var chips: EntityChips[] = [];
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
        chips.push({
          filterField: key,
          filterString: this.getEntityFilters[key] as string,
        });
      } else if (this.getEntityFilters[key]) {
        chips.push({
          filterField: key,
          filterString: key as string,
        });
      }
    });
    return chips;
  }
}
</script>
