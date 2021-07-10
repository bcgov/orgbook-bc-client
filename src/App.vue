<template>
  <v-app>
    <Header />
    <v-main>
      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-0">
        <router-view class="pa-8" />
      </v-container>
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
</style>
