import httpRequest from '~/services/httpRequest';
import { TCreateLessonPayload, TGetLessonByIdResponse, TLessonResource } from '~/types/api/lessonTypes';

export const getLessonById = (lessonId: string) => httpRequest.get<TGetLessonByIdResponse>(`/lesson/${lessonId}`);
export const createLesson = (data: TCreateLessonPayload<TLessonResource>) =>
  httpRequest.post<string>(`/lesson/create-lesson?type=${data.type}`, data);

export const updateLesson = (lessonId: string, data: TCreateLessonPayload<TLessonResource>) =>
  httpRequest.put<string>(`/lesson/${lessonId}?type=${data.type}`, data);
