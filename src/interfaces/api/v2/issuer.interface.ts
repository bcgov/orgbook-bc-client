import { IApiResource } from "../resource.interface";

export interface IIssuer extends IApiResource {
  id: number;
  did: string;
  name: string;
  abbreviation: string;
  email: string;
  has_logo: boolean;
  url: URL | string;
}
