<template>
  <v-toolbar dark>
      <v-toolbar-title>Find an organization</v-toolbar-title>
        <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label=""
      solo-inverted
      
    ></v-autocomplete>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import _ from 'lodash-es'



@Component({
  computed: {
    ...mapGetters(["pagedCredentialTypes", "requestTypes", "loading"]),
  },
  methods: {
    ...mapActions(["fetchCredentialTypes", "fetchRequestTypes", "postRequest", "setLoading"]),
  },
})

export default class SearchComponent extends Vue {

    select!:string
    items!:Array<string>
    states!:Array<string>
    setLoading!: (loading: boolean) => void;
    debounceSearchReq = _.debounce(this.searchReq, 500)
    data() {
    return {
        items: [],
        search: null,
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ],
      }
    
    }
    get something() : string{
        return this.select;
    }

    @Watch('search')
  onChildChanged(val: string, oldVal: string) {
    this.debounceSearchReq(val)
  }

    searchReq (val: string) {
        val && val !== this.select && this.querySelections(val)
    }

    querySelections (v:string) {
      this.setLoading(true)
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.setLoading(false)
      }, 500)
    }
    
      
}
</script>
