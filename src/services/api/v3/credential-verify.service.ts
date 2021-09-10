import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import {
  ICredentialPresExchange,
  ICredentialProof,
} from "@/interfaces/api/v3/credential-verified.interface";

export default class CredentialVerifier extends ApiResource {
  baseVersion = "v3";
  basePath = "credential";

  async credentialVerify(
    id: string
  ): Promise<HttpResponse<ICredentialPresExchange>> {
    return await Http.get<ICredentialPresExchange>(
      this.formatEndpointUrl(`${id}/verify`)
    );
  }

  async credentialVerifyPresEx(
    id: string,
    exID: string
  ): Promise<HttpResponse<ICredentialProof>> {
    return await Http.get<ICredentialProof>(
      this.formatEndpointUrl(`${id}/verify/${exID}`)
    );
  }
}
