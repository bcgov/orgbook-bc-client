<template>
  <div>
    <div class="pb-2 text-body-2">Find organizations using:</div>
    <ul class="description pa-0">
      <li
        class="pl-4 pb-2"
        v-for="description of descriptions"
        :key="description"
      >
        <v-icon dense color="white">{{ mdiCheckBold }}</v-icon>
        <span class="pl-2 text-body-2"> {{ description }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "pinia";
import { useIconState } from "@/stores";

interface Data {
  descriptions: string[];
}

@Component({
  computed: {
    ...mapState(useIconState, ["mdiCheckBold"]),
  },
})
export default class SearchDescription extends Vue {
  data(): Data {
    return {
      descriptions: [
        "Organization name",
        "Business number",
        "BC Registries ID",
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
</style>
