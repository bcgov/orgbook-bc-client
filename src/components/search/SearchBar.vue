<template>
  <div :class="{ 'pt-4 pb-10': $vuetify.breakpoint.mdAndUp }">
    <span class="font-weight-bold mb-1" v-if="$vuetify.breakpoint.mdAndUp">
      <SearchHelpPopup>
        <template #title>Find an organization</template>
      </SearchHelpPopup>
    </span>
    <div id="search">
      <v-text-field
        id="searchBar"
        outlined
        dense
        hide-details
        background-color="white"
        v-model="q"
        :disabled="loading"
        @input="autocompleteSearch"
        @keydown.esc="escapeSearch"
        @keydown.enter="enterSearch"
        @keydown.down="arrowDown"
        @keydown.up="arrowUp"
        autocomplete="off"
        clearable
      >
        <template v-slot:append-outer>
          <v-progress-circular
            v-if="pending"
            id="searchBarLoading"
            size="24"
            color="white"
            indeterminate
          ></v-progress-circular>
          <v-icon
            v-else
            id="searchBarButton"
            :disabled="!q || loading"
            @click="submitSearch"
            color="white"
            aria-label="search-button"
            >{{ mdiMagnify }}</v-icon
          >
        </template>
      </v-text-field>
      <v-list dense v-if="items.length" id="searchBarResults" elevation="8">
        <div class="d-flex justify-end">
          <v-btn small plain title @click="escapeSearch" color="secondary">
            <span>Close</span>
            <v-icon id="searchBarCloseIcon" small>{{ mdiClose }}</v-icon>
          </v-btn>
        </div>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :class="{
              'text-body-2': true,
              'active-autocomplete': i === index,
            }"
            @click="changeSearch(item)"
          >
            <div>
              <span>{{
                item.substring(0, item.toLowerCase().indexOf(q.toLowerCase()))
              }}</span>
              <span
                :class="{
                  'font-weight-bold':
                    item.toLowerCase().indexOf(q.toLowerCase()) >= 0,
                }"
                >{{
                  item.substring(
                    item.toLowerCase().indexOf(q.toLowerCase()),
                    item.toLowerCase().indexOf(q.toLowerCase()) + q.length
                  )
                }}</span
              >
              <span>{{
                item.substring(
                  item.toLowerCase().indexOf(q.toLowerCase()) + q.length
                )
              }}</span>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
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
import SearchHelpPopup from "./SearchHelpPopup.vue";

interface Data {
  index: number;
  items: string[];
  q: string;
  pending: boolean;
}

@Component({
  components: {
    SearchHelpPopup,
  },
  computed: {
    ...mapGetters(["loading", "mdiMagnify", "mdiClose", "mdiHelpCircle"]),
  },
  methods: {
    ...mapActions(["fetchAutocomplete", "fetchSearch"]),
  },
})
export default class SearchBar extends Vue {
  loading!: boolean;
  index!: number;
  items!: string[];
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
      q: this.query || "",
      pending: false,
    };
  }

  async autocomplete(q: string): Promise<void> {
    try {
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
    this.escapeSearch();
    if (!val || this.loading) {
      return;
    }
    this.debouncedAutocomplete(val);
  }

  changeSearch(q: string): void {
    if (q === this.q) {
      return;
    }
    this.q = q;
    this.executeSearch(q);
  }

  escapeSearch(): void {
    this.resetIndex();
    this.resetAutocomplete();
  }

  enterSearch(): void {
    if (this.index >= 0) {
      this.q = this.items[this.index];
    }
    this.submitSearch();
  }

  arrowDown(): void {
    if (this.index < this.items.length - 1) {
      this.index += 1;
    } else {
      this.index = 0;
    }
  }

  arrowUp(): void {
    if (this.index > 0) {
      this.index -= 1;
    } else {
      this.index = this.items.length - 1;
    }
  }

  submitSearch(): void {
    if (!this.q) {
      return;
    }
    this.executeSearch(this.q);
  }

  private executeSearch(q: string) {
    this.escapeSearch();
    const query = { ...defaultQuery, ...{ q } };
    this.fetchSearch(query);
  }

  private resetIndex(): void {
    this.index = -1;
  }

  private resetItems(): void {
    this.items = [] as string[];
  }

  private resetAutocomplete(): void {
    this.debouncedAutocomplete.cancel();
    this.resetItems();
  }
}
</script>

<style lang="scss" scoped>
#search {
  position: relative;
}
#searchBar {
  color: $white !important;
}
#searchBarButton {
  color: $white !important;
}
#searchBarResults {
  position: absolute;
  width: calc(100% - 32px);
  z-index: 8;
  overflow: auto;
}
#searchBarCloseIcon {
  padding-top: 1px;
}
.active-autocomplete {
  background-color: #e3e3e3;
}
</style>
