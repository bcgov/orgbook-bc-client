<template>
  <div>
    <p class="font-weight-bold mb-1" v-if="$vuetify.breakpoint.mdAndUp">
      Find an organization
    </p>
    <v-combobox
      outlined
      cache-items
      hide-no-data
      hide-details
      v-model="q"
      :disabled="loading"
      :loading="pending"
      :items="items"
      :search-input.sync="search"
      append-outer-icon="mdi-magnify"
      @input.native="updateModel"
      @click:append-outer="onClick"
      @change="onChange"
    >
    </v-combobox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash-es";
import { HttpResponse } from "@/services/http.service";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import { ISearchQuery } from "@/interfaces/api/v4/search-topic.interface";
import { defaultQuery } from "@/utils/result";

interface Data {
  items: string[];
  search: string;
  q: string;
  pending: boolean;
}

@Component({
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["fetchAutocomplete", "setSearchQuery"]),
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
  ) => Promise<HttpResponse<IApiPagedResult<ISearchAutocomplete>>>;
  setSearchQuery!: (query: ISearchQuery) => void;

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
        results = (res?.data?.results || [])
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
    this.setSearchQuery({ ...defaultQuery, ...{ q: this.search } });
  }

  onChange(q: string): void {
    if (q === this.search) {
      return;
    }
    this.setSearchQuery({ ...defaultQuery, ...{ q } });
  }
}
</script>
