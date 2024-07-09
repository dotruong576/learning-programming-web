import { TUserMiddlewareParse } from '../types/api/auth.types';
import { TCUCommentResponse } from '../types/api/comments.types';
import { TCommentsDocument, TUserDocument } from '../types/document.types';

export const generateCommentResponse = (
  comment: TCommentsDocument,
  user: TUserMiddlewareParse | undefined,
  ownerComment: TUserDocument,
): TCUCommentResponse => {
  return {
    _id: comment._id,
    content: comment.content,
    userId: comment.userId,
    rating: comment.rating || 0,
    numberOfDislikes: comment.unlikedUsers.length,
    numberOfLikes: comment.likedUsers.length,
    numberOfReplies: comment.replies.length,
    isCurrentUserDislike: comment.unlikedUsers.includes(user?.id || ''),
    isCurrentUserLike: comment.likedUsers.includes(user?.id || ''),
    isReply: comment.isReply,
    fullName: ownerComment.fullName,
    avatar: ownerComment.avatar,
    createdAt: comment.createdAt,
  };
};
