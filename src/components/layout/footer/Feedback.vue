<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" lg="6" offset-sm="3" offset-lg="3">
        <v-container>
          <div class="text-center">
            <p class="pt-4 text-h5 font-weight-bold">
              <span v-if="!submitted">How was your experience?</span>
              <span v-else>Thank you for submiting feedback</span>
            </p>
            <div v-if="!submitted">
              <div>
                <p>What do you think about OrgBook BC?</p>
                <v-btn
                  fab
                  tile
                  outlined
                  @click="reason = 'like'"
                  class="mr-3 fab"
                >
                  <v-icon>{{ mdiThumbUp }}</v-icon>
                </v-btn>
                <v-btn
                  fab
                  tile
                  outlined
                  @click="reason = 'dislike'"
                  class="ml-3 fab"
                >
                  <v-icon>{{ mdiThumbDown }}</v-icon>
                </v-btn>
              </div>

              <v-row v-if="reason !== ''">
                <v-col cols="12" lg="8" offset-lg="2">
                  <div class="text-center">
                    <p class="font-weight-bold pt-4">
                      Thanks for letting us know.
                      <span v-if="isLike">Tell us a bit more!</span
                      ><span v-else
                        >Please tell us more so we can improve!</span
                      >
                    </p>
                    <p class="pt-4">
                      <span v-if="isLike"
                        >What did you like about your experience today?</span
                      >
                      <span v-else>What were you looking for today?</span>
                    </p>
                    <v-textarea
                      outlined
                      required
                      v-model="comments"
                      auto-grow
                      rows="2"
                      class="feedback text-center"
                    ></v-textarea>
                    <div v-if="!isLike">
                      <p class="pt-4">
                        How would you like us to improve OrgBook?
                      </p>
                      <v-textarea
                        outlined
                        v-model="improvements"
                        required
                        auto-grow
                        rows="2"
                        class="feedback text-center"
                      ></v-textarea>
                    </div>
                  </div>
                  <div :class="{ 'text-right': $vuetify.breakpoint.mdAndDown }">
                    <v-btn
                      class="submit"
                      @click="submit"
                      left
                      depressed
                      aria-label="submit-button"
                      >Submit</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { IFeedback } from "@/interfaces/api/v2/feedback.interface";

interface Data {
  reason: string;
  comments: string;
  improvements: string;
  submitted: boolean;
}

@Component({
  computed: {
    ...mapGetters(["mdiThumbDown", "mdiThumbUp"]),
  },
  methods: {
    ...mapActions(["sendFeedback", "setLoading"]),
  },
})
export default class Feedback extends Vue {
  reason!: "like" | "dislike" | "";
  comments!: string;
  improvements!: string;
  submitted!: boolean;

  sendFeedback!: (feedback: IFeedback) => Promise<void>;
  setLoading!: (loading: boolean) => void;
  data(): Data {
    return {
      reason: "",
      comments: "",
      improvements: "",
      submitted: false,
    };
  }
  async submit(): Promise<void> {
    this.setLoading(true);
    await this.sendFeedback({
      reason: this.reason,
      comments: this.comments,
      improvements: this.improvements,
    });
    window.sessionStorage.setItem("Feedback", "true");
    this.submitted = true;
    this.setLoading(false);
  }
  get isLike(): boolean {
    return this.reason === "like";
  }
}
</script>

<style lang="scss" scoped>
.fab:focus::before {
  opacity: 0;
}
.textarea {
  resize: none;
}
.submit {
  background: $primary-color !important;
  color: $white !important;
}
.hidden {
  display: none;
}
</style>
