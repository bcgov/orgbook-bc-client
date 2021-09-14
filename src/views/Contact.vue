<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackToSearch />
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
import { Component, Vue } from "vue-property-decorator";
import BackToSearch from "@/components/shared/BackToSearch.vue";
import ContactForm from "@/components/contact/ContactForm.vue";
import { mapActions } from "vuex";

@Component({
  components: {
    BackToSearch,
    ContactForm,
  },
  methods: {
    ...mapActions(["setLoading", "fetchCredentialTypes"]),
  },
})
export default class Contact extends Vue {
  setLoading!: (loading: boolean) => void;
  fetchCredentialTypes!: (paged: boolean) => Promise<void>;

  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
</script>
