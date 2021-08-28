<template>
  <div id="searchBar" :class="{ 'pt-10 pb-10': $vuetify.breakpoint.mdAndUp }">
    <p class="font-weight-bold mb-1" v-if="$vuetify.breakpoint.mdAndUp">
      Find an organization
    </p>
    <v-combobox
      outlined
      dense
      cache-items
      hide-no-data
      hide-details
      background-color="white"
      v-model="q"
      :disabled="loading"
      :items="items"
      :search-input.sync="search"
      @input.native="updateModel"
      @change="onChange"
      class="combobox"
      aria-label="search-input"
    >
      <template v-slot:append-outer>
        <v-progress-circular
          v-if="pending"
          size="24"
          color="white"
          indeterminate
        ></v-progress-circular>
        <v-icon
          v-else
          id="searchButton"
          :disabled="!search || loading"
          @click="onClick"
          color="white"
          aria-label="search-button"
          >{{ mdiMagnify }}</v-icon
        >
      </template>
    </v-combobox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash-es";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/search";

interface Data {
  items: string[];
  search: string;
  q: string;
  pending: boolean;
}

@Component({
  computed: {
    ...mapGetters(["loading", "mdiMagnify"]),
  },
  methods: {
    ...mapActions(["fetchAutocomplete", "fetchSearch"]),
  },
})
export default class SearchBar extends Vue {
  items!: Array<string>;
  search!: string;
  q!: string;
  pending!: boolean;

  setLoading!: (loading: boolean) => void;
  fetchAutocomplete!: (
    query: string
  ) => Promise<IApiPagedResult<ISearchAutocomplete>>;
  fetchSearch!: (query: ISearchQuery) => void;

  debouncedAutocomplete = _.debounce(this.autocomplete, 500);

  @Prop({ default: "" }) query!: string;

  data(): Data {
    return {
      items: [],
      search: "",
      q: this.query || "",
      pending: false,
    };
  }

  @Watch("search")
  onChildChanged(q: string): void {
    this.debouncedAutocomplete(q);
  }

  async autocomplete(q: string): Promise<void> {
    let results = [] as string[];
    try {
      this.pending = true;
      if (q && q !== this.q) {
        const res = await this.fetchAutocomplete(q);
        results = (res?.results || [])
          .map((r) => r.value)
          .filter(
            (r) => (r || "").toLowerCase().indexOf((r || "").toLowerCase()) > -1
          );
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.pending = false;
    }
    this.items = results;
  }

  updateModel(e: InputEvent): void {
    const value = (e?.target as HTMLInputElement)?.value || "";
    this.search = value;
  }

  onClick(): void {
    if (!this.search) {
      return;
    }
    const query = { ...defaultQuery, ...{ q: this.search } };
    this.fetchSearch(query);
  }

  onChange(q: string): void {
    if (q === this.search) {
      return;
    }
    const query = { ...defaultQuery, ...{ q } };
    this.fetchSearch(query);
  }
}
</script>

<style lang="scss" scoped>
#searchBar {
  color: $white !important;
}
#searchButton {
  color: $white !important;
}
</style>
