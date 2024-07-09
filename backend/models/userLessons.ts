import mongoose from 'mongoose';
import {
  codescriptUserLessonCheckpointValidator,
  selectionLessonResourceValidator,
  videoUserLessonCheckpointValidator,
} from '../common/models/userLessonValidator';
import { ELessonType, EUserLessonStatus } from '../constant/enum/lesson.enum';
import { TUserLessonDocument } from '../types/document.types';
import {
  TUserCodescriptLessonCheckpoint,
  TUserLessonSchema,
  TUserSelectionLessonCheckpoint,
  TUserVideoLessonCheckpoint,
} from '../types/schema/userLessons.schema.types';

const { Schema } = mongoose;

const userLessonSchema = new Schema<TUserLessonDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: EUserLessonStatus,
      default: EUserLessonStatus.Pending,
    },
    type: {
      enum: ELessonType,
      type: String,
      required: true,
    },
    checkpoint: {
      type: Schema.Types.Mixed,
      required: true,
      validate: function (value: TUserLessonSchema['checkpoint']) {
        const _this = this as unknown as TUserLessonSchema;

        if (_this.type === ELessonType.CodeScript) {
          return codescriptUserLessonCheckpointValidator(value as TUserCodescriptLessonCheckpoint);
        }

        if (_this.type === ELessonType.Video) {
          return videoUserLessonCheckpointValidator(value as TUserVideoLessonCheckpoint);
        }

        if (_this.type === ELessonType.Selection) {
          return selectionLessonResourceValidator(value as TUserSelectionLessonCheckpoint[]);
        }
      },
    },
  },
  { timestamps: true },
);

const UserLessonModel = mongoose.model<TUserLessonDocument>('User_Lesson', userLessonSchema, 'User_Lesson');

UserLessonModel.collection.createIndex(
  { userId: 1, courseId: 1, lessonId: 1 },
  {
    unique: true,
  },
);

export default UserLessonModel;
