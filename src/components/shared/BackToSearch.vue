<template>
  <div class="mb-4">
    <v-icon class="icon-dense" dense color="black">{{ mdiArrowLeft }}</v-icon>
    <router-link to="/search" class="text-body-2">Back to search</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["mdiArrowLeft"]),
  },
})
export default class BackToSearch extends Vue {}
</script>
