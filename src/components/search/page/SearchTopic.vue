<template>
  <v-card elevation="2" rounded="sm" class="mb-5">
    <div
      class="historical d-inline-flex rounded-sm"
      v-if="entityStatus === 'HIS'"
    >
      <v-icon small class="pa-1" color="white">mdi-alert-outline</v-icon>
      <span
        class="text-uppercase text-caption font-weight-medium pr-1 pt-1 pb-1"
        >Historical</span
      >
    </div>
    <v-card-text :class="{ 'pt-2': entityStatus === 'HIS' }">
      <router-link :to="'/entity/' + sourceId">{{ legalName }}</router-link>
      <div>{{ $t(`entity_type.${entityType}`) }}</div>
      <div v-if="craBusinessNumber" class="text--primary">
        <span>Business number</span>
        <span>:&nbsp;</span>
        <span>{{ craBusinessNumber }}</span>
      </div>
      <div class="text--primary">
        <span>Incorporation number</span>
        <span>:&nbsp;</span>
        <span>{{ sourceId }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ISearchTopic } from "@/interfaces/api/v4/search-topic.interface";
import { Component, Prop, Vue } from "vue-property-decorator";
import { pluck } from "@/utils/resource";

@Component
export default class SearchTopic extends Vue {
  @Prop({ default: null }) topic!: ISearchTopic;

  get sourceId(): string {
    return this?.topic?.source_id || "";
  }

  get legalName(): string {
    const legalName = pluck(this?.topic?.names, "entity_name");
    return legalName?.text || "";
  }

  get entityType(): string {
    const entityType = pluck(this?.topic?.attributes, "entity_type");
    return entityType?.value || "";
  }

  get entityStatus(): string {
    const entityType = pluck(this?.topic?.attributes, "entity_status");
    return entityType?.value || "";
  }

  get craBusinessNumber(): string {
    const craBusinessNumber = pluck(this?.topic?.names, "business_number");
    return craBusinessNumber?.text || "";
  }
}
</script>

<style scoped>
.historical {
  align-items: center;
  background: orange;
  color: white;
}
</style>
