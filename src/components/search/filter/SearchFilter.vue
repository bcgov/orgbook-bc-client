<template>
  <v-row>
    <v-col v-if="$vuetify.display.smAndDown" class="pl-0 pr-0">
      <div class="d-flex align-center"><SearchFilterDialog /></div>
    </v-col>
    <v-col class="pl-0 pr-0">
      <div
        :class="{
          'text-body-2 font-weight-bold': true,
          'float-right': $vuetify.display.smAndDown,
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
import { mapGetters } from "vuex";
import SearchFilterDialog from "./SearchFilterDialog.vue";
import SearchHelpPopup from "@/components/search/SearchHelpPopup.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SearchHelpPopup,
    SearchFilterDialog,
  },
  computed: {
    ...mapGetters(["searchQuery", "pagedSearchTopics"]),
  },
});
</script>
