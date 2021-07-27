import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchFacetedTopic,
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "../resource.service";

export default class Search extends ApiResource {
  baseVersion = "v4";
  basePath = "search";

  async topic(
    query: ISearchQuery
  ): Promise<HttpResponse<IApiPagedResult<ISearchTopic>>> {
    return await Http.get<IApiPagedResult<ISearchTopic>>(
      this.formatEndpointUrl("topic"),
      {
        params: { ...query },
      }
    );
  }

  async facetedTopic(
    query: ISearchQuery
  ): Promise<HttpResponse<ISearchFacetedTopic>> {
    return await Http.get<ISearchFacetedTopic>(
      this.formatEndpointUrl("topic/facets"),
      {
        params: { ...query },
      }
    );
  }
}
