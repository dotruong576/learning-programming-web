import httpRequest from '~/services/httpRequest';
import {
  TCUCommentResponse,
  TCreateCommentPayload,
  TUpdateCommentPayload,
  TUpdateLikeAndDislike,
} from '~/types/api/commentTypes';

export const getCourseComment = (courseId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/course/${courseId}`);
export const getLessonComment = (lessonId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/lesson/${lessonId}`);
export const getRepliesOfComment = (commentId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/replies/${commentId}`);

export const postCreateComment = (data: TCreateCommentPayload) =>
  httpRequest.post<TCUCommentResponse>(`/comment`, data);
export const putUpdateComment = (data: TUpdateCommentPayload) => httpRequest.put<TCUCommentResponse>(`/comment`, data);
export const deleteComment = (data: { commentId: string; courseId?: string; lessonId?: string }) =>
  httpRequest.delete<TCUCommentResponse>(
    `/comment/${data.commentId}?&${data.commentId && `courseId=${data.courseId}`}&${
      data.lessonId && `lessonId=${data.lessonId}`
    }`,
  );

export const putUpdateLikeAndDislike = (data: TUpdateLikeAndDislike) => httpRequest.put(`/comment/like-dislike`, data);
