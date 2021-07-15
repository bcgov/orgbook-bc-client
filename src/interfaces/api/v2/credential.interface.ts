import { IApiResource } from "../resource.interface";
import { ICredentialType } from "./credential-type.interface";

interface ICredentialName {
  id: number;
  type: string;
  text: string;
  language: string;
  credential_id: number;
}

interface ICredentialTopic {
  id: number;
  source_id: string;
  type: string;
  names: ICredentialName[];
  local_name: ICredentialName;
  remote_name: ICredentialName;
}

export interface ICredential extends IApiResource {
  id: number;
  credential_id: string;
  latest: boolean;
  revoked: boolean;
  inactive: boolean;
  effective_date: Date;
  revoked_date: Date;
  names: ICredentialName[];
  local_name: ICredentialName;
  remote_name: ICredentialName;
  topic: ICredentialTopic;
  related_topics: ICredentialTopic[];
  credential_type: ICredentialType;
}
