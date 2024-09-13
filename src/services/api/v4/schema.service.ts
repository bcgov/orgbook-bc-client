import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";

export default class Schema extends ApiResource {
  baseVersion = "v4";
  basePath = "schemas";

  async getSchemas(): Promise<HttpResponse<Record<string, ICredentialType[]>>> {
    return await Http.get<Record<string, ICredentialType[]>>(
      this.formatEndpointUrl("")
    );
  }
}
