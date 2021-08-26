import { IApiResource } from "../resource.interface";
import { ICredentialType } from "../v2/credential-type.interface";

interface ICredentialName {
  id: number;
  type: string;
  text: string;
  language: string;
  credential_id: number;
}

interface ICredentialAttribute{
  id:number;
  type:string;
  format:string;
  value:string|number|boolean
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
  revoked_by:number;
  names: ICredentialName[];
  credential_type: ICredentialType;
  attributes: ICredentialAttribute[]
}
