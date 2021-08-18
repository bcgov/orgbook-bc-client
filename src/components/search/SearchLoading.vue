<template>
  <v-row>
    <v-col class="pt-2">
      <v-alert>
        <span>Please wait</span>
        <v-scroll-x-transition v-for="i in count" :key="i">
          <span>&nbsp;.</span>
        </v-scroll-x-transition>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Data {
  count: number;
}

@Component
export default class SearchLoading extends Vue {
  interval!: number;
  count!: number;

  data(): Data {
    return {
      count: this.count || 0,
    };
  }

  created(): void {
    this.interval = setInterval(() => {
      this.count = ++this.count % 4;
    }, 350);
  }
}
</script>
