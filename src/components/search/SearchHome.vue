<template>
  <div>
    <v-row>
      <v-col cols="12" md="7" class="pl-0 pr-0">
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
            <v-icon>mdi-check-bold</v-icon>
            <span class="pl-4">{{ description }}</span>
          </li>
        </ul>
        <div>
          <v-icon dense color="black">mdi-shield-check-outline</v-icon>
          <router-link to="/about/digital-trust"
            >Powered by digital trust</router-link
          >
        </div>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        id="searchHomeGrapic"
        cols="12"
        md="5"
        class="pl-0 pr-0"
      >
        <img src="@/assets/img/graphic.png" alt="" srcset="" />
      </v-col>
    </v-row>
    <ShowcaseLinks v-if="showcaseLinks.length" class="ml-n2 mr-n2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import ShowcaseLinks from "@/components/about/ShowcaseLinks.vue";

interface Data {
  descriptions: string[];
}

@Component({
  components: {
    ShowcaseLinks,
  },
  computed: {
    ...mapGetters(["showcaseLinks"]),
  },
})
export default class SearchHome extends Vue {
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
  }
}
</style>
