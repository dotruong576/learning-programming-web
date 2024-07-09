import { Request } from 'express';
import { ELessonType, EUserLessonStatus } from '../../constant/enum/lessonEnum';
import { EHttpStatus } from '../../constant/statusCode';
import { courseExistsMiddleware } from '../../middleware/exists';
import { userJoinedCoursePermissionMiddleware } from '../../middleware/permissionAccess';
import CourseModel from '../../models/course';
import LessonModel from '../../models/lesson';
import UserModel from '../../models/user';
import UserLessonModel from '../../models/userLessons';
import {
  TGetAllCourseStatisticResponse,
  TGetAllLessonOfCourseStatisticResponse,
  TGetAllMembersOfCourseStatisticResponse,
  TGetDetailStatisticMemberOfCourseRequest,
  TGetMemberOfCourseStatisticResponse,
} from '../../types/api/statisticTypes';
import { TServiceResponseType } from '../../types/generalTypes';
import { TCodescriptLessonResourse, TSelectionLessonResourse } from '../../types/schema/lessonSchemaTypes';
import {
  TUserCodescriptLessonCheckpoint,
  TUserSelectionLessonCheckpoint,
} from '../../types/schema/userLessonsSchemaTypes';

const statisticService = {
  getAllCourse: async (): Promise<TServiceResponseType<TGetAllCourseStatisticResponse[]>> => {
    const allCourse = await CourseModel.find(
      {},
      {
        _id: true,
        cover: true,
        title: true,
        rating: true,
        lessonIds: true,
        createdAt: true,
        participantsId: true,
      },
      { timestamps: true },
    );

    return {
      data: allCourse,
      statusCode: EHttpStatus.OK,
      message: 'Get all courses statistic successfully',
    };
  },
  getAllMemberssOfCourse: async (
    req: Request,
  ): Promise<TServiceResponseType<TGetAllMembersOfCourseStatisticResponse[]>> => {
    const course = await courseExistsMiddleware(req);

    const participants = course.participantsId;

    const concurrentPromise = participants.map((item) =>
      UserModel.findById(item.userId)
        .then(
          (user) =>
            ({
              fullName: user?.fullName,
              avatar: user?.avatar || null,
              _id: user?._id,
              participatedDate: item.participatedDate,
            }) as TGetAllMembersOfCourseStatisticResponse,
        )
        .catch(() => null),
    );

    const response = (await Promise.all(concurrentPromise).then((item) =>
      item.filter((item) => item != null),
    )) as TGetAllMembersOfCourseStatisticResponse[];

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get all members statistic of course successfully',
    };
  },
  getAllLessonsssOfCourse: async (
    req: Request,
  ): Promise<TServiceResponseType<TGetAllLessonOfCourseStatisticResponse[]>> => {
    const course = await courseExistsMiddleware(req);
    const lessons = course.lessonIds;

    const concurrentPromise = lessons.map(async (item) => {
      return Promise.all([
        LessonModel.findById(item).then((item) => ({
          title: item?.title,
          createdAt: item?.createdAt,
          duration: item?.duration,
          type: item?.type,
        })),
        UserLessonModel.countDocuments({ lessonId: item, status: EUserLessonStatus.Done }),
      ]).then((item) => ({
        ...item[0],
        completedTimes: item[1],
      }));
    });

    const response = (await Promise.all(concurrentPromise).then((item) =>
      item.filter((item) => item != null),
    )) as TGetAllLessonOfCourseStatisticResponse[];

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get all lessons statistic of course successfully',
    };
  },
  getMemberOfCourse: async (req: Request): Promise<TServiceResponseType<TGetMemberOfCourseStatisticResponse[]>> => {
    const reqBody = req.params as TGetDetailStatisticMemberOfCourseRequest;

    const course = await courseExistsMiddleware(req);
    await userJoinedCoursePermissionMiddleware(course, reqBody.userId);

    const lessons = await LessonModel.find({ courseId: reqBody.courseId });

    const concurrentPromise = lessons.map((item) =>
      UserLessonModel.findOne({
        //document contains all below condition only exist 1 due to indexes
        courseId: reqBody.courseId,
        lessonId: item._id,
        userId: reqBody.userId,
      }).then((userLessonItem): TGetMemberOfCourseStatisticResponse => {
        let result: TGetMemberOfCourseStatisticResponse['result'] = null;

        if (userLessonItem !== null) {
          switch (userLessonItem.type) {
            case ELessonType.Video:
              break;
            case ELessonType.CodeScript:
              result = {
                completed: (userLessonItem.checkpoint as TUserCodescriptLessonCheckpoint).result.filter((item) => item)
                  .length,
                total: (item.resource as TCodescriptLessonResourse[]).length,
              };
              break;
            case ELessonType.Selection:
              result = {
                completed: (userLessonItem.checkpoint as TUserSelectionLessonCheckpoint[]).filter(
                  (item) => item.isCorrect,
                ).length,
                total: (item.resource as TSelectionLessonResourse[]).length,
              };
              break;
            default:
              break;
          }
        }

        return {
          status: userLessonItem?.status || null,
          title: item.title,
          duration: item.duration,
          createdAt: item.createdAt,
          type: item.type,
          result,
        };
      }),
    );

    const response = await Promise.all(concurrentPromise);

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get member detail statistic of course successfully',
    };
  },
};

export default statisticService;
