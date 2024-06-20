export type CommentSchema = {
    userId: string;
    content: string;
    rating?: number;
    likedUsers: string[];
    unlikedUsers: string[];
    replies: string[];
    isReply: boolean;
  };
  