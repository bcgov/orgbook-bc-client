import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import {
  IContactRequest,
  IIncorrectInfoContactRequest,
} from "@/interfaces/api/v2/contact.interface";

export default class Contact extends ApiResource {
  baseVersion = "v2";
  basePath = "feedback";

  async postFeedback(
    feedback: IContactRequest | IIncorrectInfoContactRequest
  ): Promise<HttpResponse<IContactRequest | IIncorrectInfoContactRequest>> {
    return await Http.post<IContactRequest | IIncorrectInfoContactRequest>(
      this.formatEndpointUrl(""),
      feedback,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
  }
}
