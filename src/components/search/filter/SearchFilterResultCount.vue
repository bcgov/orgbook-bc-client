<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown" class="pl-0 pr-0">
      <div class="d-flex align-center"><SearchFilterDialog /></div>
    </v-col>
    <v-col class="pl-0 pr-0">
      <div
        :class="{
          'text-body-2 font-weight-bold': true,
          'float-right': $vuetify.breakpoint.smAndDown,
        }"
      >
        <SearchHelpPopup
          ><template #title>
            {{ pagedSearchTopics.total }} result(s)</template
          ></SearchHelpPopup
        >
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterDialog from "./SearchFilterDialog.vue";
import SearchHelpPopup from "@/components/search/SearchHelpPopup.vue";

@Component({
  components: {
    SearchHelpPopup,
    SearchFilterDialog,
  },
  computed: {
    ...mapGetters(["searchQuery", "pagedSearchTopics"]),
  },
})
export default class SearchFilterResultCount extends Vue {}
</script>
