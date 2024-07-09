'use client';
import { TabPanel } from '@mui/lab';
import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import SttLesson from '~/components/statistics/stt_lesson';
import { ELessonType } from '~/constant/enum/lessonEnum';
import { parseDurationVideo } from '~/helper/parseDurationVideo';
import { useCourseDetailLessonsStatistic } from '~/hooks/statistic/useCourseDetailStatistic';

const TabPanel1 = ({ courseId }: { courseId: string }) => {
  const { data, isLoading } = useCourseDetailLessonsStatistic(courseId);

  if (data && !isLoading) {
    return (
      <TabPanel
        value="1"
        sx={{
          padding: '24px 0px 0px',
        }}
      >
        <div>
          <div className="hidden sm:block">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No.</TableCell>
                    <TableCell>Lesson</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Created date</TableCell>
                    <TableCell align="center">Type of lesson</TableCell>
                    <TableCell align="center">Completed turns</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="center">
                        {row.type === ELessonType.Video
                          ? `${parseDurationVideo(parseInt(row.duration))}`
                          : `${row.duration} câu`}
                      </TableCell>
                      <TableCell align="center">{moment(row.createdAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.completedTimes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="block md:hidden grid-cols-1">
            {data.map((item, index) => (
              <div key={index}>
                <SttLesson
                  id={item._id}
                  name={item.title}
                  timelesson={
                    item.type === ELessonType.Video
                      ? `${parseDurationVideo(parseInt(item.duration))}`
                      : `${item.duration} câu`
                  }
                  timecreate={moment(item.createdAt).format('DD/MM/YYYY')}
                  typelesson={item.type}
                  done={item.completedTimes}
                ></SttLesson>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    );
  }

  return (
    <div>
      <Skeleton variant="rounded" width={'100%'} height={400} />
    </div>
  );
};

export default TabPanel1;
