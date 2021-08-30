<template>
  <v-expansion-panel class="disabled">
    <v-expansion-panel-header>
      <slot name="header"></slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content :class="dropdownDivider ? 'dropdown' : ''">
      Authority: <a :href="authorityLink">{{ authority }}</a> <br />
      <v-icon>{{mdiShieldCheckOutline}}</v-icon> Credential verified <br />
      <span v-if="effectiveDate"
        >Effective: {{ effectiveDate | formatDate }} <br
      /></span>
      <span v-if="reason">Reason: {{ reason }}</span>
    </v-expansion-panel-content>
    <v-divider></v-divider>
    <v-container v-if="$slots.content">
      <slot name="content"></slot>
    </v-container>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/utils/dateFilter";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import { mapGetters } from "vuex";
@Component({
  computed:{
    ...mapGetters([
      "mdiShieldCheckOutline"
    ])
  }
})
export default class CredentialItem extends Vue {
  @Prop({ default: "" }) authority!: string;
  @Prop({ default: "" }) authorityLink!: string;
  @Prop({ default: "" }) effectiveDate!: string;
  @Prop({ default: false }) expanded!: boolean;
  @Prop({ default: false }) expired!: boolean;
  @Prop({ default: false }) dropdownDivider!: boolean;
  @Prop({ default: "" }) reason!: string;
}
  
</script>

<style scoped>
.dropdown {
  background-color: lightgray;
}
</style>
