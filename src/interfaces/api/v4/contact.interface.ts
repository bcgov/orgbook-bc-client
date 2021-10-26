export interface IContactRequest {
  reason: string;
  from_name: string;
  from_email: string;
  comments: string;
  error?: string;
  identifier?: string;
}
