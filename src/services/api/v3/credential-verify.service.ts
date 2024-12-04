import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import {
  ICredentialPresExchange,
  ICredentialProof,
} from "@/interfaces/api/v3/credential-verified.interface";

export default class CredentialVerifier extends ApiResource {
  baseVersion = "v3";
  basePath = "credential";

  async credentialVerifyPresEx(
    id: string,
    exId: string
  ): Promise<HttpResponse<ICredentialProof>> {
    return await Http.get<ICredentialProof>(
      this.formatEndpointUrl(`${id}/verify/${exId}`)
    );
  }
}
