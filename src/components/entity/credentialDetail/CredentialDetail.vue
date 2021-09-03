<template>
  <div>
    <v-icon>{{ mdiArrowLeft }}</v-icon
    ><a :href="`/entity/${entitySourceID}`">{{ entityName }}</a>
    <v-btn @click="test">TEST</v-btn>
    <v-container>
      <v-card>
        <v-card-title
          ><v-icon>{{ mdiShieldCheckOutline }}</v-icon>
          {{ `Registration credential verified` }}</v-card-title
        >
        <v-container>
          <p class="verificationTime">
            {{ `Cryptographically verified ${currDate}` }}
          </p>
          <p>
            Issued: {{ currCredEffDate | formatDate }} • Effective:
            {{ currCredEffDate | formatDate }}
          </p>
          <p>The following verifications were successfully completed:</p>
          <v-list flat>
            <v-list-item>
              <v-list-item-icon v-if="currCredIssuer !== undefined">
                <v-icon>{{ mdiShieldCheckOutline }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>Credential issuer is {{ currCredIssuer }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon v-if="currCredIssuer !== undefined">
                <v-icon>{{ mdiShieldCheckOutline }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>Credential is held by {{ entityName }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon v-if="currCredIssuer !== undefined">
                <v-icon>{{ mdiShieldCheckOutline }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>Credential is valid</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon v-if="currCredIssuer !== undefined">
                <v-icon>{{ mdiShieldCheckOutline }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>Credential is tamper-free</p>
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
            <v-expansion-panel-header> Claims proven </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
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
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import {
  getRelationshipName,
  credOrRelationshipToDisplay,
} from "@/utils/entity";
@Component({
  computed: {
    ...mapGetters([
      "mdiArrowLeft",
      "mdiShieldCheckOutline",
      "selectedTopic",
      "selectedTopicFullCredentialSet",
      "getSelectedCredential",
    ]),
  },
  methods: {
    ...mapActions(["setSelectedCredential"]),
  },
})
export default class CredentialDetail extends Vue {
  selectedTopic!: IFormattedTopic;
  selectedTopicFullCredentialSet!: Array<ICredentialSet>;
  getSelectedCredential!: ICredential | undefined;
  setSelectedCredential!: (cred: ICredential) => void;

  get currDate(): string {
    return moment(new Date()).format("MMM, DD YYYY [at] hh:mm a");
  }

  get entityName(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.text;
  }

  get entitySourceID(): string | undefined {
    return this.selectedTopic?.source_id;
  }

  isRelationshipCred(cred: ICredential): boolean {
    return cred.credential_type.description === "relationship.registries.ca";
  }

  test() {
    console.log(this.currCredEffDate);
  }

  get currCredEffDate(): Date | undefined {
    return this.getSelectedCredential?.effective_date;
  }

  get currCredIssuedDate(): Date | undefined {
    return this.getSelectedCredential?.created_timestamp;
  }

  get currCredIssuer(): string | undefined {
    return this.getSelectedCredential?.credential_type?.issuer?.name;
  }

  getCurrCred(id: string) {
    let currCred: ICredential | undefined = undefined;
    this.selectedTopicFullCredentialSet.forEach((credSet) => {
      if (currCred === undefined) {
        currCred = credSet.credentials.find(
          (cred) => (cred.id as unknown as string) == id
        );
      } //can't break from inside foreach
    });
    return currCred;
  }

  async created(): Promise<void> {
    const { credentialID } = this.$route.params;
    if (credentialID) {
      const currCred = this.getCurrCred(credentialID);
      if (currCred !== undefined) this.setSelectedCredential(currCred);
    }
  }
}
</script>

<style lang="scss">
.verificationTime {
  color: $light-gray;
}
</style>