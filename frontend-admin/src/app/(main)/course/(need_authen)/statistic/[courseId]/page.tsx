'use client';
import EditIcon from '@mui/icons-material/Edit';
import { TabContext, TabList } from '@mui/lab';
import { Box, Button, Skeleton, Tab } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import TabPanel1 from './tabPanel1';
import TabPanel2 from './tabPanel2';

const CourseStatisticsDetail = () => {
  const [value, setValue] = React.useState('1');
  const router = useRouter();
  const { courseId } = useParams();

  const { data, isLoading } = useCourseDetail(courseId as string);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="lg:pr-10 lg:pl-10 lg:pb-10 lg:pt-5 p-3">
        <div>
          <h2 className=" text-2xl md:text-3xl font-bold mb-3">Statistic Detail Course</h2>
          {data && !isLoading ? (
            <>
              <h2 className=" text-1xl md:text-2xl font-bold mb-3">{data?.title}</h2>
              <div className="md:w-1/2 mb-3">
                <span className="text-gray-600">{data?.description}</span>
              </div>
              <Button
                onClick={() =>
                  router.push(
                    generatePathname({
                      pathName: routePath.COURSE_MANAGE_DETAIL,
                      query: {
                        courseId: courseId as string,
                      },
                    }),
                  )
                }
                variant="contained"
                startIcon={<EditIcon />}
              >
                Edit course
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={'100%'} height={100} />
              <Skeleton variant="rounded" width={100} height={40} />
            </div>
          )}
        </div>
        <Box sx={{ width: '100%', typography: 'body1', marginTop: 4 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Lesson list" value="1" />
                <Tab label="Learner list" value="2" />
              </TabList>
            </Box>
            <TabPanel1 courseId={courseId as string} />
            <TabPanel2 courseId={courseId as string} />
          </TabContext>
        </Box>
      </div>
    </>
  );
};
export default CourseStatisticsDetail;
