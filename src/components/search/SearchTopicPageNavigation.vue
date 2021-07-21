<template>
  <div v-if="total" class="flex-row flex-align-items-center justify-center">
    <span class="text-body-2"
      >Items displayed {{ first }} - {{ last }} of {{ total }}
    </span>
    <v-btn icon :disabled="!previous" @click="pageResults(previous)">
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn icon :disabled="!next" @click="pageResults(next)">
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { defaultPageResult, defaultQuery } from "@/utils/result";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: {
    ...mapActions(["setSearchQuery"]),
  },
})
export default class SearchTopicPageNavigation extends Vue {
  setSearchQuery!: (query: ISearchQuery) => void;

  @Prop({ default: () => defaultPageResult<ISearchTopic>() })
  page!: IApiPagedResult<ISearchTopic>;

  get first(): number {
    return this?.page?.first_index || 0;
  }

  get last(): number {
    return this?.page?.last_index || 0;
  }

  get next(): string | URL | undefined {
    const nextPage = this?.page?.next as string;
    return nextPage && new URL(nextPage);
  }

  get previous(): string | URL | undefined {
    const previousPage = this?.page?.previous as string;
    return previousPage && new URL(previousPage);
  }

  get total(): number {
    return this?.page?.total || 0;
  }

  pageResults(url: URL): void {
    const query: Record<string, string | string[]> = {};
    for (let key of url.searchParams.keys()) {
      let values: string | string[] = url.searchParams.getAll(key);
      if (values?.length > 1) {
        key = key.split("[]")[0];
      } else {
        values = values[0];
      }
      query[key] = values;
    }
    this.setSearchQuery({ ...defaultQuery, ...query });
  }
}
</script>
