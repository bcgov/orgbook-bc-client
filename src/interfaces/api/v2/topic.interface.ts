import { IApiResource } from "../resource.interface";
import { IIssuer } from "./issuer.interface";

interface ITopicName {
  id: number;
  type: string;
  text: string;
  language: string;
  inactive: boolean;
  credential_id: number;
  last_updated: "1928-12-28T08:00:00Z";
  issuer: IIssuer;
}

interface ITopicAttribute {
  id: number;
  type: string;
  value: string;
  format: string;
  inactive: boolean;
  credential_id: number;
  credential_type_id: number;
  last_updated: Date;
}

export interface ITopic extends IApiResource {
  id: number;
  source_id: string;
  type: string;
  related_to: number[];
  related_from: number[];
}

export interface IFormattedTopic extends ITopic {
  names: ITopicName[];
  attributes: ITopicAttribute[];
}
