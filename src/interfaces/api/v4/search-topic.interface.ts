import { ICredentialSet } from "../v2/credential-set.interface";
import { ICredentialType } from "../v2/credential-type.interface";
import { ITopicAttribute, ITopicName } from "../v2/topic.interface";

export interface ISearchQuery {
  q: string | null;
  latest: boolean | null;
  revoked: boolean | null;
  inactive: boolean | null;
  category: string | null;
  issuer_id: string | null;
  type_id: string | null;
  credential_type_id: string | null;
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
