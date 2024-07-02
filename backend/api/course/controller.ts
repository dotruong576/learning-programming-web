import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import courseServices from './services';

const courseControllers = {
  createCourse: tryCatchWrapper((req: Request) => courseServices.createCourse(req)),
  getCourseById: tryCatchWrapper((req: Request) => courseServices.getCourseById(req)),
  deleteCourseById: tryCatchWrapper((req: Request) => courseServices.deleteCourseById(req)),
  updateCourseById: tryCatchWrapper((req: Request) => courseServices.updateCourseById(req)),
  getAllCourses: tryCatchWrapper(() => courseServices.getAllCourse()),
  getCourseNavigate: tryCatchWrapper((req) => courseServices.getCourseNavigate(req)),
  changeStatus: tryCatchWrapper((req) => courseServices.changeStatus(req)),
};

export default courseControllers;
