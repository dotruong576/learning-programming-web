import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import userLessonService from './service';

const userLessonController = {
  postVideoLessonResult: tryCatchWrapper((req: Request) => userLessonService.postResultVideoLesson(req)),
  postSelectionLessonResult: tryCatchWrapper((req: Request) => userLessonService.postResultSelectionLesson(req)),
  postCodescriptLessonResult: tryCatchWrapper((req: Request) => userLessonService.postResultCodescriptLesson(req)),
  getResultLesson: tryCatchWrapper((req) => userLessonService.getResult(req)),
};

export default userLessonController;
