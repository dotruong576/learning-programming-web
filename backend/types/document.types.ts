import mongoose, { Document } from 'mongoose';
import { TCommentSchema } from './schema/comment.schema.types';
import { TCourseSchema } from './schema/course.schema.types';
import { TLessonResource, TLessonSchema } from './schema/lesson.schema.types';
import { TUserSchema } from './schema/user.schema.types';
import { TUserLessonSchema } from './schema/userLessons.schema.types';

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
