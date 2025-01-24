<template>
  <v-card
    elevation="0"
    rounded="sm"
    class="card mb-5"
    :ripple="false"
    @click="$router.push({ path: `/entity/${sourceId}/type/${topicType}` })"
  >
    <div class="historical d-inline-flex" v-if="entityStatus === 'HIS'">
      <v-icon class="ma-1" small color="white">{{ mdiAlertOutline }}</v-icon>
      <span class="text-uppercase text-caption font-weight-bold pr-1 pt-1 pb-1"
        >Historical</span
      >
    </div>
    <v-card-text :class="{ 'pt-2': entityStatus === 'HIS' }">
      <router-link
        class="font-weight-bold"
        :to="`/entity/${sourceId}/type/${topicType}`"
        >{{ legalName }}</router-link
      >
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
import { mapState } from "pinia";
import { useIconState } from "@/stores";

@Component({
  computed: {
    ...mapState(useIconState, ["mdiAlertOutline"]),
  },
})
export default class SearchTopic extends Vue {
  @Prop({ default: null }) topic!: ISearchTopic;

  // get routerLink(): string {
  //   return `/entity/${this.sourceId}/type/${this.topicType}`;
  // }

  get sourceId(): string {
    return this?.topic?.source_id || "";
  }

  get topicType(): string {
    return this?.topic?.credential_type?.schema?.name || "";
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

<style lang="scss" scoped>
.card {
  @include card-raised;

  &:hover {
    padding: 0px;
    border: 1px solid $link-color !important;
    cursor: pointer;
  }
}
.historical {
  border-radius: 1px 0px 0px 0px !important;
  align-items: center;
  background: $accent-color;
  color: $white;
}
</style>
