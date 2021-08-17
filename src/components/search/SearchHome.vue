<template>
  <v-row>
    <v-col cols="12" md="8">
      <p class="text-h5 font-weight-bold">OrgBook BC</p>
      <div class="pb-2">
        OrgBook BC provides verified data about organizations including:
      </div>
      <ul class="pa-0 description">
        <li
          class="pl-4 pb-2"
          v-for="description of descriptions"
          :key="description"
        >
          <v-icon>mdi-check-bold</v-icon>
          <span class="pl-4">{{ description }}</span>
        </li>
      </ul>
    </v-col>

    <v-col id="searchHomeGrapic" cols="12" md="4">Image here</v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Data {
  descriptions: string[];
}

@Component
export default class SearchHome extends Vue {
  data(): Data {
    return {
      descriptions: [
        "Business numbers",
        "Legal names and DBA names",
        "BC registration status",
        "Select licenses and permits",
        "Some addresses",
      ],
    };
  }
}
</script>

<style lang="scss" scoped>
ul.description {
  list-style: none;

  li {
    white-space: nowrap;
  }
}
#searchHomeGrapic {
  background: $gray;
  color: $white;
}
</style>
