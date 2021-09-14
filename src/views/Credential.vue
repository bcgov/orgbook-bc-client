<template>
  <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
    <CredentialDetail />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CredentialDetail from "@/components/entity/credentialDetail/CredentialDetail.vue";

@Component({
  components: {
    CredentialDetail,
  },
})
export default class Credential extends Vue {}
</script>
