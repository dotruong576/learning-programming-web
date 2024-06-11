import { EUserRole } from "../../constant/enum/userEnum";

export type UserSchema = {
    email: string;
    password: string;
    role: EUserRole;
    fullName: string;
    avatar: string;
    participatedCourses: string[];
    learningLessons: string[];
}