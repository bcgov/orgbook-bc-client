import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";

export default class CredentialType extends ApiResource {
  baseVersion = "v4";
  basePath = "credential-type";

  async getCredentialTypes(
    paging = true
  ): Promise<HttpResponse<IApiPagedResult<ICredentialType>>> {
    return await Http.get<IApiPagedResult<ICredentialType>>(
      this.formatEndpointUrl(""),
      { params: { paging } }
    );
  }
}
