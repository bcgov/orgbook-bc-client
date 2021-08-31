<template>
  <v-container>
    <v-card>
      <v-card-title v-if="title">{{ title }}</v-card-title>
      <slot name="subtitle"></slot>
      <v-expansion-panels
        v-if="$slots.expansionPanels"
        accordion
        multiple
        class="on-bottom"
        :value="panelList"
      >
        <slot name="expansionPanels"></slot>

        <slot name="footer"></slot>
      </v-expansion-panels>
      <slot></slot>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["getCredentialsExpanded"]),
  },
  methods: {
    ...mapActions(["toggleCredentialsExpanded"]),
  },
})
export default class EntityCard extends Vue {
  @Prop({ default: "" }) title!: string;
  getCredentialsExpanded!: boolean;
  toggleCredentialsExpanded!: () => void;

  get panelList(): number[] {
    return this.getCredentialsExpanded
      ? [...Array(this.$slots.expansionPanels?.length).keys()]
      : [];
  }
}
</script>
