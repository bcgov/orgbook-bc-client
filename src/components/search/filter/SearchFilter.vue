<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown" class="pl-0 pr-0">
      <div class="d-flex align-center"><SearchFilterDialog /></div>
    </v-col>
    <v-col v-if="pagedSearchTopics.total" class="pl-0 pr-0">
      <div
        :class="{
          'text-body-2 font-weight-bold': true,
          'float-right': $vuetify.breakpoint.smAndDown,
        }"
      >
        {{ pagedSearchTopics.total }} result(s)
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SearchFilterDialog from "./SearchFilterDialog.vue";

@Component({
  components: {
    SearchFilterDialog,
  },
  computed: {
    ...mapGetters(["pagedSearchTopics"]),
  },
})
export default class SearchFilter extends Vue {}
</script>
