'use client';
import Review from '~/components/review';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';

export default function DetailedCourse() {
  return (
    <div>
      {/*left*/}
      <div className="flex h-fit w-full">
        {/*left side of page*/}
        <div className="w-1/3 px-16 pt-16">
          <div className={'w-full border-2 border-black bg-white p-4'}>
            <div className="mb-4 flex justify-center">
              <img
                src="https://preview.redd.it/jinhsi-is-peak-character-design-v0-4eege37vvg2d1.png?auto=webp&s=c4ef7f935c1c85beade9e6a4cb6d62812ddce7e0"
                alt="course's thumbnail"
                className="h-48 w-48"
              />
            </div>
            <div className="flex-col justify-center">
              <div className="flex justify-between">
                <div>100000 users</div>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              </div>
              <Button variant="contained"
                      sx={{
                        width: '100%',
                        marginY: '10px'
                      }}>Enroll now</Button>
              <div>Lectures:</div>
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
              <AccordionItem title="Starting course">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
              </AccordionItem>
              <AccordionItem title="Learning course">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
              </AccordionItem>
              <AccordionItem title="Ending course"><div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div></AccordionItem>
            </Accordion>
          </div>
          <Review />
          <Review />
        </div>

      </div>
      {/*right*/}
      <div>
        <p className={'m-8 text-2xl font-bold'}>Related courses</p>
      </div>
      <div className={'flex justify-around'}>
      </div>
    </div>
  );
}
