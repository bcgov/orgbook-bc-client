<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <a
        @click="dialog = true"
        :class="{ disabled: loading || !pagedSearchTopics.total }"
        :aria-disabled="loading || !pagedSearchTopics.total"
      >
        <v-icon
          dense
          v-bind="attrs"
          v-on="on"
          :color="loading || !pagedSearchTopics.total ? 'gray' : 'black'"
          >mdi-filter-outline</v-icon
        >
        Filters
      </a>
    </template>
    <v-card>
      <v-toolbar flat color="white">
        <v-toolbar-title class="pl-1">Filter results</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="mr-n2">
          <v-btn icon color="black" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
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
import SearchFilterFacetPanels from "./SearchFilterFacetPanels.vue";

interface Data {
  dialog: boolean;
}

@Component({
  components: {
    SearchFilterFacetPanels,
  },
  computed: {
    ...mapGetters(["loading", "pagedSearchTopics"]),
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
  color: gray;
}
.filter-dialog {
  padding-bottom: 3rem;
}
.filter-actions {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}
</style>
