<template>
  <v-app>
    <Header />
    <v-main>
      <Loading v-if="loading" />
      <router-view></router-view>
    </v-main>
    <Footer class="on-top" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import Loading from "@/components/shared/Loading.vue";
import { useAppState } from "@/stores/app"
import { mapState } from "pinia";

@Component({
  components: {
    Header,
    Footer,
    Loading,
  },
  computed: {
    ...mapState(useAppState, {loading: "getLoading"}),
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

.row {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
