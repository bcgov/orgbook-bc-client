import { IApiPagedResult } from "@/interfaces/api/result.interface";

export const defaultQuery = {
  q: null,
  latest: true,
  revoked: false,
  inactive: null,
  category: null,
  issuer_id: null,
  type_id: null,
  credential_type_id: null,
};

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
