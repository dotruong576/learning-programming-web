'use client';

import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import { Button, Drawer, IconButton } from '@mui/material';
import { memo, useState } from 'react';
import { TGetCourseNavigateResponse } from '~/types/api/courseTypes';
import LessonComponent from './lesson_component';

const LessonsListComponent = ({ lessons }: { lessons: TGetCourseNavigateResponse['lessons'] }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer((_) => !_);

  return (
    <>
      <Button
        onClick={toggleDrawer}
        startIcon={<ListIcon fontSize="small" />}
        variant="outlined"
        className="flex items-center text-base font-medium"
      >
        Danh sách bài học
      </Button>

      <Drawer
        PaperProps={{
          className: 'md:min-w-[430px]',
        }}
        anchor={'right'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <div className="p-3 relative h-fit w-full flex items-center justify-center">
          <IconButton className="!absolute top-1/2 transform -translate-y-1/2 left-3 " onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <h2 className="text-textMain text-2xl">Danh sách bài học</h2>
        </div>
        <div className="grid grid-rows-[repeat(auto-fit,minmax(auto,1fr))] gap-y-2 my-5 px-3">
          {lessons.map((item, index) => (
            <LessonComponent
              key={item._id}
              id={item._id}
              name={item.title}
              quantity={''}
              exerciseType={item.type}
              status={item.status}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default memo(LessonsListComponent);
