<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot name="activator"></slot>
      </div>
    </template>

    <v-card>
      <v-toolbar flat>
        <v-row>
          <v-col class="text-right">
            <v-icon @click="dialog = false">
              {{ mdiClose }}
            </v-icon>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-card-text class="content">
        <slot name="content"> </slot>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col class="text-center"
            ><v-btn @click="dialog = false" class="primary">Close</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { useIconState } from "@/stores";
import { mapState } from "pinia";

@Component({
  computed: {
    ...mapState(useIconState, ["mdiClose"]),
  },
})
export default class Dialog extends Vue {
  data(): { dialog: boolean } {
    return {
      dialog: false,
    };
  }
}
</script>

<style lang="scss" scoped>
.primary {
  background-color: $primary-color !important;
}
.content {
  color: $text-color !important;
}
</style>
