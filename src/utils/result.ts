import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ISearchFilterFacets } from "@/interfaces/api/v4/search-topic.interface";

export function defaultPageResult<T>(): IApiPagedResult<T> {
  return {
    total: 0,
    page_size: 0,
    page: 1,
    first_index: 0,
    last_index: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export const defaultFacetResult: ISearchFilterFacets = {
  fields: {},
};
