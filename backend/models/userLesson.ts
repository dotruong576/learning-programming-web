import mongoose from 'mongoose';
import {
  codescriptUserLessonCheckpointValidator,
  selectionLessonResourceValidator,
  videoUserLessonCheckpointValidator,
} from '../common/models/userLessonValidator';
import { ELessonType, EUserLessonStatus } from '../constant/enum/lessonEnum';
import { TUserLessonDocument } from '../types/documentTypes';
import {
  UserCodescriptLessonCheckpoint,
  UserLessonSchema,
  UserSelectionLessonCheckpoint,
  UserVideoLessonCheckpoint,
} from '../types/schema/userLessonSchemaTypes';

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
      validate: function (value: UserLessonSchema['checkpoint']) {
        const _this = this as unknown as UserLessonSchema;

        if (_this.type === ELessonType.CodeScript) {
          return codescriptUserLessonCheckpointValidator(value as UserCodescriptLessonCheckpoint);
        }

        if (_this.type === ELessonType.Video) {
          return videoUserLessonCheckpointValidator(value as UserVideoLessonCheckpoint);
        }

        if (_this.type === ELessonType.Selection) {
          return selectionLessonResourceValidator(value as UserSelectionLessonCheckpoint[]);
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
