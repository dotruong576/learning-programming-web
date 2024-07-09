"use client";
import { getAllCourses } from "~/api/courses";
import { IAllCouresResponse } from "~/types/api/courseTypes";
import CourseCount from "~/components/totalCourse";
import UserCount from "~/components/totalUser";
import LanguagePie from "~/components/languageChart";

const HomePage: React.FC = async () => {
  let data: IAllCouresResponse[] = [];

  try {
    data = await getAllCourses();
  } catch (error) {
    data = [];
  }

  return (
    <div>
      <CourseCount />
      <UserCount />
      {/*<LanguagePie />*/}
    </div>
  );
};

export default HomePage;
