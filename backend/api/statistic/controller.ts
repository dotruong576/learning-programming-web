import { tryCatchWrapper } from '../../common/catchError';
import statisticService from './services';

const statisticController = {
  getAllCourseStatistic: tryCatchWrapper(() => statisticService.getAllCourse()),
  getlAllMembersOfCourseStatistic: tryCatchWrapper((req) => statisticService.getAllMemberssOfCourse(req)),
  getlAllLessonssOfCourseStatistic: tryCatchWrapper((req) => statisticService.getAllLessonsssOfCourse(req)),
  getlMemberOfCourseStatistic: tryCatchWrapper((req) => statisticService.getMemberOfCourse(req)),
};

export default statisticController;
