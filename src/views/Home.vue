<template>
  <div>
    <div class="search-bar">
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
        <SearchBar :query="q"></SearchBar>
      </v-container>
    </div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5 pt-0 pb-0">
      <SearchResult
        v-if="pagedSearchTopics.total"
        :results="pagedSearchTopics"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/result";
import SearchBar from "@/components/search/SearchBar.vue";
import SearchResult from "@/components/search/SearchResult.vue";

interface Data {
  q: string | null;
}

@Component({
  components: {
    SearchBar,
    SearchResult,
  },
  computed: {
    ...mapGetters(["searchQuery", "pagedSearchTopics"]),
  },
  methods: {
    ...mapActions(["setLoading", "setSearchQuery", "fetchSearchFacetedTopics"]),
  },
})
export default class Home extends Vue {
  q!: string | null;

  setLoading!: (loading: boolean) => void;
  setSearchQuery!: (query: ISearchQuery) => void;
  fetchSearchFacetedTopics!: (query: ISearchQuery) => void;

  data(): Data {
    return {
      q: null,
    };
  }

  created(): void {
    const query = this.$route.query as unknown as ISearchQuery;
    if (query?.q) {
      this.q = query?.q || null;
      this.setSearchQuery({ ...defaultQuery, ...query });
    }
  }

  @Watch("searchQuery")
  async onSearchQuery(
    newQuery: ISearchQuery,
    oldQuery: ISearchQuery
  ): Promise<void> {
    if (newQuery?.q && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
      this.setLoading(true);
      await this.fetchSearchFacetedTopics(newQuery);
      this.setLoading(false);
    }
  }
}
</script>

<style scoped>
.search-bar {
  color: white;
  background: #b3b3b3;
}
</style>
