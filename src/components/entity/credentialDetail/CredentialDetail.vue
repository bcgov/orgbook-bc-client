<template>
  <div v-if="!loading">
    <BackTo :to="`/entity/${entitySourceID}`" :label="entityName" />
    <div v-if="credRevoked">
      <v-alert prominent type="error" class="red">
        <v-row align="center">
          <v-col class="grow">
            Credential has expired and can no longer be verified
          </v-col>
        </v-row>
      </v-alert>
    </div>
    <div v-else>
      <v-card rounded="sm" class="mb-5 card">
        <v-card-title class="pa-5">
          <div class="text-h6 font-weight-bold">
            <v-icon class="validated">{{ mdiShieldCheckOutline }}</v-icon>
            <span>{{ `${currCredTypeDesc} credential verified` }}</span>
          </div>
          <div class="text-body-1 verification-time">
            {{ `Cryptographically verified ${currDate}` }}
          </div>
        </v-card-title>
        <v-card-text class="pa-5 pt-0">
          <p>
            Issued: {{ currCredIssuedDate | formatDate }} • Effective:
            {{ currCredEffDate | formatDate }}
          </p>
          <p>The following verifications were successfully completed:</p>
          <ul class="unstyled-list ml-n1">
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="currCredIssuer !== undefined"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential issuer is {{ currCredIssuer }}</span>
              </div>
            </li>
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="currCredIssuer !== undefined"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential is held by {{ entityName }}</span>
              </div>
            </li>
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="currCredIssuer !== undefined"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential is valid</span>
              </div>
            </li>
            <li>
              <div class="d-flex pb-1">
                <v-icon
                  dense
                  class="icon-dense validated mr-1"
                  v-if="currCredIssuer !== undefined"
                  >{{ mdiCheckBold }}</v-icon
                >
                <span>Credential is tamper-free</span>
              </div>
            </li>
          </ul>
        </v-card-text>
      </v-card>

      <v-card rounded="sm" class="card mb-5">
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6 font-weight-bold pa-5">
              Claims proven
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-5 pt-0">
              <v-data-table
                dense
                :headers="headers"
                :items="proofValues"
                hide-default-header
                hide-default-footer
                disable-pagination
              >
                <template v-slot:[`item.attr_name`]="{ item }">
                  <div class="d-flex">
                    <v-icon
                      :class="{ invisible: !item.attr_val }"
                      class="validated mr-1"
                      >{{ mdiCheckBold }}</v-icon
                    >
                    <span>{{ item.attr_name }}</span>
                  </div>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <v-card rounded="sm" class="card mb-5">
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="text-h6 font-weight-bold pa-5">
              Proof Details
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-5 pt-0">
              <div class="proof-raw">
                <pre>{{ proofRaw }}</pre>
              </div>
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
import {
  ICredential,
  ICredentialFormatted,
} from "@/interfaces/api/v4/credential.interface";
import router from "@/router";
import moment from "moment";
import BackTo from "@/components/shared/BackTo.vue";

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
      "getPresentationId",
      "getPresentationEX",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchSelectedCredential",
      "setLoading",
      "fetchPresId",
      "fetchPresEx",
    ]),
  },
})
export default class CredentialDetail extends Vue {
  selectedTopic!: IFormattedTopic;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  getSelectedCredential!: ICredentialFormatted | undefined;
  loading!: boolean;
  getPresentationId!: string;
  getPresentationEX!: ICredentialProof;
  sourceId!: string;
  fetchSelectedCredential!: (id: string) => Promise<void>;
  fetchPresId!: (id: string) => Promise<void>;
  fetchPresEx!: (params: { id: string; presId: string }) => Promise<void>;
  setLoading!: (loading: boolean) => void;

  data(): Data {
    return {
      headers: [
        { text: "attr_name", align: "start", value: "attr_name" },
        { text: "attr_val", align: "start", value: "attr_val" },
      ],
    };
  }

  get currDate(): string {
    return moment(new Date()).format("MMM, DD YYYY [at] hh:mm a");
  }

  get entityName(): string | undefined {
    return this.getSelectedCredential?.topic?.names[0]?.text;
  }

  get entitySourceID(): string | undefined {
    return this.sourceId;
  }

  get currCredEffDate(): Date | undefined {
    return this.getSelectedCredential?.effective_date;
  }

  get currCredIssuedDate(): Date | undefined {
    return this.getSelectedCredential?.create_timestamp;
  }

  get currCredIssuer(): string | undefined {
    return this.getSelectedCredential?.credential_type?.issuer?.name;
  }

  get currCredTypeDesc(): string | undefined {
    return this.getSelectedCredential?.credential_type?.description;
  }

  get credRevoked(): boolean | undefined {
    return this.getSelectedCredential?.revoked;
  }

  get proofValues(): Record<string, string>[] | undefined {
    const rawVals =
      this.getPresentationEX?.result?.presentation?.requested_proof
        ?.revealed_attr_groups?.["self-verify-proof"]?.values;
    if (rawVals === undefined) {
      return rawVals;
    }
    return Object.keys(rawVals).map((key) => {
      return { attr_name: key, attr_val: rawVals[key].raw };
    });
  }

  get proofRaw(): string | undefined {
    const rawVals = this.getPresentationEX;
    if (rawVals === undefined) {
      return rawVals;
    }
    return JSON.stringify(rawVals?.result, null, 2);
  }

  isRelationshipCred(cred: ICredential): boolean {
    return cred.credential_type.description === "relationship.registries.ca";
  }

  // FIXME: Need to fix timing issue in the API first
  async created(): Promise<void> {
    this.setLoading(true);
    const { sourceId, credentialId } = this.$route.params;
    this.sourceId = sourceId;
    if (sourceId && credentialId) {
      await Promise.all([
        this.fetchSelectedCredential(credentialId),
        this.fetchPresId(credentialId),
      ]);
      //need a small timeout because the credential isn't always verified after fetchPresId returns
      await new Promise((r) => setTimeout(r, 500));
      await this.fetchPresEx({
        id: credentialId,
        presId: this.getPresentationId,
      });
    } else {
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
.proof-raw {
  overflow: scroll;
}
</style>
