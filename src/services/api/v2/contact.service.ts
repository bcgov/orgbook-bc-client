import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import {
  ContactRequest,
  IncorrectInfoContactRequest,
} from "@/store/modules/contact";

export default class Contact extends ApiResource {
  baseVersion = "v2";
  basePath = "feedback";

  async postFeedback(
    feedback: ContactRequest | IncorrectInfoContactRequest
  ): Promise<HttpResponse<ContactRequest | IncorrectInfoContactRequest>> {
    return await Http.post<ContactRequest | IncorrectInfoContactRequest>(
      this.formatEndpointUrl(""),
      feedback,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
  }
}
