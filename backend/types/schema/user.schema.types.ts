import { EUserRole } from '../../constant/enum/user.enum';

export type TUserSchema = {
  email: string;
  password: string;
  fullName: string;
  role: EUserRole;
  avatar: string;
  participatedCourses: string[];
  learningLessons: string[];
};
