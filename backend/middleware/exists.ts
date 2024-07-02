import { Request } from 'express';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import CommentsModel from '../models/comment';
import CourseModel from '../models/course';
import LessonModel from '../models/lesson';
import { TCommentsDocument, TCourseDocument, TLessonDocument } from '../types/documentTypes';

export const lessonExistsMiddleware = async (req: Request): Promise<TLessonDocument> => {
  const lessonId = req.body.lessonId || req.query.lessonId || req.params.lessonId;
  const lesson = await LessonModel.findById(lessonId);
  if (!lesson) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not found.');
  }
  return lesson;
};

export const courseExistsMiddleware = async (req: Request): Promise<TCourseDocument> => {
  const courseId = req.body.courseId || req.query.courseId || req.params.courseId;
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Course not found.');
  }
  return course;
};

export const lessonBelongsToCourseMiddleware = async ({
  course,
  lesson,
}: {
  course: TCourseDocument;
  lesson: TLessonDocument;
}) => {
  if (!course.lessonIds.includes(lesson._id.toString())) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not belongs to course.');
  }
};

export const commentExistsMiddleware = async (commentId: string): Promise<TCommentsDocument> => {
  const comment = await CommentsModel.findById(commentId);
  if (!comment) {
    throw new AppError(EHttpStatus.NOT_FOUND, 'Comment not found');
  }
  return comment;
};
