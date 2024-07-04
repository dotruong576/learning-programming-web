import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import commentsService from './services';

const commentController = {
  createNewComment: tryCatchWrapper((req: Request) => commentsService.createNewComment(req)),
  updateCommentById: tryCatchWrapper((req: Request) => commentsService.updateCommentById(req)),
  deleteCommentById: tryCatchWrapper((req: Request) => commentsService.deleteCommentById(req)),
  getCommentByCourseId: tryCatchWrapper((req: Request) => commentsService.getCommentByCourseId(req)),
  getCommentByLessonId: tryCatchWrapper((req: Request) => commentsService.getCommentByLessonId(req)),
  getRepliesByCommentId: tryCatchWrapper((req: Request) => commentsService.getRepliesByCommentId(req)),
  putUpdateLikeAndDislike: tryCatchWrapper((req: Request) => commentsService.putLikeAndDislike(req)),
};

export default commentController;
