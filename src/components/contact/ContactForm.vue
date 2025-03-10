<template>
  <div>
    <v-form ref="form" :disabled="loading">
      <div>
        <v-select
          outlined
          dense
          v-model="formData.reason"
          :items="requestTypes"
          label="Reason for contact"
        ></v-select>
      </div>

      <div
        v-if="
          formData.reason &&
          formData.reason == 'REGISTER_ORGANIZATION' &&
          !additionalHelp
        "
      >
        <p class="font-weight-bold">
          How to add your organization to OrgBook BC
        </p>
        <p>Not finding your organization in OrgBook BC?</p>
        <p>
          One reason you might not be finding the entity for which you are
          searching is that the organization has not been registered with BC
          Registries. If the organization has been registered, search for the BC
          Registries ID (it has a format like "FM1234567"). You can also try
          searching by your 9-digit Business Number from CRA, if that number is
          registered with BC Registries.
        </p>
        <p>
          If you need to register the organization, these links may help.
          <a
            href="https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies"
            >Register your business in BC</a
          >
          or follow the full
          <a
            href="https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business"
            >step-by-step guide to starting a BC business</a
          >.
        </p>
        <p>
          If you need additional information, please contact the BC Registries
          Help Desk via email
          <a href="mailto:bcregistries@gov.bc.ca">bcregistries@gov.bc.ca</a>, or
          by calling the BC Registries Help Desk at 1-800-663-6102.
        </p>
        <p class="fake-link" @click="additionalHelp = true">
          I still need help
        </p>
      </div>

      <div v-else-if="formData.reason">
        <p class="font-weight-bold" :hidden="incorrectHidden">
          OrgBook BC cannot make corrections to the data. Only the issuing
          organization can do so. Complete the information below and we will
          forward your message to the appropriate organization.
        </p>

        <v-text-field
          outlined
          dense
          v-model="formData.from_name"
          label="Name"
          :rules="alwaysRequired"
        ></v-text-field>

        <v-text-field
          outlined
          dense
          v-model="formData.from_email"
          label="Email address"
          :rules="[...alwaysRequired, ...emailRules]"
        ></v-text-field>

        <div :hidden="incorrectHidden">
          <v-select
            outlined
            dense
            v-model="formData.error"
            :items="formattedCredentialTypes"
            label="What Information is incorrect?"
            :rules="condRequired"
          ></v-select>

          <v-text-field
            outlined
            dense
            v-model="formData.identifier"
            label="Identifier (such as the incorporation number, registration number, or licence / permit number)"
            :rules="condRequired"
          ></v-text-field>
        </div>

        <v-textarea
          outlined
          dense
          v-model="formData.comments"
          :label="labelMessage"
          :rules="alwaysRequired"
        ></v-textarea>
      </div>

      <v-btn
        id="contactSubmitButton"
        v-if="
          this.formData.reason != 'REGISTER_ORGANIZATION' || this.additionalHelp
        "
        @click="submit"
        depressed
        :disabled="loading"
        aria-label="submit-button"
        >Submit</v-btn
      >
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { useAppState, useContactState, useCredentialState, useCredentialTypeState, useLikeState } from "@/stores"
import { mapActions as pmapActions, mapState } from "pinia";

import router from "@/router";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import { IContactRequest } from "@/interfaces/api/v4/contact.interface";
import { contactReason } from "@/stores/contact";
import { unwrapTranslations } from "@/utils/entity";

interface Data {
  formData: IContactRequest;
  additionalHelp: boolean;
  emailRules: Array<boolean | string | ((v: string) => string | boolean)>;
  alwaysRequired: Array<boolean | string | ((v: string) => string | boolean)>;
  condRequired: Array<boolean | string | ((v: string) => string | boolean)>;
}
const emailRegexp = RegExp(/.+@.+/)

export default {
  data(): Data {
    return {
      formData: {
        reason: "FEEDBACK",
        from_name: "",
        from_email: "",
        comments: "",
      },
      additionalHelp: false,
      emailRules: [
        // eslint-disable-next-line
        (v: string) => emailRegexp.test(v) || "E-mail must be valid",
      ],
      alwaysRequired: [(v: string) => !!v || "This field is required"],
      condRequired: [
        (v: string) => !!v || this.incorrectHidden || "This field is required",
      ],
    };
  },
  methods: {
    ...pmapActions(useAppState, ["setLoading"]),
    ...pmapActions(useContactState, ["sendContact"]),
    async submit(e: Event): Promise<void> {
      e.preventDefault();
      const isFormValid = (
        this.$refs.form as Vue & { validate: () => boolean }
      ).validate();
      if (isFormValid) {
        this.setLoading(true);
        if (this.getLikeStatus !== "") {
          this.formData.comments = `${this.getLikeStatus}:\n${this.formData.comments}`;
        }
        const data = { ...this.formData };
        data.reason = contactReason[this.formData.reason];
        if (this.formData.error !== undefined) {
          data.error = this.formattedCredentialTypes.filter(
            (type) => String(type.value) === this.formData.error
          )[0]?.text;
        }
        await this.sendContact(data);
        this.setLoading(false);
        router.push({ name: "Search" });
      }
    }

  },
  computed: {
    ...mapState(useCredentialTypeState, ["credentialTypes"]),
    ...mapState(useLikeState, ["getLikeStatus"]),
    ...mapState(useAppState, {loading: "getLoading"}),
    requestTypes: function(): Array<{ text: string; value: string }> {
      return Object.keys(contactReason).map((key) => ({
        text: contactReason[key],
        value: key,
      }));
    },
    formattedCredentialTypes: function(): Array<{ text: string; value: number }> {
      return this.credentialTypes.map((credentialType) => ({
        // TODO: remove unwrap translations functions after backend update
        text: unwrapTranslations(credentialType.schema_label)?.[this.$i18n.locale]
          ?.label ??
          credentialType.description ??
          "",
        value: credentialType.id,
      }));
    },
    incorrectHidden: function(): boolean {
      return this.formData.reason !== "INCORRECT_INFO";
    },
    labelMessage: function(): string {
      return this.formData.reason === "INCORRECT_INFO"
        ? "Describe the problem"
        : "Message";
    },
  },
}
</script>

<style lang="scss" scoped>
#contactSubmitButton {
  background: $primary-color !important;
  color: $white !important;
}
</style>
