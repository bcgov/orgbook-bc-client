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
import "@bcgov/bc-sans/css/BCSans.css";

import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import Loading from "@/components/shared/Loading.vue";
import { mapActions, mapGetters } from "vuex";

@Component({
  components: {
    Header,
    Footer,
    Loading,
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["setLoading", "fetchCredentialTypes"]),
  },
})
export default class App extends Vue {
  setLoading!: (loading: boolean) => void;
  fetchCredentialTypes!: (paging: boolean) => Promise<void>;

  async created(): Promise<void> {
    this.setLoading(true);
    await this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
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
  margin: 0 !important;
  padding: 0 !important;
}
.on-top {
  z-index: 1;
}
.on-bottom {
  z-index: 0;
}
.checkbox {
  color: $input-color;
  height: 24px;
}
</style>
