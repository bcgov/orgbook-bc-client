<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackTo />

      <h1 class="text-h5 font-weight-bold mb-2">Help &amp; FAQ</h1>
      <p class="text-body-1 mb-6">
        Find answers to common questions about OrgBook BC below. Click any
        question to expand its answer.
      </p>

      <FaqList :categories="faqCategories" />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BackTo from "@/components/shared/BackTo.vue";
import FaqList from "@/components/help/FaqList.vue";
import faq from "@/data/faq/en";
import { mapActions as pmapActions } from "pinia";
import { useAppState, useCredentialTypeState } from "@/stores";

export default Vue.extend({
  name: "Help",
  components: { BackTo, FaqList },
  computed: {
    faqCategories() {
      return faq.categories;
    },
  },
  methods: {
    ...pmapActions(useCredentialTypeState, {
      fetchCredentialTypes: "fetchCredentialTypes",
    }),
    ...pmapActions(useAppState, ["setLoading"]),
  },
  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  },
});
</script>
