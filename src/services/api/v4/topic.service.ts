import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";

export default class Topic extends ApiResource {
  baseVersion = "v4";
  basePath = "topic";

  async getTopicCredentialSet(
    id: number
  ): Promise<HttpResponse<ICredentialSet>> {
    return await Http.get<ICredentialSet>(
      this.formatEndpointUrl(`${id}/credential-set`)
    );
  }
}
