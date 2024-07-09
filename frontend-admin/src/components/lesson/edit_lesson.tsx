'use client';

import { Divider, Skeleton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import EditLessonResource from '~/components/lesson/edit_lesson_resource';
import { ELessonType } from '~/constant/enum/lessonEnum';
import { useRefetchCourseDetail } from '~/hooks/course/useCourseDetail';
import useCreateLesson from '~/hooks/lesson/useCreateLesson';
import useLesson from '~/hooks/lesson/useLesson';
import useUpdateLesson from '~/hooks/lesson/useUpdateLesson';
import { TLessonResource } from '~/types/api/lessonTypes';

const EditLesson = ({ lessonId, onSuccess = () => {} }: { lessonId?: string; onSuccess?: () => void }) => {
  const { courseId } = useParams();
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

  const { refetch } = useRefetchCourseDetail(courseId as string);

  const [typeLesson, setTypeLesson] = useState<ELessonType>(ELessonType.Video);
  const handleChange = (event: SelectChangeEvent<ELessonType>) => {
    setTypeLesson(event.target.value as ELessonType);
  };

  const { data, isFetching, isSuccess } = useLesson(lessonId || '', {
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setLessonTitle(data.title);
      setTypeLesson(data.type);
      setLessonDescription(data.description);
    }
  }, [data, isSuccess]);

  const { mutate: mutateCreateLesson, isPending: isPendingCreate } = useCreateLesson({
    onSuccess(data, variables, context) {
      refetch();
      onSuccess();
    },
  });
  const { mutate: mutateUpdateLesson, isPending: isPendingUpdate } = useUpdateLesson(lessonId as string, {
    onSuccess(data, variables, context) {
      refetch();
      onSuccess();
    },
  });

  if ((data && isSuccess) || !lessonId || !isFetching) {
    return (
      <div className="flex-col flex space-y-4 p-7 w-full">
        <TextField
          label="Lesson title"
          name="title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          multiline
          required
        />
        <TextField
          label="lesson description"
          name="description"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          multiline
          required
        />
        <div className="md:w-1/3 w-2/3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" required>
              Type of lesson
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeLesson}
              label="Type of lesson"
              onChange={handleChange}
              required
            >
              <MenuItem value={ELessonType.Video}>Video</MenuItem>
              <MenuItem value={ELessonType.Selection}>Selection</MenuItem>
              <MenuItem value={ELessonType.CodeScript}>Code script</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Divider light />
        <EditLessonResource
          defaultData={data?.resource}
          isMutating={isPendingUpdate || isPendingCreate}
          prevInformation={!!lessonTitle && !!lessonDescription && !!typeLesson}
          type={typeLesson}
          handleSubmit={async (resource: TLessonResource) => {
            const payload = { resource, title: lessonTitle, type: typeLesson, description: lessonDescription };
            !lessonId ? mutateCreateLesson(payload) : mutateUpdateLesson(payload);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex-col flex space-y-4 p-7 w-full">
      <Skeleton variant="rounded" width="50%" height={26} />
      <Skeleton variant="rounded" width="100%" height={50} />
      <Skeleton variant="rounded" width="100%" height={200} />
    </div>
  );
};

export default memo(EditLesson);
