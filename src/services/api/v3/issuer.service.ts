import { IApiPagedResult } from "@/interfaces/api/result.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { IIssuer } from "@/interfaces/api/v2/issuer.interface";

export default class Issuer extends ApiResource {
  baseVersion = "v3";
  basePath = "issuer";

  async getIssuerList(): Promise<HttpResponse<IApiPagedResult<IIssuer>>> {
    return await Http.get<IApiPagedResult<IIssuer>>(this.formatEndpointUrl(""));
  }
}
