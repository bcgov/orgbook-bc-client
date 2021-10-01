<template>
  <div>
    <SubHeader v-if="$vuetify.breakpoint.mdAndUp" :links="docLinks" />
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackTo />
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
import BackTo from "@/components/shared/BackTo.vue";
import OrgBookData from "@/components/about/OrgBookData.vue";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import ShowcaseLinks from "@/components/about/ShowcaseLinks.vue";
import { mapActions, mapGetters } from "vuex";
import { IDocRoute, IDocRouteData } from "@/interfaces/doc.interface";

@Component({
  components: {
    BackTo,
    OrgBookData,
    SubHeader,
    ShowcaseLinks,
  },
  computed: {
    ...mapGetters(["docLinks", "docRoute", "showcaseLinks"]),
  },
  methods: {
    ...mapActions(["setLoading", "fetchCredentialTypes"]),
  },
})
export default class About extends Vue {
  docRoute!: (name: string) => IDocRoute;

  setLoading!: (loading: boolean) => Promise<void>;
  fetchCredentialTypes!: (paged: boolean) => Promise<void>;

  get docRouteInfo(): IDocRoute {
    return this.docRoute(this.$route.name || "");
  }

  get docRouteData(): IDocRouteData | undefined {
    return this.docRouteInfo?.data;
  }

  get html(): string {
    return this.docRouteData?.html || "";
  }

  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
</script>
