import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ICredentialTypeClaimLabels } from "@/interfaces/api/v4/credential.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";

export default class CredentialType extends ApiResource {
  baseVersion = "v4";
  basePath = "credential-type";

  async getCredentialTypes(
    paging = true
  ): Promise<HttpResponse<IApiPagedResult<ICredentialTypeClaimLabels>>> {
    return await Http.get<IApiPagedResult<ICredentialTypeClaimLabels>>(
      this.formatEndpointUrl(""),
      { params: { paging } }
    );
  }
}
