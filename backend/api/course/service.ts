import { Request } from 'express';
import { ECourseStatus } from '../../constant/enum/courseEnum';
import { EUserLessonStatus } from '../../constant/enum/lessonEnum';
import { EUserRole } from '../../constant/enum/userEnum';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import { courseExistsMiddleware } from '../../middleware/exists';
import CourseModel from '../../models/course';
import LessonModel from '../../models/lesson';
import UserLessonModel from '../../models/userLessons';
import { TUserMiddlewareParse } from '../../types/api/authTypes';
import {
  TCourseById,
  TCoursePayload,
  TGetCourseByIdResponse,
  TGetCourseNavigatePayload,
  TGetCourseNavigateResponse,
} from '../../types/api/courseTypes';
import { TServiceResponseType } from '../../types/generalTypes';
import { TCourseSchema } from '../../types/schema/courseSchemaTypes';

const courseServices = {
  changeStatus: async (req: Request): Promise<TServiceResponseType<null>> => {
    const course = await courseExistsMiddleware(req);
    course.status = course.status == ECourseStatus.Hidden ? ECourseStatus.Publish : ECourseStatus.Hidden;
    await course.save();

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Change status successfully',
    };
  },
  getCourseNavigate: async (req: Request): Promise<TServiceResponseType<TGetCourseNavigateResponse>> => {
    const reqBody = req.params as TGetCourseNavigatePayload;

    const lessons = await LessonModel.find({ courseId: reqBody.courseId }).select(['title', 'type', '_id']);

    const concurrentPromise = lessons.map((item) =>
      UserLessonModel.findOne({
        lessonId: item._id,
        userId: (req.user as TUserMiddlewareParse).id,
        courseId: reqBody.courseId,
      }).then((userLesson) => ({
        title: item.title,
        type: item.type,
        status: userLesson?.status || EUserLessonStatus.Pending,
        _id: item._id,
      })),
    );

    const response: TGetCourseNavigateResponse = {
      lessons: await Promise.all(concurrentPromise),
    };

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get course navigate successfully',
    };
  },
  getAllCourse: async () => {
    const courses = await CourseModel.find({ status: ECourseStatus.Publish }, {}, { timestamps: true })
      .select(['title', 'description', 'cover', 'participantsId', 'createdAt'])
      .then((item) =>
        item.map((course) => ({
          _id: course._id,
          title: course.title,
          description: course.description,
          cover: course.cover,
          createdAt: course.createdAt,
          totalJoined: course.participantsId.length || 0,
        })),
      );

    return {
      data: courses,
      statusCode: EHttpStatus.OK,
      message: 'Get courses successfully',
    };
  },
  createCourse: async (req: Request) => {
    const reqBody = req.body as TCoursePayload;
    const course = await CourseModel.create({
      ...reqBody,
      rating: 0,
      participantsId: [],
      comments: [],
      status: ECourseStatus.Hidden,
    });
    return {
      data: course._id,
      statusCode: EHttpStatus.OK,
      message: 'Create course successfully',
    };
  },
  getCourseById: async (req: Request): Promise<TServiceResponseType<TGetCourseByIdResponse>> => {
    const courseId = (req.params as TCourseById).courseId;
    const course = await CourseModel.findById({ _id: courseId }).select([
      'title',
      'cover',
      'description',
      'participantsId',
      'status',
      'rating',
      'label',
    ]);

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    const user = req.user as TUserMiddlewareParse;

    if (user?.role !== EUserRole.Admin && course.status === ECourseStatus.Hidden) {
      throw new AppError(EHttpStatus.FORBIDDEN, 'Course is hidden and you not have permission to see it.');
    }

    const lessons = await LessonModel.find({ courseId }).select(['title', 'type', 'duration', '_id']);

    let lessonWithUserStatus;

    if (user) {
      const concurrentPromise = lessons.map((lesson) =>
        UserLessonModel.findOne({ lessonId: lesson._id, courseId, userId: (req.user as TUserMiddlewareParse).id })
          .select('status')
          .then((item) => ({
            _id: lesson?._id,
            status: item?.status || EUserLessonStatus.Pending,
            title: lesson.title,
            type: lesson.type,
            duration: lesson.duration,
          })),
      );

      lessonWithUserStatus = await Promise.all(concurrentPromise);
    } else {
      lessonWithUserStatus = lessons.map((lesson) => ({
        _id: lesson?._id,
        status: EUserLessonStatus.Pending,
        title: lesson.title,
        type: lesson.type,
        duration: lesson.duration,
      }));
    }

    return {
      data: {
        cover: course.cover,
        title: course.title,
        description: course.description,
        status: course.status,
        label: course.label,
        totalJoined: course.participantsId.length,
        lessons: lessonWithUserStatus,
        isCurrentUserJoined: course.participantsId.some(
          (item) => item.userId === (req.user as TUserMiddlewareParse)?.id,
        ),
        rating: course.rating,
      },
      statusCode: EHttpStatus.OK,
      message: 'Get Course successfully',
    };
  },
  deleteCourseById: async (req: Request) => {
    const courseId = (req.params as TCourseById).courseId;
    const course = await CourseModel.findOne({ _id: courseId });

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    course.status = ECourseStatus.Hidden;
    await course.save();

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'Delete Course successfully',
    };
  },
  updateCourseById: async (req: Request) => {
    const courseId = (req.params as TCourseById).courseId;
    const reqBody = req.body as TCourseSchema;
    const course = await CourseModel.findByIdAndUpdate({ _id: courseId }, reqBody);

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'course not found');
    }

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'Update course successfully',
    };
  },
};
export default courseServices;
