<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-8">
    <SearchComponent></SearchComponent>
    <h1>Home goes here!</h1>
    <SearchResult :results="pagedSerchTopics" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SearchResult from "@/components/search/SearchResult.vue";
import { mapActions, mapGetters } from "vuex";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";

interface Data {
  q: string | null;
}

@Component({
  components: {
    SearchResult,
  },
  computed: {
    ...mapGetters(["searchQuery", "pagedSerchTopics"]),
  },
  methods: {
    ...mapActions(["setLoading", "setSearchQuery", "fetchSearchTopics"]),
  },
})
export default class Home extends Vue {
  private defaultQuery = {
    q: null,
    latest: true,
    revoked: false,
    inactive: null,
    category: null,
    issuer_id: null,
    type_id: null,
    credential_type_id: null,
  };

  q!: string | null;

  setLoading!: (loading: boolean) => void;
  setSearchQuery!: (query: ISearchQuery) => void;
  fetchSearchTopics!: (query: ISearchQuery) => void;

  data(): Data {
    return {
      q: null,
    };
  }

  created(): void {
    const query = this.$route.query as unknown as ISearchQuery;
    this.q = query?.q || null;
    this.setSearchQuery({ ...this.defaultQuery, ...query });
  }

  @Watch("searchQuery")
  async onSearchQueryChanged(
    { ...newQuery }: ISearchQuery,
    { ...oldQuery }: ISearchQuery
  ): Promise<void> {
    if (newQuery?.q && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
      this.setLoading(true);
      await this.fetchSearchTopics(newQuery);
      this.setLoading(false);
    }
  }
}
</script>
