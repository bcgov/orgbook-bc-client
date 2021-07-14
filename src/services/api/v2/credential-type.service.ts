import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import Http, { HttpResponse } from "@/services/http";
import ApiResource from "@/services/api/resource";

export default class CredentialType extends ApiResource {
  baseVersion = "v2";
  basePath = "credentialtype";

  async getCredentialTypes(): Promise<
    HttpResponse<IApiPagedResult<ICredentialType>>
  > {
    return await Http.get<IApiPagedResult<ICredentialType>>(
      this.formatEndpointUrl("")
    );
  }

  async getCredentialType(id: number): Promise<HttpResponse<ICredentialType>> {
    return await Http.get<ICredentialType>(this.formatEndpointUrl(`${id}`));
  }
}
