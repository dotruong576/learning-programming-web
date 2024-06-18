import mongoose, { Document } from 'mongoose';
import { UserSchema } from './schema/userSchemaTypes';

export type TDocument<T> = Document<unknown, object, T> &
  T & {
    _id: mongoose.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
  };

export type TUserDocument = TDocument<UserSchema>;
