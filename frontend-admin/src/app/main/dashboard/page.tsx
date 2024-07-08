import { getAllCourses } from '~/api/courses';
import { IAllCouresResponse } from '~/types/api/courseTypes';

const HomePage: React.FC = async () => {
  let data: IAllCouresResponse[] = [];

  try {
    data = await getAllCourses();
  } catch (error) {
    data = [];
  }

  return (
    <div className="p-[20px_10px] lg:p-10">
    </div>
  );
};

export default HomePage;
