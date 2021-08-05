<template>
  <v-list flat>
    <v-list-item-group multiple active-class="">
      <v-list-item v-for="field in fields" :key="field.value">
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox @change="handleCheckBox($event, field.value)" :input-value="active" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <div>{{ field.value }}</div>
          </v-list-item-content>
          <v-list-item-action>
            <div>{{ field.count }}</div>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface"
import CredentialType from "@/services/api/v2/credential-type.service";
import { Filter } from "@/store/modules/entityFilters";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

@Component({
  computed: {
    ...mapGetters([
      "getEntityFilters",
    ]),
  },
  methods:{
    ...mapActions([
      "setFilter"
    ]),
  }
})
export default class EntityFilterFacets extends Vue {
  @Prop({ default: () => [] }) filterField!: string;
  @Prop({ default: () => [] }) fields!: IEntityFacetField[];
  getEntityFilters!: Filter;
  setFilter!:(filter:Filter) => void;

  handleCheckBox(e:Event, filterString:string){
    if(e){
      this.pushNewFilter(filterString)
    }else{
      this.popNewFilter(filterString)
    }
    console.log(this.getEntityFilters)
  }
  pushNewFilter(filterString:string){
    var baseFilter = this.getEntityFilters
    var currFilters = baseFilter[this.filterField] as Array<string>
    if(!currFilters.includes(filterString)){
      currFilters.push(filterString)
      baseFilter[this.filterField] = currFilters
      this.setFilter(baseFilter)
    }
  }
  popNewFilter(filterString:string){
    var baseFilter = this.getEntityFilters
    var currFilters = baseFilter[this.filterField] as Array<string>
    var idx = currFilters.indexOf(filterString)
    console.log(idx)
    if(idx >= 0){ //if element exists
      currFilters.splice(idx,1)
      console.log(currFilters)
      baseFilter[this.filterField] = currFilters
      this.setFilter(baseFilter)
    }
    
  }
}
</script>
