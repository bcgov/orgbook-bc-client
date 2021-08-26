import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";

export default class Relationship extends ApiResource {
  baseVersion = "v2";
  basePath = "topic_relationship";

  async getRelatedTo(id: number): Promise<HttpResponse<IRelationship[]>> {
    return await Http.get<IRelationship[]>(
      this.formatEndpointUrl(`${id}/related_to_relations`)
    );
  }
}
