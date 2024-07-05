import { Request } from 'express';
import { generateCommentResponse } from '../../common/generateCommentResponse';
import { EHttpStatus } from '../../constant/statusCode';
import { commentExistsMiddleware, courseExistsMiddleware, lessonExistsMiddleware } from '../../middleware/exists';
import { userIsOwnerOfCommentMiddleware } from '../../middleware/permissionAccess';
import CommentsModel from '../../models/comment';
import UserModel from '../../models/user';
import { TUserRole } from '../../types/api/authTypes';
import {
  EUpdateLikeAndDislikeAction,
  TCUCommentResponse,
  TCreateCommentPayload,
  TDeleteCommentPayload,
  TGetRepliesByCommentId,
  TUpdateCommentPayload,
  TUpdateLikeAndDislike,
} from '../../types/api/commentTypes';
import { TUserDocument } from '../../types/documentTypes';
import { TServiceResponseType } from '../../types/generalTypes';

const commentsService = {
  createNewComment: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse>> => {
    const user = req.user as TUserRole;
    const { rootCommentId, courseId, lessonId, ...commentData } = req.body as TCreateCommentPayload;

    const comment = await CommentsModel.create({ ...commentData, userId: user.id, isReply: !!rootCommentId });

    if (rootCommentId) {
      const parentComment = await commentExistsMiddleware(rootCommentId);

      parentComment.replies.push(comment._id.toString());
      await parentComment.save();
    }

    if (courseId) {
      const course = await courseExistsMiddleware(req);
      course.comments.push(comment._id.toString());
      course.rating =
        (course.rating * (course.comments.length - 1 || 0) + (comment.rating || 0)) / course.comments.length;
      await course.save();
    }

    if (lessonId) {
      const lesson = await lessonExistsMiddleware(req);
      lesson.comments.push(comment._id.toString());
      await lesson.save();
    }

    return {
      data: generateCommentResponse(comment, user, (await UserModel.findById(user.id)) as TUserDocument),
      statusCode: EHttpStatus.OK,
      message: 'Comment successfully',
    };
  },
  updateCommentById: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse>> => {
    const user = req.user as TUserRole;
    const reqBody = req.body as TUpdateCommentPayload;

    const comment = await commentExistsMiddleware(reqBody.commentId);
    await userIsOwnerOfCommentMiddleware(req, comment);

    comment.content = reqBody.content;
    comment.rating = reqBody.rating;

    await comment.save();

    return {
      data: generateCommentResponse(comment, user, (await UserModel.findById(user.id)) as TUserDocument),
      statusCode: EHttpStatus.OK,
      message: 'Update comment successfully',
    };
  },
  deleteCommentById: async (req: Request): Promise<TServiceResponseType<null>> => {
    const reqParams = req.params as Pick<TDeleteCommentPayload, 'commentId'>;
    const reqQuery = req.query as Omit<TDeleteCommentPayload, 'commentId'>;

    const comment = await commentExistsMiddleware(reqParams.commentId);
    await userIsOwnerOfCommentMiddleware(req, comment);

    if (reqQuery.courseId) {
      const course = await courseExistsMiddleware(req);
      if (course.comments.length - 1 > 0) {
        course.rating = (course.rating * course.comments.length - (comment.rating || 0)) / (course.comments.length - 1);
      } else {
        course.rating = 0;
      }
      course.comments = course.comments.filter((item) => item !== reqParams.commentId);
      await course.save();
    }

    if (reqQuery.lessonId) {
      const lesson = await lessonExistsMiddleware(req);
      lesson.comments = lesson.comments.filter((item) => item !== reqParams.commentId);
      await lesson.save();
    }

    await comment.deleteOne();
    const concurrentPromise = comment.replies.map((eachSubCommentId) =>
      CommentsModel.findByIdAndDelete(eachSubCommentId),
    );

    await Promise.all(concurrentPromise);

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Delete comment successfully',
    };
  },
  getCommentByCourseId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const course = await courseExistsMiddleware(req);
    const user = req.user as TUserRole;

    const concurrentPromise = course.comments.map((commentId) =>
      CommentsModel.findById(commentId).then(async (comment) =>
        !comment
          ? null
          : generateCommentResponse(comment, user, (await UserModel.findById(comment.userId)) as TUserDocument),
      ),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get comments successfully',
    };
  },
  getCommentByLessonId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const lesson = await lessonExistsMiddleware(req);
    const user = req.user as TUserRole;

    const concurrentPromise = lesson.comments.map((commentId) =>
      CommentsModel.findById(commentId).then(async (comment) =>
        !comment
          ? null
          : generateCommentResponse(comment, user, (await UserModel.findById(comment.userId)) as TUserDocument),
      ),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get comments successfully',
    };
  },
  getRepliesByCommentId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const user = req.user as TUserRole;
    const reqParams = req.params as TGetRepliesByCommentId;

    const comment = await commentExistsMiddleware(reqParams.commentId);

    const concurrentPromise = comment.replies.map((replyId) =>
      CommentsModel.findById(replyId).then(async (comment) =>
        !comment
          ? null
          : generateCommentResponse(comment, user, (await UserModel.findById(comment.userId)) as TUserDocument),
      ),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get replies successfully',
    };
  },
  putLikeAndDislike: async (req: Request): Promise<TServiceResponseType<null>> => {
    const reqBody = req.body as TUpdateLikeAndDislike;
    const user = req.user as TUserRole;

    const comment = await commentExistsMiddleware(reqBody.commentId);

    const isCurrentUserLike = comment.likedUsers.findIndex((item) => item === user.id);
    const isCurrentUserDislike = comment.unlikedUsers.findIndex((item) => item === user.id);

    switch (reqBody.action) {
      case EUpdateLikeAndDislikeAction.Like: {
        if (isCurrentUserDislike >= 0) {
          comment.unlikedUsers.splice(isCurrentUserDislike, 1);
        }
        if (isCurrentUserLike >= 0) {
          comment.likedUsers.splice(isCurrentUserLike, 1);
        } else {
          comment.likedUsers.push(user.id);
        }

        break;
      }
      case EUpdateLikeAndDislikeAction.Dislike: {
        if (isCurrentUserLike >= 0) {
          comment.likedUsers.splice(isCurrentUserLike, 1);
        }
        if (isCurrentUserDislike >= 0) {
          comment.unlikedUsers.splice(isCurrentUserDislike, 1);
        } else {
          comment.unlikedUsers.push(user.id);
        }

        break;
      }
    }

    await comment.save();

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Update replies successfully',
    };
  },
};

export default commentsService;
