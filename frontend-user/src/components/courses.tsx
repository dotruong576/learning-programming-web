"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import routePath from "~/constant/routePath";
import { People } from '@mui/icons-material';
import { generatePathname } from '~/helper/generatePathname';
import { Card, CardContent ,CardMedia, Typography, CardActionArea, MenuItem, ListItemIcon, Rating } from '@mui/material';

interface CourseComponentProps {
  id: string;
  image: string;
  name: string;
  views: number;
  rating: number;
}


const Courses_Thumbnail: React.FC<CourseComponentProps> = ({ id, image, name, rating, views }) => {
  const router = useRouter();
  const onClickCourse = () => {
    router.push(
      generatePathname({
        pathName: routePath.COURSE_DETAIL,
        query: {
          courseId: id,
        },
      }),
    );
  };
  
  return (
    <div className="relative rounded-2xl p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 overflow-hidden"  onClick={onClickCourse}>
      <Card className="h-full relative">
          <CardMedia
            component="img"
            image={image || "/default_img.png"} 
            alt="course item"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <div className="flex flex-start">
            <MenuItem>
              <ListItemIcon>
                <People fontSize="small" />
                <span className="text-sm ml-1"> {views} views</span>
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
              <Rating name="read-only" value={rating} readOnly precision={0.25} /> {rating}
              </ListItemIcon>
            </MenuItem>
            </div>
          </CardContent>
      </Card>
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <button className="bg-white text-black px-4 py-2 rounded-2xl transition-colors">View course</button>
      </div>
    </div> 
  );
}

export default Courses_Thumbnail;
