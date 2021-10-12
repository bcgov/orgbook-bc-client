import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { IContactRequest } from "@/interfaces/api/v2/contact.interface";

export default class Contact extends ApiResource {
  baseVersion = "v2";
  basePath = "contact";

  async postContact(
    feedback: IContactRequest
  ): Promise<HttpResponse<IContactRequest>> {
    return await Http.post<IContactRequest>(
      this.formatEndpointUrl(""),
      feedback,
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
