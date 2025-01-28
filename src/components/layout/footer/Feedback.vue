<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" lg="6" offset-sm="3" offset-lg="3">
        <v-container>
          <div class="text-center">
            <div v-if="!getLikeStatus">
              <p class="pt-4 text-h5 font-weight-bold">
                <span v-if="!getLikeStatus">How was your experience?</span>
              </p>
              <p>What do you think about OrgBook BC?</p>
              <v-btn fab tile outlined @click="like" class="mr-3 fab">
                <v-icon>{{ mdiThumbUp }}</v-icon>
              </v-btn>
              <v-btn fab tile outlined @click="dislike" class="ml-3 fab">
                <v-icon>{{ mdiThumbDown }}</v-icon>
              </v-btn>
            </div>

            <v-row v-if="getLikeStatus && !atContactPage">
              <v-col cols="12" lg="8" offset-lg="2">
                <div class="text-center">
                  <router-link to="/contact">
                    <v-btn
                      class="submit"
                      @click="submit"
                      depressed
                      aria-label="submit-button"
                      >Submit a comment</v-btn
                    >
                  </router-link>
                </div>
                <div class="d-inline-flex"></div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions as pmapActions, mapState } from "pinia";
import { useAppState, useFeedbackState, useIconState, useLikeState } from "@/stores"
import { IFeedback } from "@/interfaces/api/v4/feedback.interface";
import { trackStructEvent } from "@snowplow/browser-tracker";
interface Data {
  reason: string;
  comments: string;
  improvements: string;
  submitted: boolean;
}

@Component({
  computed: {
    ...mapState(useLikeState, ["getLikeStatus"]),
    ...mapState(useIconState, [ "mdiThumbDown", "mdiThumbUp",] ),
  },
  methods: {
    ...pmapActions(useLikeState, ["setLike"]),
    ...pmapActions(useAppState, ["setLoading"]),
    ...pmapActions(useFeedbackState, ["sendFeedback"])
  },
})
export default class Feedback extends Vue {
  reason!: "like" | "dislike" | "";
  comments!: string;
  improvements!: string;
  submitted!: boolean;
  getLikeStatus!: "like" | "dislike" | "";

  sendFeedback!: (feedback: IFeedback) => Promise<void>;
  setLoading!: (loading: boolean) => void;
  setLike!: (like: "like" | "dislike" | "") => void;

  data(): Data {
    return {
      reason: "",
      comments: "",
      improvements: "",
      submitted: false,
    };
  }

  like(): void {
    // trackStructEvent({
    //   category: "Feedback",
    //   action: "Submit",
    //   label: "Like",
    //   value: 0.0,
    // });
    this.setLike("like");
  }

  dislike(): void {
    // trackStructEvent({
    //   category: "Feedback",
    //   action: "Submit",
    //   label: "Dislike",
    //   value: 0.0,
    // });
    this.setLike("dislike");
  }

  get atContactPage(): boolean {
    return this.$route.path.includes("/contact");
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
