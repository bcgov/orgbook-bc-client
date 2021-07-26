<template> 
        <v-expansion-panel :expand="expanded">
            <v-expansion-panel-header>
                <slot name="header"></slot>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Authority: {{authority}} <br/>
                <v-icon>mdi-shield-check-outline</v-icon> Credential verified <br/>
                Effective: {{effectiveDate | formatDate}} <br/>
            </v-expansion-panel-content>
            <v-divider></v-divider>
            <v-container>
                <slot name="content"></slot>
            </v-container>
            
        </v-expansion-panel>
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
    props:['authority', 'effectiveDate', 'expanded']
})

export default class CredentialItem extends Vue {}
</script>
