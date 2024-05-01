<template>
  <div>
    <div class="search-bar">
      <v-container :fluid="$vuetify.display.smAndDown" class="pa-3">
        <v-row>
          <v-col class="d-flex flex-column flex-grow-1" cols="12" md="9">
            <p
              class="font-weight-normal flex-grow-1 text-md-h5 text-sm-h6 text-h6"
            >
              A public directory of organizations registered in BC
            </p>
            <!-- <SearchBar :query="q" class="flex-grow-1" /> -->
          </v-col>
          <v-col class="flex-grow-0 pt-0 pb-0" cols="12" md="3">
            <SearchDescription class="pt-4" v-if="$vuetify.display.mdAndUp" />
            <SearchHelp v-if="$vuetify.display.smAndDown">
              <template v-slot:content>
                <SearchDescription />
              </template>
            </SearchHelp>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container :fluid="$vuetify.display.smAndDown" class="pa-5 pt-0 pb-0">
      <SearchLoading v-if="loading" />
      <SearchResult v-else-if="searchQuery" />
      <SearchHome v-else />
    </v-container>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/search/SearchBar.vue";
import SearchDescription from "@/components/search/SearchDescription.vue";
import SearchHelp from "@/components/search/SearchHelp.vue";
import SearchHome from "@/components/search/SearchHome.vue";
import SearchLoading from "@/components/search/SearchLoading.vue";
import { defaultQuery } from "@/utils/search";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import store from "@/store";
import { defineComponent } from "vue";

interface Data {
  q: unknown;
}

export default defineComponent({
  hooks: ["beforeRouteEnter", "beforeRouteUpdate"],
  components: {
    SearchBar,
    SearchDescription,
    SearchHelp,
    SearchHome,
    SearchLoading,
    SearchResult: () =>
      import(
        /* webpackChunkName: "search-result" */ "@/components/search/SearchResult.vue"
      ),
  },
  computed: {
    ...mapGetters(["loading", "searchQuery", "pagedSearchTopics"]),
    q: (): unknown => null,
  },
  methods: {
    ...mapActions([
      "setLoading",
      "fetchCredentialTypes",
      "fetchSearchFacetedTopics",
      "resetSearch",
    ]),
    async beforeRouteUpdate(to: any, from: any, next: any): Promise<void> {
      // Need to call next first otherwise the URL is updated after the search completes
      next();
      console.log("EHRE>");
      const query = this.$route.query as unknown as ISearchQuery;
      if (query?.q || query?.credential_type_id) {
        await this.extractQueryAndDispatchSearch(query);
      } else {
        this.resetSearch();
      }
    },
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
  data(): Data {
    return {
      q: null,
    };
  },
  async created(): Promise<void> {
    const query = this.$route.query as unknown as ISearchQuery;
    if (query?.q || query?.credential_type_id) {
      await this.extractQueryAndDispatchSearch(query);
    } else {
      this.resetSearch();
    }
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  background: $secondary-color;
  color: $white;
}
</style>
