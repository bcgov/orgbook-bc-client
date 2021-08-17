<template>
  <div>
    <div class="search-bar">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
        <SearchBar :query="q"></SearchBar>
      </v-container>
    </div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5 pt-0 pb-0">
      <SearchLoading v-if="loading" />
      <SearchResult v-else-if="searchQuery" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/search/SearchBar.vue";
import SearchResult from "@/components/search/SearchResult.vue";
import SearchLoading from "@/components/search/SearchLoading.vue";
import { NavigationGuardNext, Route } from "vue-router";
import { defaultQuery } from "@/utils/search";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import store from "@/store";

interface Data {
  q: string | null;
}

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    SearchBar,
    SearchResult,
    SearchLoading,
  },
  computed: {
    ...mapGetters(["loading", "searchQuery", "pagedSearchTopics"]),
  },
  methods: {
    ...mapActions(["setLoading", "fetchSearchFacetedTopics", "resetSearch"]),
  },
})
export default class Search extends Vue {
  q!: unknown;

  setLoading!: (loading: boolean) => void;
  fetchSearchFacetedTopics!: () => void;
  resetSearch!: () => void;

  data(): Data {
    return {
      q: null,
    };
  }

  async created(): Promise<void> {
    const query = this.$route.query as unknown as ISearchQuery;
    if (query?.q) {
      await this.extractQueryAndDispatchSearch(query);
    } else {
      this.resetSearch();
    }
  }

  /**
   * This is executed when a filter is (de)selected. The state managed search query and filters
   * are updated in the store, which in turn active an in-place route change. The route change is
   * what signals fethcing of search results.
   * */
  async beforeRouteUpdate(
    to: Route,
    from: Route,
    next: NavigationGuardNext<Vue>
  ): Promise<void> {
    // Need to call next first otherwise the URL is updated after the search completes
    next();
    const query = this.$route.query as unknown as ISearchQuery;
    if (query?.q) {
      await this.extractQueryAndDispatchSearch(query);
    } else {
      this.resetSearch();
    }
  }

  async extractQueryAndDispatchSearch(query: ISearchQuery): Promise<void> {
    this.q = query?.q || null;
    const newQuery = { ...defaultQuery, ...query };
    store.dispatch("setSearchQuery", newQuery);
    store.dispatch("setSearchFilters", newQuery);
    await this.search();
  }

  async search(): Promise<void> {
    this.setLoading(true);
    await this.fetchSearchFacetedTopics();
    this.setLoading(false);
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  background: $secondary-color;
  color: $white;
}
</style>
