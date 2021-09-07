<template>
  <div>
    <div v-if="loading" class="progress d-flex align-center justify-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-icon>{{ mdiArrowLeft }}</v-icon
      ><a :href="`/entity/${entitySourceID}`">{{ entityName }}</a>
      <!-- <v-btn @click="test">TEST</v-btn> -->
      <v-container>
        <v-card>
          <v-card-title class="one-line"
            ><p>
              <v-icon class="validated">{{ mdiShieldCheckOutline }}</v-icon>
              {{ `Registration credential verified` }}
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
                    <v-icon class="validated" v-if="currCredIssuer !== undefined">{{
                      mdiShieldCheckOutline
                    }}</v-icon>
                    Credential issuer is {{ currCredIssuer }}
                  </p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <p>
                    <v-icon class="validated" v-if="currCredIssuer !== undefined">{{
                      mdiShieldCheckOutline
                    }}</v-icon>
                    Credential is held by {{ entityName }}
                  </p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <p>
                    <v-icon class="validated" v-if="currCredIssuer !== undefined">{{
                      mdiShieldCheckOutline
                    }}</v-icon>
                    Credential is valid
                  </p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <p>
                    <v-icon class="validated" v-if="currCredIssuer !== undefined">{{
                      mdiShieldCheckOutline
                    }}</v-icon>
                    Credential is tamper-free
                  </p>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-container>
        </v-card>
      </v-container>

      <v-container>
        <v-card>
          <v-expansion-panels>
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
                <template v-slot:[`item.attr_name`]="{item}">
                  <p><v-icon class="validated">{{mdiShieldCheckOutline}}</v-icon> {{item.attr_name}}</p>
              </template>
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-container>

      <v-container>
        <v-card>
          <v-expansion-panels>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import { selectFirstAttrItem } from "@/utils/attribute-filter";
import moment from "moment";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import {
  ICredential,
  ICredentialFormatted,
} from "@/interfaces/api/v4/credential.interface";

import router from "@/router";
import {
  ICredentialPresExchange,
  ICredentialProof,
} from "@/interfaces/api/v3/credential-verified.interface";

interface Data {
  headers: Record<string, string>[];
}

@Component({
  computed: {
    ...mapGetters([
      "mdiArrowLeft",
      "mdiShieldCheckOutline",
      "selectedTopic",
      "selectedTopicFullCredentialSet",
      "getSelectedCredential",
      "getPresentationID",
      "getPresentationEX",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchSelectedCredential",
      "setLoading",
      "fetchPresID",
      "fetchPresEx",
    ]),
  },
})
export default class CredentialDetail extends Vue {
  selectedTopic!: IFormattedTopic;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  getSelectedCredential!: ICredentialFormatted | undefined;
  loading!: boolean;
  getPresentationID!: string;
  getPresentationEX!: ICredentialProof;
  fetchSelectedCredential!: (id: string) => Promise<void>;
  fetchPresID!: (id: string) => Promise<void>;
  fetchPresEx!: (params: { id: string; presID: string }) => Promise<void>;
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
    return this.getSelectedCredential?.local_name?.text;
  }

  get entitySourceID(): string | undefined {
    return this.getSelectedCredential?.topic.source_id;
  }

  isRelationshipCred(cred: ICredential): boolean {
    return cred.credential_type.description === "relationship.registries.ca";
  }

  test() {
    console.log(
      JSON.stringify(
        this.getPresentationEX?.result?.presentation?.requested_proof
          ?.revealed_attr_groups?.["self-verify-proof"]?.values
      )
    );
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

    const { credentialID } = this.$route.params;
    if (credentialID) {
      await Promise.all([
        this.fetchSelectedCredential(credentialID),
        this.fetchPresID(credentialID),
      ]);
      await new Promise((r) => setTimeout(r, 1000));
      await this.fetchPresEx({
        id: credentialID,
        presID: this.getPresentationID,
      });
    } else {
      router.push("/");
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
.validated{
  color: $success-color !important;
}
</style>