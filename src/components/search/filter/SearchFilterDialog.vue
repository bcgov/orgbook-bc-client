<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        @click="dialog = true"
        :class="{ disabled: loading || !pagedSearchTopics.total }"
        :aria-disabled="loading || !pagedSearchTopics.total"
      >
        <v-icon
          class="icon-dense"
          dense
          v-bind="attrs"
          v-on="on"
          :color="loading || !pagedSearchTopics.total ? 'gray' : 'black'"
          >{{ mdiFilterOutline }}</v-icon
        >
        <span
          :class="{
            'fake-link text-body-2 vertical-align-middle': true,
            disabled: loading || !pagedSearchTopics.total,
          }"
          >Filters</span
        >
      </div>
    </template>
    <v-card>
      <v-toolbar flat color="white">
        <v-toolbar-title class="pl-1">Filter results</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="mr-n2">
          <v-btn icon color="black" @click="dialog = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <SearchFilterFacetPanels class="filter-dialog" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { mapState } from "pinia";
import { useAppState } from "@/stores";
import SearchFilterFacetPanels from "./SearchFilterFacetPanels.vue";

interface Data {
  dialog: boolean;
}

@Component({
  components: {
    SearchFilterFacetPanels,
  },
  computed: {
    ...mapGetters([
      "pagedSearchTopics",
      "mdiClose",
      "mdiFilterOutline",
    ]),
    ...mapState(useAppState, { loading: "getLoading" })
  },
})
export default class SearchFilterDialog extends Vue {
  data(): Data {
    return {
      dialog: false,
    };
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;
  color: $gray;
}
.filter-dialog {
  padding-bottom: 3rem;
}
.filter-actions {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: $white;
}
</style>
