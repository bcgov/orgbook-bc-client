<template>
  <v-app>
    <Header />
    <v-main class="ma-12">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
.row {
  max-width: 100vw;
}
.flex-text-left {
  justify-content: start;
}
.flex-text-right {
  justify-content: end;
}
</style>
