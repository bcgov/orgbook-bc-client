import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Feedback from "@/services/api/v2/feedback.service";
import { IFeedback } from "@/interfaces/api/v2/feedback.interface";

const feedbackService = new Feedback();

const actions = {
  async sendFeedback(
    _: ActionContext<unknown, RootState>,
    feedback: IFeedback
  ): Promise<void> {
    await feedbackService.postFeedback(feedback);
  },
};

const mutations = {};

export default {
  actions,
  mutations,
};
