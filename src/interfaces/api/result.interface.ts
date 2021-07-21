export interface IApiPagedResult<T> {
  total: number;
  page_size: number;
  page: number;
  first_index: number;
  last_index: number;
  next: URL | string | null;
  previous: URL | string | null;
  results: T[];
}
