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
        :class="{ disabled: loading }"
        :aria-disabled="loading"
      >
        <v-icon
          dense
          v-bind="attrs"
          v-on="on"
          :color="loading ? 'gray' : 'black'"
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
      <v-card-actions class="filter-actions justify-center on-top">
        <v-btn elevation="0">Reset</v-btn>
        <v-btn elevation="0" color="primary">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterFacetPanels from "@/components/entity/filter/EntityFilterFacetPanels.vue";

interface Data {
  dialog: boolean;
}

@Component({
  components: {
    SearchFilterFacetPanels,
  },
  computed: {
    ...mapGetters(["loading"]),
  },
})
export default class EntityFilterDialog extends Vue {
  data(): Data {
    return {
      dialog: false,
    };
  }
}
</script>

<style scoped>
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
