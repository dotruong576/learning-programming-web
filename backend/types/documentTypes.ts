import mongoose, { Document } from 'mongoose';
import { UserSchema } from './schema/userSchemaTypes';
import { CourseSchema } from './schema/courseSchemaTypes';
import { LessonSchema,  LessonResource } from './schema/lessonSchemaTypes';
import { CommentSchema } from './schema/commentSchemaTypes';
import { UserLessonSchema } from './schema/userLessonSchemaTypes';

export type TDocument<T> = Document<unknown, object, T> &
  T & {
    _id: mongoose.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
  };

export type TUserDocument = TDocument<UserSchema>;
export type TCourseDocument = TDocument<CourseSchema>;
export type TLessonDocument = TDocument<LessonSchema<LessonResource>>;
export type TUserLessonDocument = TDocument<UserLessonSchema>;
export type TCommentsDocument = TDocument<CommentSchema>;
