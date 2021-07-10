<template>
  <div>
    <h1>Contact goes here!</h1>
    <ContactForm />
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
