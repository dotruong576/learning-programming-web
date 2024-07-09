"use client";
import CourseCount from "~/components/totalCourse";
import UserCount from "~/components/totalUser";
import LanguagePie from "~/components/languageChart";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const HomePage: React.FC = async () => {

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      redirect('/login');
    }
  });

  return (
    <div className="flex flex-row">
      <div className={"flex w-full flex-col space-y-8"}>
        <div className={"flex flex-row"}>
          <CourseCount />
          <UserCount />
        </div>
        <LanguagePie />
      </div>
    </div>
  );
};
export default HomePage;
