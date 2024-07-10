'use client';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { CardMedia, IconButton, Skeleton, TableCell } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { yellow } from '@mui/material/colors';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import AddCourseButton from '~/components/course/add_course_button';
import SttCourse from '~/components/statistics/stt_course';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import useCourseStatistic from '~/hooks/statistic/useCourseStatistic';

const CourseStatistics: React.FC = () => {
  const { data, isSuccess } = useCourseStatistic();

  const router = useRouter();

  const handleButtonClick = (data: string) => {
    router.push(
      generatePathname({
        pathName: routePath.COURSE_STATISTIC_COURSE_DETAIL,
        query: {
          courseId: data,
        },
      }),
    );
  };

  if (data && isSuccess) {
    return (
      <>
        <div className="lg:pr-10 lg:pl-10 lg:pb-10 lg:pt-5 p-3">
          <div className="sm:flex sm:justify-between pb-5">
            <h2 className="text-3xl font-bold mb-3">Statistic Courses</h2>
            <AddCourseButton />
          </div>
          <TableContainer component={Paper} className="hidden sm:block">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell>Courses</TableCell>
                  <TableCell align="center">Total lesson</TableCell>
                  <TableCell align="center">Created date</TableCell>
                  <TableCell align="center">Total learner</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <div className="flex items-center">
                        <CardMedia
                          sx={{ height: 70, width: 90, borderRadius: 1, display: 'flex' }}
                          image={row.cover || '/images/default_cover.png'}
                          title="green iguana"
                        ></CardMedia>
                        <span className="ml-5">{row.title}</span>
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.participantsId.length}</TableCell>
                    <TableCell align="center">{moment(row.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{row.lessonIds.length}</TableCell>
                    <TableCell align="center">
                      <div>
                        <span>{row.rating}/5</span>
                        <StarIcon sx={{ color: yellow[700], fontSize: 25, marginBottom: 0.5 }}></StarIcon>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleButtonClick(row._id)}>
                        <LaunchIcon fontSize="small"></LaunchIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <div className="block md:hidden grid-cols-1">
            {data.map((item, index) => (
              <div key={index}>
                <SttCourse
                  id={item._id}
                  name={item.title}
                  numberlesson={item.lessonIds.length}
                  time={item.createdAt}
                  numbermember={item.participantsId.length}
                  rating={item.rating}
                  image={item.cover || '/images/default_cover.png'}
                  onClick={() => handleButtonClick(item._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="lg:pr-10 lg:pl-10 lg:pb-10 lg:pt-5 p-3">
      <div className="sm:flex sm:justify-between pb-5">
        <h2 className="text-3xl font-bold mb-3">Statistic Courses</h2>
        <Skeleton height={60} width={'200px'} variant="rounded" />
      </div>
      {new Array(10).fill(0).map((_, index) => (
        <div key={index} className="mb-3">
          <Skeleton height={60} width={'100%'} variant="rounded" />
        </div>
      ))}
    </div>
  );
};
export default CourseStatistics;
