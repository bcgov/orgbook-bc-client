import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { IFeedback } from "@/interfaces/api/v2/feedback.interface";

export default class Feedback extends ApiResource {
  baseVersion = "v4";
  basePath = "feedback";

  async postFeedback(feedback: IFeedback): Promise<HttpResponse<IFeedback>> {
    return await Http.post<IFeedback>(this.formatEndpointUrl(""), feedback, {
      headers: { "Content-Type": "application/json" },
    });
  }
}
