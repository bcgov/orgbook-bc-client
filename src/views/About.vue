<template>
  <div>
    <SubHeader v-if="$vuetify.breakpoint.mdAndUp" :links="docLinks" />
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackToSearch />
      <div v-html="html"></div>
      <OrgBookData
        v-if="docRouteInfo && docRouteInfo.name === 'OrgBook Data'"
      />
      <ShowcaseLinks
        v-if="docRouteData && docRouteData.index && showcaseLinks.length"
        class="ml-n3 mr-n3"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BackToSearch from "@/components/shared/BackToSearch.vue";
import OrgBookData from "@/components/about/OrgBookData.vue";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import ShowcaseLinks from "@/components/about/ShowcaseLinks.vue";
import { mapGetters } from "vuex";
import { IDocRoute, IDocRouteData } from "@/services/doc/doc.service";

@Component({
  components: {
    BackToSearch,
    OrgBookData,
    SubHeader,
    ShowcaseLinks,
  },
  computed: {
    ...mapGetters(["docLinks", "docRoute", "showcaseLinks"]),
  },
})
export default class About extends Vue {
  docRoute!: (name: string) => IDocRoute;

  get docRouteInfo(): IDocRoute {
    return this.docRoute(this.$route.name || "");
  }

  get docRouteData(): IDocRouteData | undefined {
    return this.docRouteInfo?.data;
  }

  get html(): string {
    return this.docRouteData?.html || "";
  }
}
</script>
