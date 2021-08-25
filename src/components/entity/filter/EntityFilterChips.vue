<template>
  <v-row>
    <v-col class="pl-0 pr-0">
      <v-chip
        v-for="(field, i) of activeEntityFilters"
        :key="i"
        outlined
        close
        close-icon="mdi-close"
        class="ma-1"
        @click:close="
          toggleEntityFilter({
            filterString: field.filterString,
            filterField: field.filterField,
          })
        "
      >
        {{ $t(field.filterString) }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Filter } from "@/store/modules/entityFilter";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

export interface EntityChips {
  filterString: string | boolean;
  filterField: string;
}

@Component({
  computed: {
    ...mapGetters(["getEntityFilters"]),
  },
  methods: {
    ...mapActions(["toggleEntityFilter"]),
  },
})
export default class EntityFilterChips extends Vue {
  getEntityFilters!: Filter;

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
