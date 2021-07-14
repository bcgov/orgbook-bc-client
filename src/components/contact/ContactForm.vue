<template>
  <div>
    <div>
      <h3>Reason for contact</h3>
      <v-select outlined v-model="reason" :items="requestTypes" label="Select a Reason"></v-select>
    </div>


    <div v-if="reason && reason == 'incorrect'">
      <strong>
        OrgBook BC cannot make corrections to the data. Only the issuing organization can do so. Complete the information below and we will forward your message to the appropriate organization. 
      </strong>

      <v-text-field outlined v-model="name" label="Name"></v-text-field>

      <v-text-field outlined v-model="email" label="Email address"></v-text-field>

      <v-select outlined v-model="error" :items="credentialTypes" label="What Information is incorrect?"></v-select>

      <v-text-field outlined v-model="identifier" label="Identifier (such as the incorporation number, registration number, or licence / permit number)"></v-text-field>

      <v-textarea outlined v-model="message" label="Describe the problem"></v-textarea>

    </div>

    <div v-else-if="reason && reason == 'listed'">
      <strong>How to add your organization to OrgBook BC</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra 
        justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, 
        nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </p>
    </div>

    <div v-else-if="reason">
       <v-text-field outlined v-model="name" label="Name"></v-text-field>

      <v-text-field outlined v-model="email" label="Email address"></v-text-field>

      <v-textarea outlined v-model="message" label="Message"></v-textarea>
    </div>

    <v-btn v-if="reason != 'listed'" @click="submit" depressed color="primary">Submit</v-btn>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { webData, ContactRequest, IncorrectInfoContactRequest } from '@/store/modules/contact'

const API_BASE='http://localhost:3000'


@Component({
  computed: {
    ...mapGetters(["credentialTypes", "requestTypes"]),
  },
  methods: {
    ...mapActions(["fetchCredentialTypes", "fetchRequestTypes", "postRequest"]),
  },
})
export default class ContactForm extends Vue {
  reason!:string
  name!:string
  email!:string
  error!:string
  message!:string
  identifier!:string
  data() {
    return {
      reason:"",
      name:"",
      email:"",
      error:"",
      message:"",
      identifier:""
    }
  }
  
  fetchCredentialTypes!: (webParams:webData) => Promise<void>;
  fetchRequestTypes!: (webParams:webData) => Promise<void>;
  postRequest!: (webParams:webData) => Promise<void>;

  async created(): Promise<void>{
    console.log(API_BASE)
    this.fetchRequestTypes({url:API_BASE+"/reasonItems",data:{}});
    this.fetchCredentialTypes({url:API_BASE+"/credentialItems",data:{}});
  }

  submit (){
    this.postRequest({url:API_BASE+'/test',data:{reason:this.reason, name:this.name, email:this.email, error:this.error, message:this.message, identifier:this.identifier}})
  }
}
</script>
