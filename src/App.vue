<template>
  <v-app>
    <Header />
    <v-main>
      <Loading v-if="loading" />
      <router-view></router-view>
      <Notification
        v-for="alert in alerts"
        :key="alert.id"
        :alert="alert"
      ></Notification>
    </v-main>
    <Footer class="on-top" />
  </v-app>
</template>

<script lang="ts">
import "@bcgov/bc-sans/css/BCSans.css";

import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import Loading from "@/components/shared/Loading.vue";
import Notification from "@/components/shared/Notification.vue";
import { mapGetters } from "vuex";

@Component({
  components: {
    Header,
    Footer,
    Loading,
    Notification,
  },
  computed: {
    ...mapGetters(["loading", "alerts"]),
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
a {
  color: $link-color;
}
.row {
  margin: 0;
  padding: 0;
}
.on-top {
  z-index: 1;
}
.on-bottom {
  z-index: 0;
}
</style>
