<template>
  <div>
      <p class="font-weight-bold mb-1" :hidden="$vuetify.breakpoint.mdAndDown" >Find an organization</p>
      
        <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        flat
        hide-no-data
        hide-details
        label=""
        solo-inverted
        append-outer-icon="mdi-magnify"
        @click:append-outer="sendSearchReq"
      >
      </v-autocomplete>
      
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash-es";
import { HttpResponse } from "@/services/http.service";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";

@Component({
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["getAutocomplete", "setLoading"]),
  },
})
export default class SearchComponent extends Vue {
  select!: string;
  search!: string;
  items!: Array<string>;
  states!: Array<string>;
  setLoading!: (loading: boolean) => void;
  debounceSearchReq = _.debounce(this.searchReq, 500);
  getAutocomplete!: (
    query: string
  ) => Promise<HttpResponse<IApiPagedResult<ISearchAutocomplete>>>;

  data() {
    return {
      items: [],
      search: null,
      select: null,
    };
  }
  get something(): string {
    return this.select;
  }

  @Watch("search")
  onChildChanged(val: string, oldVal: string) {
    this.debounceSearchReq(val);
  }

  searchReq(val: string) {
    val && val !== this.select && this.querySelections(val);
  }

  querySelections(v: string) {
    this.setLoading(true);
    //Simulated ajax query
    this.getAutocomplete(v).then((resp) => {
      const autocompleteResults = resp.data.results.map((item) => item.value);
      this.items = autocompleteResults.filter((e) => {
        return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
      });
      this.setLoading(false);
    });
  }

  sendSearchReq(){
    console.log(this.search)
  }
}
</script>
