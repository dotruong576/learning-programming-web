import LessonCommentSection from './comment';
import LessonContent from './content';

export default function Page({ params }: { params: { lessonId: string; courseId: string } }) {
  return (
    <>
      <LessonContent lessonId={params.lessonId} courseId={params.courseId} />

      <LessonCommentSection />
    </>
  );
}
