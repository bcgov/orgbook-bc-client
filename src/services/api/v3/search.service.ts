import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "../resource.service";

export default class Search extends ApiResource {
  baseVersion = "v3";
  basePath = "search";

  async autocomplete(
    q: string
  ): Promise<HttpResponse<IApiPagedResult<ISearchAutocomplete>>> {
    return await Http.get<IApiPagedResult<ISearchAutocomplete>>(
      this.formatEndpointUrl("autocomplete"),
      {
        params: { q, revoked: false, inactive: "" },
      }
    );
  }
}