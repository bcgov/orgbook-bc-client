<template>
  <v-expansion-panel class="disabled">
    <v-expansion-panel-header>
      <slot name="header"></slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content :class="dropdownDivider ? 'dropdown' : ''">
      <div class="text-body-2 text--secondary">
        <div>
          <span>Authority:&nbsp;</span>
          <a :href="authorityLink">
            <span>{{ authority }}</span>
            <v-icon small class="fake-link">{{ mdiOpenInNew }}</v-icon>
          </a>
        </div>
        <div>
          <v-icon small>{{ mdiShieldCheckOutline }}</v-icon>
          <span class="fake-link vertical-align-middle"
            >Credential verified</span
          >
        </div>
        <div v-if="effectiveDate">
          <span>Effective:&nbsp;</span>
          <span>{{ effectiveDate | formatDate }}</span>
        </div>
      </div>
      <span v-if="reason">Reason: {{ reason }}</span>
      <slot name="content"></slot>
    </v-expansion-panel-content>
    <v-divider></v-divider>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/filters/date.filter";
import { mapGetters } from "vuex";
@Component({
  computed: {
    ...mapGetters(["mdiOpenInNew", "mdiShieldCheckOutline"]),
  },
})
export default class CredentialItem extends Vue {
  @Prop({ default: "" }) authority!: string;
  @Prop({ default: "" }) authorityLink!: string;
  @Prop({ default: "" }) effectiveDate!: string;
  @Prop({ default: false }) expired!: boolean;
  @Prop({ default: false }) dropdownDivider!: boolean;
  @Prop({ default: "" }) reason!: string;
}
</script>

<style lang="scss" scoped>
.dropdown {
  background-color: lightgray;
}
</style>
