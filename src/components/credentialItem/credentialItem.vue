<template> 
        <v-expansion-panel :expand="expanded">
            <v-expansion-panel-header>
                <slot name="header"></slot>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Authority: <a :href="authorityLink">{{authorityName}}</a> <br/>
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
import "@/utils/dateFilter"
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";


@Component({
    props:['authority', 'effectiveDate', 'expanded']
})

export default class CredentialItem extends Vue {
    authority!:IIssuer;
    get authorityName():string|undefined{
        return this.authority?.name
    }

    get authorityLink():string|undefined{
        return this.authority?.url?.toString()
    }
}
</script>
