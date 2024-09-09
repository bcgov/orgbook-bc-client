<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      :class="{
        'pa-5 pt-4 pb-4': true,
        'timeline-header': timeline,
      }"
    >
      <v-row>
        <v-col cols="12" sm="12" class="pa-0">
          <slot name="header"></slot>
        </v-col>
        <div v-if="!disableDefaultHeader">
          <v-col v-if="topicName" cols="12" sm="12" class="pa-0">
            <p class="mb-0">{{ topicName }}</p>
          </v-col>
          <v-col v-if="credTitle" cols="12" sm="12" class="pa-0">
            <p class="mb-1">
              {{ credTitle["key"] }}:
              {{
                translateValue(
                  credTitle["accessor"],
                  credTitle["value"],
                  entityType
                )
              }}
            </p>
          </v-col>
        </div>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      :class="{
        'pt-0 px-n1': true,
        'pt-4 timeline-content': timeline,
      }"
    >
      <div class="ma-n1 py-1 text-body-2 text--secondary">
        <div :class="{ 'pb-3': timeline && !highlightedAttr.length }">
          <div class="font-weight-bold">Authority</div>
          <div>
            <a v-if="getAuthorityLink" :href="getAuthorityLink">
              <span>{{ getAuthority }}</span>
              <v-icon small class="fake-link">{{ mdiOpenInNew }}</v-icon>
            </a>
            <span v-else>{{ getAuthority }}</span>
          </div>
        </div>

        <v-row>
          <v-col
            class="pl-0"
            v-for="(attr, i) in highlightedAttr"
            :key="i"
            cols="12"
            sm="12"
          >
            <div class="font-weight-bold">{{ attr["key"] }}</div>
            <div>
              {{ translateValue(attr["accessor"], attr["value"], entityType) }}
            </div>
          </v-col>
        </v-row>

        <div>
          <v-icon small v-if="!getCredRevoked">{{
            mdiShieldCheckOutline
          }}</v-icon>
          <router-link
            :to="{
              name: 'Credential',
              params: { sourceId, credentialId: getCredId },
            }"
            class="vertical-align-middle"
            >Credential<span v-if="!getCredRevoked"> verified</span
            ><span v-else> claims</span></router-link
          >
        </div>
        <div v-if="effectiveDate">
          <span>Effective:&nbsp;</span>
          <span>{{ effectiveDate | formatDate }}</span>
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
import { $translate } from "@/i18n/translate";
import { dateFilter } from "@/filters/date.filter";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import { TranslateResult } from "vue-i18n";
import { isExpired, toTranslationFormat } from "@/utils/entity";

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
export default class CredentialItem extends Vue {
  @Prop({}) cred!: ICredentialDisplayType;

  @Prop({ default: "" }) entityType!: string;
  @Prop({ default: "" }) authority!: string;
  @Prop({ default: "" }) authorityLink!: string;
  @Prop({ default: "" }) effectiveDate!: string;
  @Prop({ default: false }) expired!: boolean;
  @Prop({ default: "" }) credId!: number;
  @Prop({ default: false }) disableDefaultHeader!: boolean;

  @Prop({ default: false }) timeline!: boolean;

  selectedTopic!: IFormattedTopic;

  credentialTypes!: ICredentialType[];

  isExpired = isExpired;
  toTranslationFormate = toTranslationFormat;
  $translate = $translate;

  get getAuthorityLink(): string | URL {
    return this.cred ? this.cred.authorityLink : this.authorityLink;
  }

  get getAuthority(): string {
    return this.cred ? this.cred.authority : this.authority;
  }

  get getCredRevoked(): boolean {
    return this.cred
      ? this.cred.revoked || !!this.isExpired(this.cred.attributes)
      : this.expired;
  }

  get getCredId(): number {
    return this.cred ? this.cred.id : this.credId;
  }

  get sourceId(): string {
    const { sourceId } = this.$route.params;
    return sourceId;
  }

  get topicName(): string | undefined {
    if (!this.cred) {
      return undefined;
    }
    let ret = this.cred.value as string | undefined;
    if (this.cred.type !== "entity_name") {
      ret = this.selectedTopic.names[0]?.text;
    }
    return ret;
  }

  getClaimLabel(
    id: number,
    claimLabel: string | undefined
  ): string | undefined {
    const credentialType = selectFirstAttrItem(
      { key: "id", value: id },
      this.credentialTypes
    );
    // TODO: Eventually this should be a translation from OCA
    if (credentialType?.format === "vc_di") {
      return claimLabel;
    } else if (credentialType && claimLabel) {
      return credentialType?.claim_labels?.[claimLabel]?.[i18n.locale];
    }
  }

  translateValue(
    accessor: string,
    val: string,
    entityType: string
  ): string | TranslateResult {
    // need entity type to properly translate due to LEAR entries
    const res = $translate(
      toTranslationFormat(accessor + "." + val, entityType)
    );
    if (res != toTranslationFormat(accessor + "." + val, entityType)) {
      return res;
    }
    return val;
  }

  get credTitle(): Record<string, string> | undefined {
    if (!this.cred) {
      return undefined;
    }
    let retval: { [index: string]: string | undefined } = {};
    const claimLabel = this.getClaimLabel(
      this.cred.credential_type_id,
      this.cred.credential_title
    );

    const default_title = this.cred.rel_id
      ? { "Relationship description": this.cred.rel_id as string }
      : { "Registration number": this.sourceId };

    if (claimLabel === undefined) {
      retval = default_title;
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
        retval = default_title;
      }
    }
    let accessor = this.cred.credential_title ? this.cred.credential_title : "";
    return {
      key: Object.keys(retval)[0],
      value: retval[Object.keys(retval)[0]] as string,
      accessor: accessor,
    };
  }

  get highlightedAttr(): Record<string, string>[] | undefined {
    if (!this.cred) {
      return undefined;
    }
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
