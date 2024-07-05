import { TCommentsDocument, TUserDocument } from '../documentTypes';

export type TCreateCommentPayload = {
  rating?: number;
  content: string;
  rootCommentId?: string;
  lessonId?: string;
  courseId?: string;
};

export type TUpdateCommentPayload = {
  commentId: string;
  content: string;
  rating?: number;
};

export type TDeleteCommentPayload = {
  commentId: string;
  lessonId?: string;
  courseId?: string;
};

export type TGetCommentByCourseId = {
  courseId: string;
};

export type TGetCommentByLessonId = {
  lessonId: string;
};

export type TGetRepliesByCommentId = {
  commentId: string;
};

/** CU means Create - Update */
export type TCUCommentResponse = Pick<TCommentsDocument, 'content' | 'userId' | 'rating' | 'isReply' | '_id'> &
  Pick<TUserDocument, 'fullName' | 'avatar'> & {
    numberOfLikes: number;
    numberOfDislikes: number;
    numberOfReplies: number;
    isCurrentUserLike: boolean;
    isCurrentUserDislike: boolean;
    createdAt: string;
  };

export enum EUpdateLikeAndDislikeAction {
  Like = 'like',
  Dislike = 'dislike',
}

export type TUpdateLikeAndDislike = {
  action: EUpdateLikeAndDislikeAction;
  commentId: string;
};
