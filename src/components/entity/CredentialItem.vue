<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      :class="{
        'pa-5 pt-4 pb-4': true,
        'timeline-header': timeline,
      }"
    >
      <slot name="header"></slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      :class="{
        'pt-4 pl-n1 pr-n1': true,
        'timeline-content': timeline,
      }"
    >
      <div class="ma-n1 pb-1 pt-1 text-body-2 text--secondary">
        <div>
          <span>Authority:&nbsp;</span>
          <a :href="authorityLink">
            <span>{{ authority }}</span>
            <v-icon small class="fake-link">{{ mdiOpenInNew }}</v-icon>
          </a>
        </div>
        <div v-if="reason">
          <span>Reason:&nbsp;</span>
          <span>{{ reason }}</span>
        </div>

        <div v-for="attr,i in additionalAttributes" :key="i" >
          <p>{{attr.key}}: {{attr.value}}</p>
        </div>

        <div v-if="!expired">
          <v-icon small>{{ mdiShieldCheckOutline }}</v-icon>
          <router-link
            :to="{
              name: 'Credential',
              params: { sourceId, credentialId: credId },
            }"
            class="vertical-align-middle"
            >Credential verified</router-link
          >
        </div>
        <div v-if="effectiveDate">
          <span>Effective:&nbsp;</span>
          <span>{{ effectiveDate | formatDate }}</span>
        </div>
      </div>
      <slot name="content"></slot>
    </v-expansion-panel-content>
    <v-divider v-if="!timeline"></v-divider>
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
  @Prop({ default: false }) timeline!: boolean;
  @Prop({ default: "" }) reason!: string;
  @Prop({ default: "" }) credId!: string;
  @Prop({ default: ()=>[] }) additionalAttributes!: Array<{key:string, value:string}>

  get sourceId(): string {
    const { sourceId } = this.$route.params;
    return sourceId;
  }
}
</script>

<style lang="scss" scoped>
.timeline-header {
  &:hover {
    padding: 0px;
    outline: 1px solid $link-color !important;
    cursor: pointer;
  }
}
.timeline-content {
  background-color: lightgray;
}
</style>
