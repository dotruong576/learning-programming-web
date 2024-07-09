import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import userCourseServices from './service';

const userCourseControllers = {
  userJoinCourseById: tryCatchWrapper((req: Request) => userCourseServices.userJoinCourseById(req)),
  searchCourseTitle: tryCatchWrapper((req: Request) => userCourseServices.searchCourseTitle(req)),
  deleteUserJoinedCourseById: tryCatchWrapper((req: Request) => userCourseServices.deleteUserJoinedCourseById(req)),
  getCourseSuggestions: tryCatchWrapper((req: Request) => userCourseServices.getCourseSuggestions(req)),
};

export default userCourseControllers;
