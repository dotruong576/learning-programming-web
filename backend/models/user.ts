import mongoose from 'mongoose';
import { EUserRole } from '../constant/enum/userEnum';
import { EMAIL_REGEX } from '../constant/regex';
import { TUserDocument } from '../types/documentTypes';

const { Schema } = mongoose;

const userSchema = new Schema<TUserDocument>({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [EMAIL_REGEX, 'Email format is invalid'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: EUserRole,
    default: EUserRole.Student,
  },
  avatar: {
    type: String,
  },
  participatedCourses: {
    type: [String],
    default: [],
  },
  learningLessons: {
    type: [String],
    default: [],
  },
});

const UserModel = mongoose.model<TUserDocument>('Users', userSchema, 'Users');

export default UserModel;
