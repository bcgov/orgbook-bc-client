import { IFormattedTopic } from "@/interfaces/api/v2/topic.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";

export default class Topic extends ApiResource {
  baseVersion = "v2";
  basePath = "topic";

  async getTopicCredentialSet(
    id: number
  ): Promise<HttpResponse<ICredentialSet>> {
    return await Http.get<ICredentialSet>(
      this.formatEndpointUrl(`${id}/credentialset`)
    );
  }

  async getTopicFullCredentialSet(
    id: number
  ): Promise<HttpResponse<ICredentialSet>> {
    return await Http.get<ICredentialSet>(
      this.formatEndpointUrl(`${id}/credential`)
    );
  }

  async getFormattedIdentifiedTopic(
    sourceId: string,
    type: string
  ): Promise<HttpResponse<IFormattedTopic>> {
    return await Http.get<IFormattedTopic>(
      this.formatEndpointUrl(`ident/${type}/${sourceId}/formatted`)
    );
  }
}
