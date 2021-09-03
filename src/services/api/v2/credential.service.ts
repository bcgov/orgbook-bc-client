import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { ICredentialFormatted } from "@/interfaces/api/v4/credential.interface";

export default class Credential extends ApiResource {
  baseVersion = "v2";
  basePath = "credential";

  async getFormattedCredential(id: string): Promise<HttpResponse<ICredentialFormatted>> {
    return await Http.get<ICredentialFormatted>(this.formatEndpointUrl(`${id}/formatted`));
  }
}
