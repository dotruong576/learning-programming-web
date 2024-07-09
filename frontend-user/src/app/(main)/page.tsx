import Courses_Thumbnail from "~/components/courses";
import { getAllCourses } from '~/api/courses';
import { IAllCouresResponse } from '~/types/api/courseTypes';
import Image from "next/image";
import { kMaxLength } from "buffer";

const HomePage: React.FC = async () => {
  let data: IAllCouresResponse[] = [];

  try {
    data = await getAllCourses();
  } catch (error) {
    data = [];
  }

  return (
    <div className="p-[20px_10px] lg:p-10">
      <Image src="/banner.png" alt="Coding" width={kMaxLength} height={kMaxLength} />
      <h3 className="text-2xl font-bold mt-8">New Courses</h3>
      <div className="flex flex-wrap my-4">
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

      <h3 className="text-2xl font-bold mt-8">Popular Courses</h3>
      <div className="flex flex-wrap my-4">
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

