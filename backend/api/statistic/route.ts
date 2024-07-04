import express from 'express';
import statisticController from './controller';
import statisticValidator from './validator';

const statisticRoute = express.Router();

statisticRoute.get(
  '/course-all-members/:courseId',
  statisticValidator.validateGetDetailStatisticOfCourse,
  statisticController.getlAllMembersOfCourseStatistic,
);
statisticRoute.get(
  '/course-all-lessons/:courseId',
  statisticValidator.validateGetDetailStatisticOfCourse,
  statisticController.getlAllLessonssOfCourseStatistic,
);
statisticRoute.get(
  '/detail-member/:courseId/:userId',
  statisticValidator.validateGetDetailStatisticOfMemberOfCourse,
  statisticController.getlMemberOfCourseStatistic,
);
statisticRoute.get('/all-courses', statisticController.getAllCourseStatistic);

export default statisticRoute;
