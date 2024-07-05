import httpRequest from '~/services/httpRequest';
import {
  IAllCouresResponse,
  IGetCourseByIdResponse,
  TCoursePayload,
  TGetCourseNavigateResponse,
} from '~/types/api/courseTypes';

export const getAllCourses = () => httpRequest.get<IAllCouresResponse[]>('/course/all');
export const getCourseById = (courseId: string) => httpRequest.get<IGetCourseByIdResponse>(`/course/${courseId}`);
export const getCourseNavigate = (courseId: string) =>
  httpRequest.get<TGetCourseNavigateResponse>(`/course/course-navigate/${courseId}`);

export const postCreateCourse = (data: TCoursePayload) => httpRequest.post<string>(`/course/create-course`, data);
export const putUpdateCourse = (courseId: string, data: Partial<TCoursePayload>) =>
  httpRequest.put<string>(`/course/${courseId}`, data);

export const postChangeCourseStatus = (courseId: string) =>
  httpRequest.post<string>(`/course/status/${courseId}`, null);
