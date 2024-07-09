"use client";
import { getAllCourses } from "~/api/courses";
import { IAllCouresResponse } from "~/types/api/courseTypes";
import CourseCount from "~/components/totalCourse";
import UserCount from "~/components/totalUser";
import LanguagePie from "~/components/languageChart";
import Navbar from "~/components/navbar";

const HomePage: React.FC = async () => {
  let data: IAllCouresResponse[] = [];

  try {
    data = await getAllCourses();
  } catch (error) {
    data = [];
  }

  return (
    <div className={"flex w-full flex-col space-y-8"}>
      <div className={"flex flex-row"}>
        <CourseCount />
        <UserCount />
      </div>
      <LanguagePie />
    </div>
  );
};
export default HomePage;
