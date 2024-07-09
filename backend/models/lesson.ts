import mongoose, { Schema } from 'mongoose';
import {
  codescriptLessonResourceValidator,
  selectionLessonResourceValidator,
  videoLessonResourceValidator,
} from '../common/models/lessonValidator';
import { ELessonType } from '../constant/enum/lessonEnum';
import { TLessonDocument } from '../types/documentTypes';
import {
  TCodescriptLessonResourse,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '../types/schema/lessonSchemaTypes';

const lessonSchema = new Schema<TLessonDocument>(
  {
    courseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ELessonType),
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    comments: {
      type: [String],
      required: true,
      default: [],
    },
    resource: {
      type: Schema.Types.Mixed,
      required: true,
      validate: function (value: TLessonDocument['resource']) {
        const _this = this as unknown as TLessonDocument;

        if (_this.type === ELessonType.CodeScript) {
          return codescriptLessonResourceValidator(value as TCodescriptLessonResourse[]);
        }

        if (_this.type === ELessonType.Video) {
          return videoLessonResourceValidator(value as TVideoLessonResourse);
        }

        if (_this.type === ELessonType.Selection) {
          return selectionLessonResourceValidator(value as TSelectionLessonResourse[]);
        }
      },
    },
  },
  { timestamps: true },
);

// Define the document interface

const LessonModel = mongoose.model<TLessonDocument>('Lessons', lessonSchema, 'Lessons');

export default LessonModel;
