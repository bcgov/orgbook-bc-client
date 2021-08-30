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
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/search";
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["pagedSearchTopics", "mdiChevronLeft", "mdiChevronRight"]),
  },
  methods: {
    ...mapActions(["fetchSearch"]),
  },
})
export default class SearchTopicPageNavigation extends Vue {
  fetchSearch!: (query: ISearchQuery) => void;
  pagedSearchTopics!: IApiPagedResult<ISearchTopic>;

  get first(): number {
    return this?.pagedSearchTopics?.first_index || 0;
  }

  get last(): number {
    return this?.pagedSearchTopics?.last_index || 0;
  }

  get next(): string | URL | undefined {
    const nextPage = this?.pagedSearchTopics?.next as string;
    return nextPage && new URL(nextPage);
  }

  get previous(): string | URL | undefined {
    const previousPage = this?.pagedSearchTopics?.previous as string;
    return previousPage && new URL(previousPage);
  }

  get total(): number {
    return this?.pagedSearchTopics?.total || 0;
  }

  pageResults(url: URL): void {
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
  }
}
</script>
