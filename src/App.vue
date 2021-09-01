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
import { mapGetters } from "vuex";

@Component({
  components: {
    Header,
    Footer,
    Loading,
  },
  computed: {
    ...mapGetters(["loading"]),
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
  font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}
</style>
