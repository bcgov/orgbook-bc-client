import { IApiResource } from "../resource.interface";
import { IIssuer } from "./issuer.interface";
import { ISchema } from "./schema.interface";

export interface ICredentialType extends IApiResource {
  id: number;
  credential_def_id: string;
  description: string;
  has_logo: boolean;
  url: URL | string;
  last_issue_date: Date;
  schema: ISchema;
  issuer: IIssuer;
}

export interface ICredentialTypeByIssuer {
  issuer: IIssuer;
  credentialTypes: ICredentialType[];
}
