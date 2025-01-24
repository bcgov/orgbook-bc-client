import { defineStore } from "pinia";
import Feedback from "@/services/api/v4/feedback.service";
import { IFeedback } from "@/interfaces/api/v4/feedback.interface";

const feedbackService = new Feedback();

interface AppState {
	loading: boolean;
}

export const useFeedbackState = defineStore("feedbackState", {
	actions: {
		async sendFeedback(feedback: IFeedback): Promise<void> {
			console.log("feedback");
			await feedbackService.postFeedback(feedback);
		},
	},
});
