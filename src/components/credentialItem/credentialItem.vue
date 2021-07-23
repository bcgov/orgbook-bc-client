<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>
                <slot name="header"></slot>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Authority: {{authority}} <br/>
                Credential verified <br/>
                Effective: {{effectiveDate | formatDate}} <br/>
            </v-expansion-panel-content>
            <v-divider></v-divider>
            <slot name="content"></slot>
        </v-expansion-panel>
        </v-expansion-panels>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from 'moment'

Vue.filter('formatDate', function(value:string) {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY')
  }
})

@Component({
    props:['title', 'authority', 'effectiveDate']
})

export default class CredentialItem extends Vue {}
</script>
