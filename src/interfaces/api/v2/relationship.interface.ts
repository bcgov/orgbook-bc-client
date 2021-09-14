import { IApiProperty, IApiResource } from "../resource.interface";
import { ICredential } from "../v4/credential.interface";

export interface IRelationshipAttribute extends IApiProperty {
  id: number;
  type: string;
  value: string;
  format: string;
}

export interface IRelationshipTopicName extends IApiProperty {
  credential_id: number;
  id: number;
  language: string | null;
  text: string;
  type: string;
}

export interface IRelationshipTopic extends IApiProperty {
  create_timestamp: string;
  id: number;
  names: IRelationshipTopicName[];
  source_id: string;
  type: string;
}

export interface IRelationship extends IApiResource {
  topic_id: number;
  relation_id: number;
  credential: ICredential;
  attributes: IRelationshipAttribute[];
  topic: IRelationshipTopic;
  related_topic: IRelationshipTopic;
}
