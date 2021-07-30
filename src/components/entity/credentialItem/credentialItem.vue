<template>
  <v-expansion-panel class="disabled">
    <v-expansion-panel-header>
      <slot name="header"></slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      :style="dropdownDivider ? 'background-color:lightgray' : ''"
    >
      Authority: <a :href="authorityLink">{{ authorityName }}</a> <br />
      <v-icon>mdi-shield-check-outline</v-icon> Credential verified <br />
      <span v-if="effectiveDate"
        >Effective: {{ effectiveDate | formatDate }} <br
      /></span>
      <span v-if="reason">Reason: {{reason}}</span>
    </v-expansion-panel-content>
    <v-divider></v-divider>
    <v-container v-if="$slots.content">
      <slot name="content"></slot>
    </v-container>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "@/utils/dateFilter";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";

@Component({
  props: [
    "authority",
    "effectiveDate",
    "expanded",
    "expired",
    "dropdownDivider",
    "reason",
  ],
})
export default class CredentialItem extends Vue {
  authority!: IIssuer;
  get authorityName(): string | undefined {
    return this.authority?.name;
  }

  get authorityLink(): string | undefined {
    return this.authority?.url?.toString();
  }
}
</script>
