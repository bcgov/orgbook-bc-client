import { IApiPagedResult } from "../result.interface";
import { ICredentialSet } from "../v2/credential-set.interface";
import { ICredentialType } from "../v2/credential-type.interface";
import { ITopicAttribute, ITopicName } from "../v2/topic.interface";

export interface ISearchQuery {
  q: unknown;
  "category:entity_type"?: unknown;
  credential_type_id?: unknown;
  inactive?: unknown;
  page?: unknown;
  [index: string]: ISearchQuery[keyof ISearchQuery];
}

interface ISearchFilterBase {
  type: string;
  key: string;
  queryParameter: string;
  label?: string;
}

export interface ISearchFilterOptions extends ISearchFilterBase {
  keySelector: (filter?: ISearchFilter) => unknown;
  valueSelector: (filter?: ISearchFilter) => unknown;
  inclusions?: string[];
  exclusions?: string[];
}

export interface ISearchFilter extends ISearchFilterBase {
  count?: number;
  text?: string;
  value?: unknown;
  valueMapper?: Record<string, unknown>;
  defaultValue?: unknown;
}

export type ISearchFilterFieldRecord = Record<string, ISearchFilter>;

export interface ISearchFilterFacets {
  fields: ISearchFilterFieldRecord;
}

export interface ISearchTopic {
  id: number;
  source_id: string;
  type: string;
  names: ITopicName[];
  addresses: unknown[];
  attributes: ITopicAttribute[];
  credential_set: ICredentialSet;
  credential_type: ICredentialType;
  inactive: boolean;
  revoked: boolean;
  effective_date: Date;
  revoked_date: Date;
}

export interface ISearchFacetedTopic {
  facets: ISearchFilterFacets;
  objects: IApiPagedResult<ISearchTopic>;
}
