import { Request } from 'express';
import moment from 'moment';
import { Script, createContext } from 'node:vm';
import { ELessonType, EUserLessonStatus } from '../../constant/enum/lessonEnum';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import {
  courseExistsMiddleware,
  lessonBelongsToCourseMiddleware,
  lessonExistsMiddleware,
} from '../../middleware/exists';
import { userJoinedCoursePermissionMiddleware } from '../../middleware/permissionAccess';
import UserLessonModel from '../../models/userLesson';
import { TUserRole } from '../../types/api/authTypes';
import {
  TGetResultLesson,
  TGetResultLessonResponse,
  TSubmitLessonResult,
  TUserCodescriptLessonResultSubmit,
  TUserSelectionLessonCheckpointResponse,
  TUserSelectionLessonResultSubmit,
  TUserVideoLessonResultSubmit,
} from '../../types/api/userLessonsTypes';
import { TServiceResponseType } from '../../types/generalTypes';
import { CodescriptLessonResourse, SelectionLessonResourse } from '../../types/schema/lessonSchemaTypes';
import { UserSelectionLessonCheckpoint } from '../../types/schema/userLessonSchemaTypes';

const userLessonService = {
  postResultVideoLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserVideoLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await userJoinedCoursePermissionMiddleware(course, (req.user as TUserRole).id);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.Video) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserRole).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    let status = EUserLessonStatus.Done;

    const duraionInSeconds = moment.duration(lesson?.duration).asSeconds();
    const lastViewMomentInSeconds = moment
      .duration((reqBody.submit as TUserVideoLessonResultSubmit).lastViewMoment)
      .asSeconds();

    if (duraionInSeconds > lastViewMomentInSeconds) {
      status = EUserLessonStatus.Pending;
    }

    const checkpoint = {
      lastViewMoment: (reqBody.submit as TUserVideoLessonResultSubmit).lastViewMoment,
    };

    if (previousUserLesson) {
      if (previousUserLesson.status !== EUserLessonStatus.Done) {
        previousUserLesson.status = status;
      }
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserRole).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.Video,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },

  postResultSelectionLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserSelectionLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await userJoinedCoursePermissionMiddleware(course, (req.user as TUserRole).id);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.Selection) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserRole).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    const status = EUserLessonStatus.Done;

    const checkpoint: UserSelectionLessonCheckpoint[] = reqBody.submit.map((item, index) => ({
      choosenAnswer: item.choosenAnswer,
      isCorrect: (lesson.resource as SelectionLessonResourse[])[index].correctAnswer === item.choosenAnswer,
    }));

    if (previousUserLesson) {
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserRole).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.Selection,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },

  postResultCodescriptLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserCodescriptLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await userJoinedCoursePermissionMiddleware(course, (req.user as TUserRole).id);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.CodeScript) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserRole).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    const code = (reqBody.submit as TUserCodescriptLessonResultSubmit).code;

    const script = new Script(decodeURIComponent(code));

    const result = (lesson.resource as CodescriptLessonResourse[]).map((item) => {
      const context = {
        console: console,

        input: item.input,
        expected: item.expected,
      };

      try {
        script.runInContext(createContext(context));

        if (context.input === context.expected) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);

        return false;
      }
    });

    const checkpoint = {
      code: code,
      result,
    };

    const status = result.every((item) => item) ? EUserLessonStatus.Done : EUserLessonStatus.Pending;

    if (previousUserLesson) {
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserRole).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.CodeScript,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },

  getResult: async (req: Request): Promise<TServiceResponseType<null | TGetResultLessonResponse>> => {
    const reqBody = req.query as TGetResultLesson;
    const user = req.user as TUserRole;

    await courseExistsMiddleware(req);
    const lesson = await lessonExistsMiddleware(req);

    const userLesson = await UserLessonModel.findOne({
      userId: user.id,
      courseId: reqBody.courseId,
      lessonId: reqBody.lessonId,
    });

    if (!userLesson) {
      return {
        data: null,
        statusCode: EHttpStatus.OK,
        message: 'Get user result successfully',
      };
    }

    const response = userLesson;

    switch (response.type) {
      case ELessonType.Selection: {
        response.checkpoint = (response.checkpoint as TUserSelectionLessonCheckpointResponse[]).map((item, index) => ({
          ...item,
          correctAnswer: (lesson.resource as SelectionLessonResourse[])[index].correctAnswer,
        }));
        break;
      }
      default: {
        break;
      }
    }

    return {
      data: response as TGetResultLessonResponse,
      statusCode: EHttpStatus.OK,
      message: 'Get user result successfully',
    };
  },
};

export default userLessonService;
