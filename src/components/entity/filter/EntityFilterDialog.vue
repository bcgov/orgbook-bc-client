<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <span
        @click="dialog = true"
        :class="{ disabled: loading }"
        :aria-disabled="loading"
        class="fake-link"
      >
        <v-icon
          class="icon-dense"
          dense
          v-bind="attrs"
          v-on="on"
          :color="loading ? 'gray' : 'black'"
          >{{ mdiFilterOutline }}</v-icon
        >
        <span :class="{ 'fake-link text-body-2': true }">Filters</span>
      </span>
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
      <EntityFilterFacetPanels class="filter-dialog" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import EntityFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";
import { useAppState, useIconState } from "@/stores"
import { mapState } from "pinia";

interface Data {
  dialog: boolean;
}
export default {
        data(): Data {
                return {
                        dialog: false,
                };
        },
        computed: {
                ...mapState(useIconState, ["mdiFilterOutline", "mdiClose"]),
                ...mapState(useAppState, {loading: "getLoading"})
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
