'use client';
import dynamic from 'next/dynamic';
import { CourseInformationComponentSkeleton } from '~/components/course_information_component';
import CourseCommentSection from './comment';
import SuggestCourse from './suggestCourse';

const CourseInformationComponent = dynamic(() => import('~/components/course_information_component'), {
  loading: CourseInformationComponentSkeleton,
});

const detailCoursePage = ({ params }: { params: { courseId: string } }) => {
  return (
    <>
      <CourseInformationComponent courseId={params.courseId} />

      <SuggestCourse courseId={params.courseId} />

      <CourseCommentSection />
    </>
  );
};
export default detailCoursePage;
