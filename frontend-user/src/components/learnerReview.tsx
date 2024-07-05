import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function LearnerReview() {
  return (
    <Card className="w-1/2 rounded-lg bg-gray-100 p-6 shadow-2xl shadow-black">
      <CardHeader className="flex gap-3">
        <div className="flex">
          <p className="text-3xl font-bold">username</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="my-6">
          Course Title This is my review about this course. This is my review
          about this course. This is my review about this course. This is my
          review about this course
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="mt-6 flex space-x-2">
        <p>1000</p>
        <ThumbUpIcon />
        <p>2000</p>
        <ThumbDownIcon />
      </CardFooter>
    </Card>
  );
}
