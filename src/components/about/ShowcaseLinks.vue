<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
      v-for="showcaseLink in showcaseLinks"
      :key="showcaseLink.name"
    >
      <v-card elevation="0" rounded="sm" class="card">
        <v-card-title class="font-weight-bold">
          <router-link class="showcase-link" :to="showcaseLink.path">
            {{
              (showcaseLink.data && showcaseLink.data.showcaseTitle) ||
              showcaseLink.name
            }}
          </router-link>
        </v-card-title>
        <v-card-text class="text-body-1 text--primary">
          {{
            (showcaseLink.data && showcaseLink.data.showcaseDescription) || ""
          }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["showcaseLinks"]),
  },
})
export default class ShowcaseLinks extends Vue {}
</script>

<style lang="scss" scoped>
.card {
  @include card;
  height: 100%;
}
.showcase-link {
  word-break: break-word;
}
</style>
