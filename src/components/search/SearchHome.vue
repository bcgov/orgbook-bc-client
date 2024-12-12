<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="5"
        :class="{
          'pl-0 pr-0': true,
          'pr-4': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <p class="text-h5 font-weight-bold">OrgBook BC</p>
        <div class="pb-2">
          OrgBook BC provides verified data about organizations including:
        </div>
        <ul class="pa-0 mb-2 description">
          <li
            class="pl-4 pb-2"
            v-for="description of descriptions"
            :key="description"
          >
            <v-icon>{{ mdiCheckBold }}</v-icon>
            <span class="pl-4">{{ description }}</span>
          </li>
        </ul>
        <div>
          <v-icon class="icon-dense" dense color="black">{{
            mdiShieldCheckOutline
          }}</v-icon>
          <router-link class="vertical-align-middle" to="/about/digital-trust"
            >Powered by digital trust</router-link
          >
        </div>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        id="searchHomeGrapic"
        cols="12"
        md="4"
        class="pl-0 pr-0"
      >
        <img :src="graphic" alt="" srcset="" height="300px" />
      </v-col>
      <v-col
        id="searchHomeStats"
        cols="12"
        md="3"
        :class="{
          'pl-0 pr-0': true,
          'pl-4': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <p class="text-h5 font-weight-bold">Current Statistics</p>
        <div v-if="statistics">
          <div>
            <p>
              <span class="font-weight-bold">{{
                statistics.credential_counts.registrations
              }}</span>
              active legal entities
            </p>
          </div>
          <div>
            <p>
              <span class="font-weight-bold">{{
                statistics.credential_counts.active
              }}</span>
              verifiable credentials held
            </p>
          </div>
          <div>
            <p>
              <span class="font-weight-bold">{{
                statistics.credential_counts.last_week
              }}</span>
              credentials added this week
            </p>

            <p></p>
          </div>
        </div>
        <v-skeleton-loader
          v-else
          v-for="i in [1, 2, 3]"
          :key="i"
          type="table-cell"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <ShowcaseLinks v-if="showcaseLinks.length" class="ml-n2 mr-n2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import ShowcaseLinks from "@/components/about/ShowcaseLinks.vue";
import graphic from "@/assets/img/graphic.png"

interface Data {
  descriptions: string[];
}

@Component({
  components: {
    ShowcaseLinks,
  },
  computed: {
    ...mapGetters([
      "statistics",
      "showcaseLinks",
      "mdiCheckBold",
      "mdiShieldCheckOutline",
    ]),
  },
  methods: {
    ...mapActions(["fetchStatistics"]),
  },
})
export default class SearchHome extends Vue {
  fetchStatistics!: () => Promise<void>;

  data(): Data {
    return {
      descriptions: [
        "Business numbers",
        "Legal names and DBA names",
        "BC registration status",
        "Select licenses and permits",
        "Some addresses",
      ],
    };
  }

  created(): void {
    this.fetchStatistics();
  }
}
</script>

<style lang="scss" scoped>
ul.description {
  list-style: none;

  li {
    white-space: nowrap;
  }
}
#searchHomeGrapic {
  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
