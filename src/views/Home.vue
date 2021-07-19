<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-8">
    <SearchComponent></SearchComponent>
    <h1>Home goes here!</h1>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchComponent from "@/components/search/SearchComponent.vue";

@Component({
  components: {
    SearchComponent,
  },
})
export default class Contact extends Vue {}
</script>
