<template>
  <div :class="{ 'pt-10 pb-10': $vuetify.breakpoint.mdAndUp }">
    <p class="font-weight-bold mb-1" v-if="$vuetify.breakpoint.mdAndUp">
      Find an organization
    </p>
    <v-combobox
      id="searchBar"
      outlined
      dense
      hide-no-data
      hide-details
      background-color="white"
      append-icon=""
      v-model="q"
      :auto-select-first="false"
      :disabled="loading"
      :items="items"
      :search-input.sync="search"
      :menu-props="{
        value: !!(search && items.length),
      }"
      @change="changeSearch"
      @keydown="enterSearch"
      @update:search-input="autocompleteSearch"
      @update:list-index="(i) => (index = i)"
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
          @click="submitSearch"
          color="white"
          aria-label="search-button"
          >{{ mdiMagnify }}</v-icon
        >
      </template>
    </v-combobox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash-es";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/search";

interface Data {
  index: number;
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
  loading!: boolean;
  index!: number;
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
      index: -1,
      items: [],
      search: "",
      q: this.query || "",
      pending: false,
    };
  }

  async autocomplete(q: string): Promise<void> {
    try {
      this.items = [] as string[];
      this.pending = true;
      const response = await this.fetchAutocomplete(q);
      this.items = (response?.results || [])
        .map((result) => result.value)
        .filter(
          (result) =>
            (result || "").toLowerCase().indexOf((result || "").toLowerCase()) >
            -1
        );
    } catch (e) {
      console.error(e);
    } finally {
      this.pending = false;
    }
  }

  autocompleteSearch(val: string): void {
    if (!val || this.loading) {
      return;
    }
    this.resetAutocomplete();
    this.debouncedAutocomplete(val);
  }

  changeSearch(val: string): void {
    if (val === this.search) {
      return;
    }
    this.executeSearch(val);
  }

  enterSearch(e: KeyboardEvent): void {
    if (e.key === "Escape" || e.code === "Escape") {
      this.resetIndex();
      this.resetAutocomplete();
    } else if (e.key === "Enter" || e.code === "Enter") {
      if (this.index >= 0) {
        this.search = this.items[this.index];
      }
      this.submitSearch();
    }
  }

  submitSearch(): void {
    if (!this.search) {
      return;
    }
    this.executeSearch(this.search);
  }

  private executeSearch(q: string) {
    this.resetIndex();
    this.resetAutocomplete();
    const query = { ...defaultQuery, ...{ q } };
    this.fetchSearch(query);
  }

  private resetIndex(): void {
    this.index = -1;
  }

  private resetAutocomplete(): void {
    this.items = [];
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
