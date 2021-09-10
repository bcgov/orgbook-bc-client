import { IApiResource } from "../resource.interface";
import { ICredentialSet } from "../v2/credential-set.interface";
import { ICredentialType } from "../v2/credential-type.interface";
import { IFormattedTopic, ITopic } from "../v2/topic.interface";

interface ICredentialName {
  id: number;
  type: string;
  text: string;
  language: string;
  credential_id: number;
}

interface ICredentialAttribute {
  id: number;
  type: string;
  format: string;
  value: string | number | boolean;
}

export interface ICredential extends IApiResource {
  id: number;
  credential_id: string;
  credential_def_id: string;
  latest: boolean;
  revoked: boolean;
  inactive: boolean;
  effective_date: Date;
  revoked_date: Date;
  revoked_by: number;
  names: ICredentialName[];
  credential_type: ICredentialType;
  attributes: ICredentialAttribute[];
}

export interface ICredentialDisplayType {
  id: number;
  credential_type: string;
  type: string;
  authority: string;
  authorityLink: string | URL;
  registration_reason?: string;
  date_effective: Date;
  revoked: boolean;
  revoked_date?: Date;
  value: string | number;
  relationship_types?: string[];
}

export interface ICredentialFormatted {
  create_timestamp: Date;
  effective_date: Date;
  inactive: boolean;
  latest: boolean;
  revoked: boolean;
  revoked_date?: Date;
  credential_id: string;
  credential_type: ICredentialType;
  addresses: ICredential[];
  names: ICredentialName;
  attributes: ICredentialAttribute[];
  local_name: ICredentialName;
  remote_name?: ICredentialName;
  topic: IFormattedTopic;
  related_topics: ITopic[];
  credential_set: ICredentialSet;
}

export interface ICredentialDetailView {
  effective_date: Date;
  entity_name: string;
  assumed_entity_name?: string;
  assumed_entity_name_effective?: Date;
  entity_name_effective?: Date;
  entity_name_trans?: string;
  entity_status: string;
  entity_status_effective: string;
  entity_type: string;
  expiry_date?: string;
  extra_jur_registration?: string;
}
