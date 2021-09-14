import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { IStatistics } from "@/interfaces/api/v2/statistics.interface";

export default class CredentialType extends ApiResource {
  baseVersion = "v2";
  basePath = "quickload";

  async getStats(): Promise<HttpResponse<IStatistics>> {
    return await Http.get<IStatistics>(this.formatEndpointUrl(""));
  }
}
