<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="pa-5 pt-4 pb-4 timeline-header">
      <v-row>
        <v-col cols="12" sm="12" class="pb-0">
          <slot name="header"></slot>
        </v-col>
        <v-col cols="12" sm="12" class="pb-1 pt-0">
          <p class="mb-0" v-if="topicName">{{ topicName }}</p>
        </v-col>
        <v-col cols="12" sm="12" class="pb-1 pt-0">
          <p class="mb-1" v-if="credTitle">
            {{ credTitle["key"] }}:
            {{ translateValue(credTitle["accessor"], credTitle["value"]) }}
          </p>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="timeline-content pt-4 pl-n1 pr-n1">
      <div class="ma-n1 pb-1 pt-1 text-body-2 text--secondary">
        <div>
          <span>Authority:&nbsp;</span>
          <a :href="cred.authorityLink">
            <span>{{ cred.authority }}</span>
            <v-icon small class="fake-link">{{ mdiOpenInNew }}</v-icon>
          </a>
        </div>

        <v-row>
          <v-col
            class="pl-0"
            v-for="(attr, i) in highlightedAttr"
            :key="i"
            cols="12"
            sm="12"
          >
            {{ attr["key"] }}:
            <span v-t="attr['accessor'] + '.' + attr['value']"></span>
          </v-col>
        </v-row>

        <div>
          <v-icon small v-if="!cred.revoked">{{
            mdiShieldCheckOutline
          }}</v-icon>
          <router-link
            :to="{
              name: 'Credential',
              params: { sourceId, credentialId: cred.id },
            }"
            class="vertical-align-middle"
            >Credential<span v-if="!cred.revoked"> verified</span
            ><span v-else> claims</span></router-link
          >
        </div>
      </div>
      <slot name="content"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/filters/date.filter";
import { mapGetters } from "vuex";
import { ICredentialDisplayType } from "@/interfaces/api/v4/credential.interface";
import { selectFirstAttrItem } from "@/utils/attribute";
import i18n from "@/i18n/index";
import { dateFilter } from "@/filters/date.filter";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialTypeClaimLabels } from "@/interfaces/api/v4/credential.interface";
import { TranslateResult } from "vue-i18n";

@Component({
  computed: {
    ...mapGetters([
      "mdiOpenInNew",
      "mdiShieldCheckOutline",
      "selectedTopic",
      "credentialTypes",
    ]),
  },
})
export default class HighlightedCredItem extends Vue {
  @Prop({}) cred!: ICredentialDisplayType;

  selectedTopic!: IFormattedTopic;

  credentialTypes!: ICredentialTypeClaimLabels[];

  get sourceId(): string {
    const { sourceId } = this.$route.params;
    return sourceId;
  }

  get topicName(): string | undefined {
    let ret = this.cred.value as string | undefined;
    if (this.cred.type !== "entity_name") {
      ret = this.selectedTopic.names[0]?.text;
    }
    return ret;
  }

  getClaimLabel(
    id: number,
    claim_label: string | undefined
  ): string | undefined {
    const credType = selectFirstAttrItem(
      { key: "id", value: id },
      this.credentialTypes
    );
    if (
      credType !== undefined &&
      claim_label !== undefined &&
      credType.claim_labels[claim_label]
    ) {
      return credType.claim_labels[claim_label][i18n.locale];
    } else {
      return undefined;
    }
  }

  translateValue(accessor: string, val: string): string | TranslateResult {
    const res = this.$t(accessor + "." + val);
    if (res != accessor + "." + val) {
      return res;
    }
    return val;
  }

  get credTitle(): Record<string, string> {
    let retval: { [index: string]: string } = {};
    const claimLabel = this.getClaimLabel(
      this.cred.credential_type_id,
      this.cred.credential_title
    );

    if (claimLabel === undefined) {
      retval = { "Registration number": this.sourceId };
    } else {
      let value = selectFirstAttrItem(
        { key: "type", value: this.cred.credential_title },
        this.cred.attributes
      );
      if (value?.format === "datetime") {
        value.value = value.value as string;
      }

      if (value?.value) {
        retval[claimLabel] = value.value as string;
      } else {
        retval = { "Registration number": this.sourceId };
      }
    }
    let accessor = this.cred.credential_title ? this.cred.credential_title : "";
    return {
      key: Object.keys(retval)[0],
      value: retval[Object.keys(retval)[0]],
      accessor: accessor,
    };
  }

  get highlightedAttr(): Record<string, string>[] {
    let retval: Record<string, string>[] = [];
    if (this.cred.highlighted_attributes) {
      this.cred.highlighted_attributes.forEach((accessor) => {
        const attrLabel = this.getClaimLabel(
          this.cred.credential_type_id,
          accessor
        );
        let attrValue = "";
        if (attrLabel) {
          const match = selectFirstAttrItem(
            { key: "type", value: accessor },
            this.cred.attributes
          );
          if (match?.format === "datetime") {
            attrValue = dateFilter(match.value as string) as string;
          } else {
            attrValue = match?.value as string;
          }

          if (attrValue) {
            retval.push({
              key: attrLabel,
              value: attrValue,
              accessor: accessor,
            });
          }
        }
      });
    }
    return retval;
  }

  async created(): Promise<void> {
    // console.log(JSON.stringify(this.credentialTypes))
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
