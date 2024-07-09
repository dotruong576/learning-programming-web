import mongoose, { Document } from 'mongoose';
import { TCommentSchema } from './schema/commentSchemaTypes';
import { TCourseSchema } from './schema/courseSchemaTypes';
import { TLessonResource, TLessonSchema } from './schema/lessonSchemaTypes';
import { TUserSchema } from './schema/userSchemaTypes';
import { TUserLessonSchema } from './schema/userLessonsSchemaTypes';

export type TDocument<T> = Document<unknown, object, T> &
  T & {
    _id: mongoose.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
  };

export type TCourseDocument = TDocument<TCourseSchema>;
export type TLessonDocument = TDocument<TLessonSchema<TLessonResource>>;
export type TUserDocument = TDocument<TUserSchema>;
export type TUserLessonDocument = TDocument<TUserLessonSchema>;
export type TCommentsDocument = TDocument<TCommentSchema>;
