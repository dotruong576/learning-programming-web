import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import lessonServices from './services';

const lessonControllers = {
  createLesson: tryCatchWrapper((req: Request) => lessonServices.createLesson(req)),
  getLessonById: tryCatchWrapper((req: Request) => lessonServices.getLessonById(req)),
  deleteLessonById: tryCatchWrapper((req: Request) => lessonServices.deleteLessonById(req)),
  updateLessonById: tryCatchWrapper((req: Request) => lessonServices.updateLessonById(req)),
};

export default lessonControllers;
