import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Feedback from "@/services/api/v4/feedback.service";
import { IFeedback } from "@/interfaces/api/v4/feedback.interface";

const feedbackService = new Feedback();

const actions = {
  async sendFeedback(
    _: ActionContext<unknown, RootState>,
    feedback: IFeedback
  ): Promise<void> {
    await feedbackService.postFeedback(feedback);
  },
};

export default {
  actions,
};
