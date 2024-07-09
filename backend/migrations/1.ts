import { ECourseStatus } from '../constant/enum/course.enum';
import { ELessonType, ESelectionAnswerChoiceList } from '../constant/enum/lesson.enum';
import CourseModel from '../models/course';
import LessonModel from '../models/lesson';

const migrations_1 = async () => {
  const course = new CourseModel({
    title: 'Migrate Sample Course',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
    rating: '4.5',
    lessonIds: [],
    status: ECourseStatus.Publish,
    label: [],
    comments: [],
    participantsId: [{ userId: '657b15d41496e25733ac86c7', participatedDate: new Date() }],
  });
  await course.save();

  const lesson = new LessonModel({
    courseId: course._id,
    title: 'Migrate Sample Lesson',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
    type: ELessonType.Selection,
    duration: 12,
    resource: [
      {
        question:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
        explanation:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu aliquam lacus. Fusce lobortis eu quam sed mollis. Donec at semper lorem. Suspendisse ligula nisi, efficitur a scelerisque vitae, pulvinar a massa. Etiam maximus quam odio, quis suscipit urna interdum non. Curabitur aliquet at odio in maximus',
        answerA: 'Answer A. Answer A. Answer A.',
        answerB: 'Answer B. Answer B. Answer B.',
        answerC: 'Answer C. Answer C. Answer C.',
        answerD: 'Answer D. Answer D. Answer D.',
        correctAnswer: ESelectionAnswerChoiceList.A,
      },
    ],
  });
  await lesson.save();

  course.set('lessonIds', [lesson._id]);
  await course.save();
};

export default migrations_1;
