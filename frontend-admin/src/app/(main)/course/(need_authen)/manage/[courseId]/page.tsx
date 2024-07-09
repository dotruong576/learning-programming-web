import EditCourseInformation from '~/components/course/edit_course_infor';
import EditCourseLesson from '~/components/course/edit_course_lesson';

const CourseUpdateAdd = ({ params }: { params: { courseId: string } }) => {
  return (
    <div className="pr-10 pl-10 pb-10 pt-5">
      <EditCourseInformation courseId={params.courseId} />
      <EditCourseLesson courseId={params.courseId} />
    </div>
  );
};
export default CourseUpdateAdd;
