<template>
  <div>
    <v-form ref="form" :disabled=loading>
    <div>
      <h3>Reason for contact</h3>
      <v-select outlined v-model="formData.reason" :items="requestTypes" label="Select a Reason"></v-select>
    </div>

    <div v-if="formData.reason && formData.reason == 'listed'">
      <strong>How to add your organization to OrgBook BC</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra 
        justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, 
        nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </p>
    </div>

    <div v-else-if="formData.reason">
      <strong :hidden="incorrectHidden">
        OrgBook BC cannot make corrections to the data. Only the issuing organization can do so. Complete the information below and we will forward your message to the appropriate organization. 
      </strong>

      <v-text-field outlined v-model="formData.from_name" required label="Name"></v-text-field>

      <v-text-field outlined v-model="formData.from_email" label="Email address"></v-text-field>

      <div :hidden="incorrectHidden">
        <v-select outlined v-model="formData.error" :items="pagedCredentialTypes" label="What Information is incorrect?"></v-select>

        <v-text-field outlined v-model="formData.identifier" label="Identifier (such as the incorporation number, registration number, or licence / permit number)"></v-text-field>
      </div>

      <v-textarea outlined v-model="formData.comments" :label="labelMessage"></v-textarea>

    </div>
    

    <v-btn v-if="formData.reason && formData.reason != 'listed'" @click="submit" depressed color="primary" :disabled="loading">Submit</v-btn>
  </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { ContactRequest, IncorrectInfoContactRequest } from '@/store/modules/contact'
import router from '@/router';

const API_BASE='http://localhost:3000'


@Component({
  computed: {
    ...mapGetters(["pagedCredentialTypes", "requestTypes", "loading"]),
  },
  methods: {
    ...mapActions(["fetchCredentialTypes", "fetchRequestTypes", "postRequest", "setLoading"]),
  },
})
export default class ContactForm extends Vue {
  formData!: ContactRequest | IncorrectInfoContactRequest
  data() {
    return {
      formData: {reason:""}
    }
  }

  fetchCredentialTypes!: () => Promise<void>;
  fetchRequestTypes!: (url:string) => Promise<void>;
  postRequest!: (feedback: ContactRequest|IncorrectInfoContactRequest) => Promise<void>;
  setLoading!: (loading: boolean) => void;

  async created(): Promise<void>{
    this.setLoading(true)
    await Promise.all(
      [
        this.fetchRequestTypes(API_BASE+"/reasonItems"),
        this.fetchCredentialTypes()
      ]
    )
    this.setLoading(false)
  }


  async submit (e: Event): Promise<void> {
    e.preventDefault();
    const isFormValid = (
      this.$refs.form as Vue & { validate: () => boolean }
    ).validate();
    if (isFormValid) {
      this.setLoading(true);
      await this.postRequest(this.formData);
      router.push('/');
      this.setLoading(false);
    }
  }

  
  public get incorrectHidden() : boolean {
    return this.formData.reason !== "incorrect"
  }
  
  
  public get labelMessage() : string {
    return this.formData.reason === "incorrect" ? "Describe the problem" : "Message"
  }
  
}
</script>
