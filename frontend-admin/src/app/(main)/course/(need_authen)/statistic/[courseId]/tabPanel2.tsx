'use client';
import LaunchIcon from '@mui/icons-material/Launch';
import { TabPanel } from '@mui/lab';
import {
  Avatar,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import SttStudent from '~/components/statistics/stt_student';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import { useCourseDetailMembersStatistic } from '~/hooks/statistic/useCourseDetailStatistic';

const TabPanel2 = ({ courseId }: { courseId: string }) => {
  const { data, isLoading } = useCourseDetailMembersStatistic(courseId);
  const router = useRouter();

  const handleButtonClick = (userId: string) => {
    router.push(
      generatePathname({
        pathName: routePath.COURSE_STATISTIC_COURSE_DETAIL_MEMBER,
        query: {
          courseId,
          userId,
        },
      }),
    );
  };

  if (data && !isLoading) {
    return (
      <TabPanel
        value="2"
        sx={{
          padding: '24px 0px 0px',
        }}
      >
        <div className="hidden sm:block">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell>Learner</TableCell>
                  <TableCell align="center">Joining date</TableCell>
                  <TableCell align="center">Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <div className="flex items-center">
                        <Avatar alt={row.fullName} src={row.avatar} />
                        <span className="ml-5">{row.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell align="center">{moment(row.participatedDate).format('DD/MM/YYYY')}</TableCell>
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
        </div>
        <div className="block md:hidden grid-cols-1">
          {data.map((item, index) => (
            <div key={index}>
              <SttStudent
                id={item._id}
                name={item.fullName}
                avatar={item.avatar}
                timejoin={moment(item.participatedDate).format('DD/MM/YYYY')}
                onclick={() => handleButtonClick(item._id)}
              ></SttStudent>
            </div>
          ))}
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

export default TabPanel2;
