import { ISearchFilter } from "@/interfaces/api/v4/search-topic.interface";

export const entityStatusSpec: ISearchFilter = {
  type: "category",
  key: "entity_status",
  queryParameter: "inactive",
  label: "entity_status",
  valueMapper: {
    ACT: "false",
    HIS: "true",
  },
  defaultValue: "",
};

export const entityTypeSpec: ISearchFilter = {
  type: "category",
  key: "entity_type",
  queryParameter: "category:entity_type",
  label: "entity_type",
};

export const credentialTypeSpec: ISearchFilter = {
  type: "credential_type_id",
  key: "credential_type_id",
  queryParameter: "credential_type_id",
  label: "credential_type_id",
};

export const pageSpec: ISearchFilter = {
  type: "page",
  key: "page",
  queryParameter: "page",
  label: "page",
};
