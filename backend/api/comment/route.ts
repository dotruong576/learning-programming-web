import express from 'express';
import authenticateMiddleware, { nonStrictAuthenticateMiddleware } from '../../middleware/auth';
import commentController from './controller';
import commentValidator from './validator';

const commentRoute = express.Router();

commentRoute.get(
  '/course/:courseId',
  nonStrictAuthenticateMiddleware,
  commentValidator.validateGetCommentByCourseId,
  commentController.getCommentByCourseId,
);

commentRoute.get(
  '/lesson/:lessonId',
  nonStrictAuthenticateMiddleware,
  commentValidator.validateGetCommentByLessonId,
  commentController.getCommentByLessonId,
);

commentRoute.get(
  '/replies/:commentId',
  nonStrictAuthenticateMiddleware,
  commentValidator.validateGetRepliesByCommentId,
  commentController.getRepliesByCommentId,
);

commentRoute.post(
  '/',
  authenticateMiddleware,
  commentValidator.validateCreateComment,
  commentController.createNewComment,
);

commentRoute.put(
  '/',
  authenticateMiddleware,
  commentValidator.validateUpdateComment,
  commentController.updateCommentById,
);

commentRoute.delete(
  '/:commentId',
  authenticateMiddleware,
  commentValidator.validateDeleteComment,
  commentController.deleteCommentById,
);

commentRoute.put(
  '/like-dislike',
  authenticateMiddleware,
  commentValidator.validatePutUpdateLikeAndDislike,
  commentController.putUpdateLikeAndDislike,
);

export default commentRoute;
