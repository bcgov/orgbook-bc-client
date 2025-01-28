<template>
  <div class="mb-4">
    <v-icon class="icon-dense" dense color="black">{{ mdiArrowLeft }}</v-icon>
    <router-link :to="to" class="text-body-2">{{ label }}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "pinia";
import { useIconState } from "@/stores";

@Component({
  computed: {
    ...mapState(useIconState, ["mdiArrowLeft"]),
  },
})
export default class BackTo extends Vue {
  @Prop({ default: "/search" }) to!: string;
  @Prop({ default: "Back to search" }) label!: string;
}
</script>
