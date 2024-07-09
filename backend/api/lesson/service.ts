import { Request } from 'express';
import { ELessonType } from '../../constant/enum/lesson.enum';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import CourseModel from '../../models/course';
import LessonModel from '../../models/lesson';
import { TCreateLessonPayload, TLessonById } from '../../types/api/lesson.types';
import { TLessonResource, TVideoLessonResourse } from '../../types/schema/lesson.schema.types';

const lessonServices = {
  createLesson: async (req: Request) => {
    const reqBody = req.body as TCreateLessonPayload<TLessonResource>;
    const courseId = reqBody.courseId;

    const course = await CourseModel.findById({ _id: courseId });

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    const createdLesson = await LessonModel.create({
      ...reqBody,
      type: req.query.type as ELessonType,
      duration:
        (req.query.type as ELessonType) === ELessonType.Video
          ? parseInt((reqBody.resource as TVideoLessonResourse).duration)
          : (reqBody.resource as unknown[]).length,
      comments: [],
    });
    const createdLessonId = createdLesson._id.toString();

    course.lessonIds.push(createdLessonId);
    await course.save();

    return {
      data: createdLessonId,
      statusCode: EHttpStatus.OK,
      message: 'Register successfully',
    };
  },
  getLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const lesson = await LessonModel.findById({ _id: lessonId }).select(['title', 'type', 'description', 'resource']);

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }

    return {
      data: lesson,
      statusCode: EHttpStatus.OK,
      message: 'Get lesson successfully',
    };
  },
  deleteLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const lesson = await LessonModel.findById({ _id: lessonId });

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }
    await lesson.deleteOne();
    const courseId = lesson.courseId;
    // Retrieve the corresponding course
    const course = await CourseModel.findById(courseId);

    if (!course) {
      // Handle case where course is not found
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    // Remove the lesson ID from the lessonIds array
    course.lessonIds = course.lessonIds.filter((id) => id.toString() !== lessonId.toString());

    // Save the updated course
    await course.save();

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Delete lesson successfully',
    };
  },
  updateLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const reqBody = req.body as TCreateLessonPayload<TLessonResource>;

    const lesson = await LessonModel.findByIdAndUpdate({ _id: lessonId }, reqBody);

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }

    return {
      data: lesson,
      statusCode: EHttpStatus.OK,
      message: 'Update lesson successfully',
    };
  },
};
export default lessonServices;
