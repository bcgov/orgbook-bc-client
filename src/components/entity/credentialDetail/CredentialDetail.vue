<template>
  <div>
    <div v-if="loading" class="progress d-flex align-center justify-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-icon>{{ mdiArrowLeft }}</v-icon
      ><a :href="`/entity/${entitySourceID}`">{{ entityName }}</a>
      <div v-if="credRevoked">
        <v-container>
          <v-alert prominent type="error" class="red">
            <v-row align="center">
              <v-col class="grow">
                Credential has expired and can no longer be verified
              </v-col>
            </v-row>
          </v-alert>
        </v-container>
      </div>
      <div v-else>
        <v-container>
          <v-card outlined>
            <v-card-title class="one-line"
              ><p>
                <v-icon class="validated">{{ mdiShieldCheckOutline }}</v-icon>
                {{ `${currCredTypeDesc} credential verified` }}
              </p></v-card-title
            >
            <v-container>
              <p class="verificationTime">
                {{ `Cryptographically verified ${currDate}` }}
              </p>
              <p>
                Issued: {{ currCredIssuedDate | formatDate }} • Effective:
                {{ currCredEffDate | formatDate }}
              </p>
              <p>The following verifications were successfully completed:</p>
              <v-list flat>
                <v-list-item>
                  <v-list-item-content>
                    <p>
                      <v-icon
                        class="validated"
                        v-if="currCredIssuer !== undefined"
                        >{{ mdiCheckBold }}</v-icon
                      >
                      Credential issuer is {{ currCredIssuer }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <p>
                      <v-icon
                        class="validated"
                        v-if="currCredIssuer !== undefined"
                        >{{ mdiCheckBold }}</v-icon
                      >
                      Credential is held by {{ entityName }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <p>
                      <v-icon
                        class="validated"
                        v-if="currCredIssuer !== undefined"
                        >{{ mdiCheckBold }}</v-icon
                      >
                      Credential is valid
                    </p>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <p>
                      <v-icon
                        class="validated"
                        v-if="currCredIssuer !== undefined"
                        >{{ mdiCheckBold }}</v-icon
                      >
                      Credential is tamper-free
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
          </v-card>
        </v-container>

        <v-container>
          <v-card outlined>
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Claims proven
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    :headers="headers"
                    :items="proofValues"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
                  >
                    <template v-slot:[`item.attr_name`]="{ item }">
                      <p>
                        <v-icon
                          :class="{ invisible: !item.attr_val }"
                          class="validated"
                          >{{ mdiCheckBold }}</v-icon
                        >
                        {{ item.attr_name | formatClaim}}
                      </p>
                    </template>
                  </v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-container>

        <v-container>
          <v-card outlined>
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Proof Details
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea
                    readonly
                    :value="proofRaw"
                    auto-grow
                    rows="8"
                    cols="40"
                  ></v-textarea>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import moment from "moment";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import {
  ICredential,
  ICredentialFormatted,
} from "@/interfaces/api/v4/credential.interface";

import router from "@/router";
import { ICredentialProof } from "@/interfaces/api/v3/credential-verified.interface";

interface Data {
  headers: Record<string, string>[];
}

@Component({
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

  isRelationshipCred(cred: ICredential): boolean {
    return cred.credential_type.description === "relationship.registries.ca";
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
.verificationTime {
  color: $light-gray;
}
.progress {
  color: $secondary-color;
}
.one-line {
  word-break: normal;
}
.validated {
  color: $success-color !important;
}
.invisible {
  visibility: hidden;
}
</style>
