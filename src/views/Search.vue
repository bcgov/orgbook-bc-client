<template>
  <div>
    <div class="search-bar">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-3">
        <v-row>
          <v-col class="d-flex flex-column flex-grow-1" cols="12" md="9">
            <p
              class="font-weight-normal flex-grow-1 text-md-h5 text-sm-h6 text-h6"
            >
              A public directory of organizations registered in BC
            </p>
            <SearchBar :query="q" class="flex-grow-1" />
          </v-col>
          <v-col class="flex-grow-0 pt-0 pb-0" cols="12" md="3">
            <SearchDescription
              class="pt-4"
              v-if="$vuetify.breakpoint.mdAndUp"
            />
            <SearchHelp v-if="$vuetify.breakpoint.smAndDown">
              <template v-slot:content>
                <SearchDescription />
              </template>
            </SearchHelp>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5 pt-0 pb-0">
      <SearchLoading v-if="loading" />
      <SearchResult v-else-if="searchQuery" />
      <SearchHome v-else />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/search/SearchBar.vue";
import SearchDescription from "@/components/search/SearchDescription.vue";
import SearchHelp from "@/components/search/SearchHelp.vue";
import SearchHome from "@/components/search/SearchHome.vue";
import SearchLoading from "@/components/search/SearchLoading.vue";
import { NavigationGuardNext, Route } from "vue-router";
import { defaultQuery } from "@/utils/search";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import store from "@/store";

interface Data {
  q: string | null;
}

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

export default {
  data(): Data {
    return {
      q: null,
    };
  },
  computed: {
    ...mapGetters(["loading", "searchQuery", "pagedSearchTopics"]),
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchCredentialTypes",
      "fetchSearchFacetedTopics",
      "resetSearch",
    ]),
    async extractQueryAndDispatchSearch(query: ISearchQuery): Promise<void> {
      this.q = query?.q || null;
      const newQuery = { ...defaultQuery, ...query };
      store.dispatch("setSearchQuery", newQuery);
      store.dispatch("setSearchFilters", newQuery);
      await this.search();
    },
    async search(): Promise<void> {
      this.setLoading(true);
      await Promise.all([
        this.fetchCredentialTypes(false),
        this.fetchSearchFacetedTopics(),
      ]);
      this.setLoading(false);
    },
  },
  async created(): Promise<void> {
    const query = this.$route.query as unknown as ISearchQuery;
    if (query?.q || query?.credential_type_id) {
      await this.extractQueryAndDispatchSearch(query);
    } else {
      this.resetSearch();
    }
  },
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
    if (query?.q || query?.credential_type_id) {
      await this.extractQueryAndDispatchSearch(query);
    } else {
      this.resetSearch();
    }
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  background: $secondary-color;
  color: $white;
}
</style>
