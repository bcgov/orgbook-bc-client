import { IApiResource } from "../resource.interface";
import { ICredential } from "./credential.interface";

export interface ICredentialSet extends IApiResource {
  id: number;
  latest_credential_id: number;
  topic_id: number;
  first_effective_date: Date;
  last_effective_date: Date;
  credentials: ICredential[];
}
