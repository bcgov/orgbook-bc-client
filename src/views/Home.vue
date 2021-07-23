<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
    <h1>Home goes here!</h1>
    <SearchResult />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SearchResult from "@/components/search/SearchResult.vue";
import { mapActions, mapGetters } from "vuex";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/result";

interface Data {
  q: string | null;
}

@Component({
  components: {
    SearchResult,
  },
  computed: {
    ...mapGetters(["searchQuery"]),
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
