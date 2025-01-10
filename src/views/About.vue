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
import BackTo from "@/components/shared/BackTo.vue";
import OrgBookData from "@/components/about/OrgBookData.vue";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import ShowcaseLinks from "@/components/about/ShowcaseLinks.vue";
import { mapActions, mapGetters } from "vuex";
import { IDocRoute, IDocRouteData } from "@/interfaces/doc.interface";

export default {
  computed: {
    ...mapGetters({
      docLinks: "docLinks",
      docRoute: "docRoute",
      showcaseLinks: "showcaseLinks"
    }),
    docRouteInfo: function(): IDocRoute {
        return this.docRoute(this.$route.name || "");
    },
    docRouteData: function(): IDocRouteData | undefined {
        return this.docRouteInfo?.data;
    },
    html: function(): string {
        return this.docRouteData?.html || "";
    },
  },
  methods: {
    ...mapActions({
      setLoading: "setLoading",
      fetchCredentialTypes:  "fetchCredentialTypes"
    })
  },
  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
</script>
