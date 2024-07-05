import Courses_Thumbnail from "~/components/courses";
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
      <h3 className="text-2xl font-bold">Danh sách khóa học</h3>
      <div className="flex flex-wrap">
        {data.map((item) => (
          <Courses_Thumbnail
            key={item._id}
            id={item._id}
            name={item.title}
            image={item.cover}
            views={item.totalJoined}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

