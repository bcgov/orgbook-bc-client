export interface IEntityFacetField {
  value: string;
  count?: number;
  text: string;
}

export type IEntityFilter = Record<string, string | Array<string> | boolean>;
