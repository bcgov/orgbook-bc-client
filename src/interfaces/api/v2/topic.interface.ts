import { IApiProperty, IApiResource } from "../resource.interface";
import { IIssuer } from "./issuer.interface";

export interface ITopicName extends IApiProperty {
  id: number;
  type: string;
  text: string;
  language: string;
  inactive: boolean;
  credential_id: number;
  last_updated: Date;
  issuer: IIssuer;
}

export interface ITopicAttribute extends IApiProperty {
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

export interface ITopicLocalName{
  id:number;
  text:string;
  language?:string;
  credential_id:number;
  type:string;
}

export interface IFormattedTopic extends ITopic {
  names: ITopicName[];
  local_name: ITopicLocalName;
  attributes: ITopicAttribute[];
}
