<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackTo />
      <p class="font-weight-bold">Contact</p>
      <p>
        OrgBook BC is continuously evolving. More information and features will
        be added to the site on an ongoing basis, and we welcome feedback to
        help us decide what would be most valuable.
      </p>
      <ContactForm />
    </v-container>
  </div>
</template>

<script lang="ts">
import BackTo from "@/components/shared/BackTo.vue";
import ContactForm from "@/components/contact/ContactForm.vue";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({ setLoading: "setLoading", fetchCredentialTypes: "fetchCredentialTypes"}),
  },
  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
</script>
