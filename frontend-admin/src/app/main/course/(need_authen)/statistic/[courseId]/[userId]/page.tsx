'use client';
import { Skeleton, TableCell } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import SttDetailMember from '~/components/statistics/stt_detail_member';
import { ELessonType, EUserLessonStatus } from '~/constant/enum/lessonEnum';
import { parseDurationVideo } from '~/helper/parseDurationVideo';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import { useDetailMemberOfCourseStatistic } from '~/hooks/statistic/useDetailMemberOfCourseStatistic';

const CourseStatistics: React.FC = () => {
  const router = useRouter();
  const { courseId, userId } = useParams();

  const { data, isFetching } = useCourseDetail(courseId as string);

  const { data: statisticData, isFetching: isFetchingStatistic } = useDetailMemberOfCourseStatistic(
    courseId as string,
    userId as string,
  );

  return (
    <div className="lg:pr-10 lg:pl-10 lg:pb-10 lg:pt-5 p-3">
      <div>
        <h2 className=" text-2xl md:text-3xl font-bold mb-3">Thống kê chi tiết thành viên của khoá học</h2>
        {data && !isFetching ? (
          <>
            <h2 className=" text-xl md:text-2xl font-bold mb-3">{data?.title}</h2>
            <div className="md:w-1/2 mb-3">
              <span className="text-gray-600">{data?.description}</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <Skeleton variant="rounded" width={200} height={36} />
            <Skeleton variant="rounded" width={'100%'} height={100} />
          </div>
        )}
        <h2 className=" text-xl font-bold mb-3">Danh sách bài giảng</h2>
      </div>
      {!isFetchingStatistic && statisticData ? (
        <>
          <TableContainer component={Paper} className="hidden sm:block">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell width={500}>Bài giảng</TableCell>
                  <TableCell align="center">Thời lượng</TableCell>
                  <TableCell align="center">Ngày tạo</TableCell>
                  <TableCell align="center">Loại bài giảng</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Điểm số</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statisticData.map((row, index) => (
                  <TableRow key={row._id}>
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
                    <TableCell align="center">
                      {row.status === EUserLessonStatus.Done ? 'Hoàn thành' : 'Chưa hoàn thành'}
                    </TableCell>
                    <TableCell align="center">
                      {row.result ? `${row.result.completed}/${row.result.total}` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="block md:hidden grid-cols-1">
            {statisticData.map((item) => (
              <div key={item._id}>
                <SttDetailMember
                  {...item}
                  parseResult={item.result ? `${item.result.completed}/${item.result.total}` : '-'}
                  parseStatus={item.status === EUserLessonStatus.Done ? 'Hoàn thành' : 'Chưa hoàn thành'}
                  duration={
                    item.type === ELessonType.Video
                      ? `${parseDurationVideo(parseInt(item.duration))}`
                      : `${item.duration} câu`
                  }
                  createdAt={moment(item.createdAt).format('DD/MM/YYYY')}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Skeleton variant="rounded" width={'100%'} height={300} />
        </>
      )}
    </div>
  );
};
export default CourseStatistics;
