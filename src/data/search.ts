import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";

export const entityStatusSpec: ISearchFilter = {
  type: "category",
  key: "entity_status",
  queryParameter: "category:entity_status",
  label: "filter.category.entity_status",
};

export const entityTypeSpec: ISearchFilter = {
  type: "category",
  key: "entity_type",
  queryParameter: "category:entity_type",
  label: "filter.category.entity_type",
};

export const credentialTypeSpec: ISearchFilter = {
  type: "credential_type_id",
  key: "credential_type_id",
  queryParameter: "credential_type_id",
  label: "filter.credential_type_id",
};
