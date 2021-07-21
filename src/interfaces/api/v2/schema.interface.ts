import { IApiResource } from "../resource.interface";

export interface ISchema extends IApiResource {
  id: number;
  origin_did: string;
  name: string;
  version: string;
}
