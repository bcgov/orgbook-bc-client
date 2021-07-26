<template>
  <v-app>
    <Header class="on-top" />
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

<style>
.row {
  margin: 0;
  padding: 0;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-justify-content-start {
  justify-content: start;
}
.flex-justify-content-end {
  justify-content: end;
}
.flex-justify-content-flex-end {
  justify-content: flex-end;
}
.flex-align-content-center {
  align-content: center;
}
.flex-align-items-center {
  align-items: center;
}
.on-top {
  z-index: 1 !important;
}
.on-bottom {
  z-index: 0 !important;
}
</style>
