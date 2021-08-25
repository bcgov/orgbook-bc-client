<template>
  <div>
    <SubHeader v-if="$vuetify.breakpoint.mdAndUp" :links="docLinks" />
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <div v-html="html"></div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubHeader from "@/components/layout/header/SubHeader.vue";
import { mapGetters } from "vuex";
import { IDocRoute } from "@/services/doc/doc.service";

@Component({
  components: {
    SubHeader,
  },
  computed: {
    ...mapGetters(["docLinks", "docRoute"]),
  },
})
export default class About extends Vue {
  docRoute!: (name: string) => IDocRoute;

  get html(): string {
    return this.docRoute(this.$route.name || "")?.data?.html || "";
  }
}
</script>
