<template>
  <div v-if="!loading">
    <BackTo :to="`/entity/${topicSourceId}`" :label="topicName" />
    <div v-if="revoked">
      <v-alert prominent type="error" class="red">
        <v-row align="center">
          <v-col class="grow">
            {{ errorMessage }}
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <div>
      <v-card rounded="sm" class="mb-5 card">
        <v-card-title class="pa-5 pb-0">
          <p class="text-h6 font-weight-bold wrap">
            <span>{{ `${credentialTypeDescription} credential` }}</span
            ><span> claims</span>
          </p>
        </v-card-title>
        <v-card-text class="pa-5 pt-0">
          <p>
            Issued: {{ issuedDate | formatDate }} • Effective:
            {{ effectiveDate | formatDate }}
            <span v-if="revokedDate" span>
              - {{ revokedDate | formatDate }}</span
            >
          </p>
          <p v-if="!revoked">
            The following verifications were successfully completed:
          </p>
          <p v-else>The following claims were successfully found:</p>
          <ul class="unstyled-list ml-n1">
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="issuer !== undefined && !revoked"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential issuer is {{ issuer }}</span>
              </div>
            </li>
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="issuer !== undefined && !revoked"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential is held by {{ topicName }}</span>
              </div>
            </li>
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="issuer !== undefined && !revoked"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span
                  >Credential is <span v-if="!revoked">valid</span
                  ><span v-else>expired</span></span
                >
              </div>
            </li>
            <li>
              <div v-if="!revoked" class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="issuer !== undefined"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential is tamper-free</span>
              </div>
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card rounded="sm" class="card mb-5" v-if="rawData">
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6 font-weight-bold pa-5">
              <p>Claims <span v-if="!revoked"> proven</span></p>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-5 pt-0">
              <div v-if="rawData" class="raw">
                <pre>{{ rawData }}</pre>
              </div>
              <v-data-table
                dense
                :headers="headers"
                hide-default-header
                hide-default-footer
                disable-pagination
                v-else
              >
                <template v-slot:[`item.attr_name`]="{ item }">
                  <div class="d-flex">
                    <v-icon
                      :class="{ invisible: !item.attr_val || revoked }"
                      class="validated mr-1"
                      >{{ mdiCheckBold }}</v-icon
                    >
                    <span>{{ item.attr_name | formatClaim }}</span>
                  </div>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ICredentialProof } from "@/interfaces/api/v3/credential-verified.interface";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialFormatted } from "@/interfaces/api/v4/credential.interface";
import i18n from "@/i18n/index";
import router from "@/router";
import moment from "moment";
import BackTo from "@/components/shared/BackTo.vue";
import { unwrapTranslations, isExpired } from "@/utils/entity";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";

interface Data {
  headers: Record<string, string>[];
}

@Component({
  components: {
    BackTo,
  },
  computed: {
    ...mapGetters([
      "mdiArrowLeft",
      "mdiShieldCheckOutline",
      "mdiCheckBold",
      "selectedTopic",
      "selectedTopicFullCredentialSet",
      "getSelectedCredential",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchSelectedCredential",
      "setLoading",
      "fetchFormattedIdentifiedTopic",
    ]),
  },
})
export default class CredentialDetail extends Vue {
  selectedTopic!: IFormattedTopic;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  getSelectedCredential!: ICredentialFormatted | undefined;
  loading!: boolean;
  sourceId!: string;
  isExpired = isExpired;
  fetchSelectedCredential!: (id: string) => Promise<void>;
  fetchFormattedIdentifiedTopic!: ({
    sourceId,
    type,
  }: {
    sourceId: string;
    type: string;
  }) => Promise<void>;
  setLoading!: (loading: boolean) => void;

  data(): Data {
    return {
      headers: [
        { text: "attr_name", align: "start", value: "attr_name" },
        { text: "attr_val", align: "start", value: "attr_val" },
      ],
    };
  }

  get selectedCredential(): ICredentialFormatted | undefined {
    return this.getSelectedCredential;
  }

  get now(): string {
    return moment(new Date()).format("MMM, DD YYYY [at] hh:mm a");
  }

  get topicSourceId(): string | undefined {
    return this.sourceId;
  }

  get topicName(): string | undefined {
    return this.selectedTopic.names[0]?.text;
  }

  get issuer(): string | undefined {
    return this.selectedCredential?.credential_type?.issuer?.name;
  }

  get credentialType(): ICredentialType | undefined {
    return this.selectedCredential?.credential_type;
  }

  get credentialTypeDescription(): string | undefined {
    if (!this.selectedCredential) {
      return undefined;
    }
    if (this.credentialType?.format === "vc_di") {
      // TODO: Eventually, this should be a translation from OCA
      return this.credentialType?.schema?.name;
    }
    return (
      unwrapTranslations(this.credentialType?.schema_label)?.[i18n.locale]
        ?.label ??
      this.credentialType?.description ??
      ""
    );
  }
  get revoked(): boolean | undefined {
    return (
      this.selectedCredential?.revoked ||
      !!this.isExpired(this.selectedCredential?.attributes)
    );
  }

  get effectiveDate(): Date | undefined {
    return this.selectedCredential?.effective_date;
  }

  get issuedDate(): Date | undefined {
    return this.selectedCredential?.create_timestamp;
  }

  get revokedDate(): Date | string | undefined {
    return (
      this.selectedCredential?.revoked_date ||
      this.isExpired(this.selectedCredential?.attributes)
    );
  }

  get errorMessage(): string {
    if (!this.revoked) {
      return "";
    }
    // Credential is expired and has been replaced. It can no longer be verified. (replaced and expired)
    // Credential is expired. It can no longer be verified. (expired)
    // Credential has been replaced. It can no longer be verified. (replaced)
    const replaced = !!this.selectedCredential?.revoked;
    const expired = !!this.isExpired(this.selectedCredential?.attributes);
    let base = "Credential ";
    if (expired) {
      base += "is expired";
      if (replaced) {
        base += " and ";
      } else {
        base += ".";
      }
    }
    if (replaced) {
      base += "has been replaced.";
    }
    return base
  }

  get rawData(): unknown {
    if (this.credentialType?.format === "vc_di") {
      return JSON.stringify(this.selectedCredential?.raw_data || {}, null, 2);
    }
    return null;
  }

  // FIXME: Need to fix timing issue in the API first
  async created(): Promise<void> {
    this.setLoading(true);
    const { sourceId, type, credentialId } = this.$route.params;
    this.sourceId = sourceId;
    if (sourceId && credentialId) {
      await Promise.all([
        this.fetchSelectedCredential(credentialId),
        this.fetchFormattedIdentifiedTopic({
          sourceId,
          type,
        }),
      ]);
    } else {
      router.push("/search");
    }
    if (!this.selectedCredential || !this.selectedTopic) {
      // cred or source id invalid, failed to load credential
      console.error(
        "Invalid credential or source Id. Credential detail not retrieved"
      );
      router.push("/search");
    }
    this.setLoading(false);
  }
}
</script>

<style lang="scss">
.card {
  @include card-raised;
}

.wrap {
  word-break: break-word;
}

.verification-time {
  color: $gray;
}

.validated {
  color: $success-color !important;
}

.invisible {
  visibility: hidden;
}

.progress {
  color: $secondary-color;
}

.raw {
  overflow: scroll;
}
</style>
