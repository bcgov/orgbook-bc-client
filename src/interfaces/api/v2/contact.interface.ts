export interface IContactRequest {
  reason: string;
  from_name: string;
  from_email: string;
  comments: string;
}

export interface IIncorrectInfoContactRequest extends IContactRequest {
  reason: string;
  error: string;
  identifier: string;
}
