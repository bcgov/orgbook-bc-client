<template>
  <div>
    <v-form ref="form" :disabled=contactLoading>
    <div>
      <h3>Reason for contact</h3>
      <v-select outlined v-model="formData.reason" :items="requestTypes" label="Select a Reason"></v-select>
    </div>


    <div v-if="formData.reason && formData.reason == 'incorrect'">
      <strong>
        OrgBook BC cannot make corrections to the data. Only the issuing organization can do so. Complete the information below and we will forward your message to the appropriate organization. 
      </strong>

      <v-text-field outlined v-model="formData.name" required label="Name"></v-text-field>

      <v-text-field outlined v-model="formData.email" label="Email address"></v-text-field>

      <v-select outlined v-model="formData.error" :items="credentialTypes" label="What Information is incorrect?"></v-select>

      <v-text-field outlined v-model="formData.identifier" label="Identifier (such as the incorporation number, registration number, or licence / permit number)"></v-text-field>

      <v-textarea outlined v-model="formData.message" label="Describe the problem"></v-textarea>

    </div>

    <div v-else-if="formData.reason && formData.reason == 'listed'">
      <strong>How to add your organization to OrgBook BC</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra 
        justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, 
        nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </p>
    </div>

    <div v-else-if="formData.reason">
       <v-text-field outlined v-model="name" label="Name"></v-text-field>

      <v-text-field outlined v-model="email" label="Email address"></v-text-field>

      <v-textarea outlined v-model="message" label="Message"></v-textarea>
    </div>

    <v-btn v-if="formData.reason && formData.reason != 'listed'" @click="submit" depressed color="primary" :disabled="contactLoading">Submit</v-btn>
  </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { webData, ContactRequest, IncorrectInfoContactRequest } from '@/store/modules/contact'
import router from '@/router';

const API_BASE='http://localhost:3000'


@Component({
  computed: {
    ...mapGetters(["credentialTypes", "requestTypes", "contactLoading"]),
  },
  methods: {
    ...mapActions(["fetchCredentialTypes", "fetchRequestTypes", "postRequest", "setContactLoading"]),
  },
})
export default class ContactForm extends Vue {
  formData!: ContactRequest | IncorrectInfoContactRequest
  data() {
    return {
      formData: {reason:""}
    }
  }
  
  fetchCredentialTypes!: (webParams:webData) => Promise<void>;
  fetchRequestTypes!: (webParams:webData) => Promise<void>;
  postRequest!: (webParams:webData) => Promise<void>;
  setContactLoading!: (loading: boolean) => void;

  async created(): Promise<void>{
    this.fetchRequestTypes({url:API_BASE+"/reasonItems",data:{}as ContactRequest});
    this.fetchCredentialTypes({url:API_BASE+"/credentialItems",data:{}as ContactRequest});
  }


  async submit (e: Event): Promise<void> {
    e.preventDefault();
    const isFormValid = (
      this.$refs.form as Vue & { validate: () => boolean }
    ).validate();
    if (isFormValid) {
      this.setContactLoading(true);
      await this.postRequest({url:API_BASE+'/test',data:{...this.formData}});
      router.push('/');
      this.setContactLoading(false);
    }
  }
}
</script>
