import { NextFunction, Request, Response } from 'express';
import { EUserRole } from '../constant/enum/userEnum';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import { TUserRole } from '../types/api/authTypes';
import { TCommentsDocument, TCourseDocument } from '../types/documentTypes';

export const userRolePermissionMiddleware =
  (roleAccess: EUserRole[] = [EUserRole.Admin, EUserRole.Student]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have user in req.');
      res.status(err.statusCode).json({ data: null, message: err.message });
      return;
    }

    if (roleAccess.includes((req.user as TUserRole).role)) {
      next();
      return;
    }

    const err = new AppError(EHttpStatus.FORBIDDEN, 'You do not have access to this resource.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  };

export const userJoinedCoursePermissionMiddleware = async (course: TCourseDocument, userId: string) => {
  if (!course.participantsId.some((item) => item.userId === userId)) {
    throw new AppError(EHttpStatus.FORBIDDEN, 'You have not joined this course.');
  }
};

export const userIsOwnerOfCommentMiddleware = async (req: Request, comment: TCommentsDocument) => {
  const user = req.user as TUserRole;
  if (comment.userId !== user.id) {
    throw new AppError(EHttpStatus.FORBIDDEN, 'You is not owner of this comment');
  }
};
