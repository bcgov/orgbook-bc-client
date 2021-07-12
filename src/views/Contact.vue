<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-8">
      <h1>Contact goes here!</h1>
      <ContactForm />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactForm from "@/components/contact/ContactForm.vue";

@Component({
  components: {
    ContactForm,
  },
})
export default class Contact extends Vue {}
</script>
