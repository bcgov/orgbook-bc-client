export interface IFeedback {
  reason: "like" | "dislike" | "";
  comments: string;
  improvements?: string;
}
