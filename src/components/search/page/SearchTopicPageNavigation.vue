<template>
  <div v-if="total" class="d-flex align-center justify-center">
    <span class="text-body-2"
      >Items displayed {{ first }} - {{ last }} of {{ total }}
    </span>
    <v-btn icon :disabled="!previous" @click="pageResults(previous)">
      <v-icon>{{ mdiChevronLeft }}</v-icon>
    </v-btn>
    <v-btn icon :disabled="!next" @click="pageResults(next)">
      <v-icon>{{ mdiChevronRight }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defaultQuery } from "@/utils/search";
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapGetters(["pagedSearchTopics", "mdiChevronLeft", "mdiChevronRight"]),
    first(): number {
      return this?.pagedSearchTopics?.first_index || 0;
    },
    last(): number {
      return this?.pagedSearchTopics?.last_index || 0;
    },
    next(): string | URL | undefined {
      const nextPage = this?.pagedSearchTopics?.next as string;
      return nextPage && new URL(nextPage);
    },
    previous(): string | URL | undefined {
      const previousPage = this?.pagedSearchTopics?.previous as string;
      return previousPage && new URL(previousPage);
    },
    total(): number {
      return this?.pagedSearchTopics?.total || 0;
    },
  },
  methods: {
    ...mapActions(["fetchSearch"]),
    pageResults(url?: string | URL): void {
      if (!url || typeof url === "string") {
        return;
      }
      const query: Record<string, string | string[]> = {};
      for (let key of Array.from(url.searchParams.keys()).filter(
        (key) => key !== "revoked"
      )) {
        let values: string | string[] = url.searchParams.getAll(key);
        if (values?.length > 1) {
          key = key.split("[]")[0];
        } else {
          values = values[0];
        }
        query[key] = values;
      }
      this.fetchSearch({ ...defaultQuery, ...query });
    },
  },
});
</script>
