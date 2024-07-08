"use client";
import LearnerReview from '~/components/learnerReview';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function DetailedCourse() {
  return (
    <div>
      {/*left*/}
      <div className="flex h-fit w-full">
        {/*left side of page*/}
        <div className="w-1/3 px-16 pt-16">
          <div className={"w-fit border-2 border-black bg-white p-4"}>
            <div className="mb-4 flex justify-center">
              <img
                src="https://preview.redd.it/jinhsi-is-peak-character-design-v0-4eege37vvg2d1.png?auto=webp&s=c4ef7f935c1c85beade9e6a4cb6d62812ddce7e0"
                alt="course's thumbnail"
                className="h-48 w-48"
              />
            </div>
            <div className="px-24">
              <div className="flex-col">
                <div className="block">100000 users</div>
                <div className="block">4.6 sao</div>
              </div>
              <button>Enroll Now</button>
              <div>Lecture:</div>
              <div>Duration:</div>
              <div>Language:</div>
              <div>Level:</div>
            </div>
          </div>
        </div>

        {/*right side of page*/}
        <div className="flex w-2/3 flex-col p-16 space-y-2">
          <div className="text-4xl font-bold">Course Title</div>
          <div className="">
            Course descriptionCourse descriptionCourse descriptionCourse
            descriptionCourse descriptionCourse descriptionCourse
            descriptionCourse descriptionCourse descriptionCourse
            descriptionCourse description
          </div>
          <div className="">
            <div className="text-2xl font-bold">Curriculum</div>
            <Accordion>
              <AccordionItem title="Starting course">content 1</AccordionItem>
              <AccordionItem title="Learning course">content 2</AccordionItem>
              <AccordionItem title="Ending course">content 3</AccordionItem>
            </Accordion>
          </div>
          <LearnerReview />
          <LearnerReview />
        </div>

      </div>
      {/*right*/}
      <div>
        <p className={"m-8 text-2xl font-bold"}>Related courses</p>
      </div>
      <div className={"flex justify-around"}>
      </div>
    </div>
  );
}
