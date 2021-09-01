<template>
    <div>
        <v-icon>{{mdiArrowLeft}}</v-icon><a href="#">{{entityName}}</a>
        <v-btn @click="test">TEST</v-btn>
        <v-card>
            <v-card-title><v-icon>{{mdiShieldCheckOutline}}</v-icon> {{`Registration credential verified`}}</v-card-title>
            <p class="verificationTime">{{`Criptographically verified ${currDate}` }}</p>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import { selectFirstAttrItem } from "@/utils/attribute-filter";
import moment from "moment";
@Component({
    computed:{
        ...mapGetters([
            "mdiArrowLeft",
            "mdiShieldCheckOutline",
            "selectedTopic"
        ])
    }
})
export default class CredentialDetail extends Vue{
    selectedTopic!: IFormattedTopic;

    get currDate():string{
        return moment(new Date()).format('MMM, DD YYYY [at] hh:mm a')
    }


    get entityName(): string | undefined {
    return selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      this.selectedTopic?.names
    )?.text;
  }

  test(){
      console.log(this.selectedTopic)
  }

}
</script>

<style lang="scss">
.verificationTime{
    color: $light-gray;
}
</style>