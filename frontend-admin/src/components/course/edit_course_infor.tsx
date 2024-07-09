/* eslint-disable @next/next/no-img-element */
'use client';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { useParams } from 'next/navigation';
import { forwardRef, useRef, useState } from 'react';
import { ECourseStatus } from '~/constant/enum/courseEnum';
import { labels } from '~/constant/labels';
import useChangeCourseStatus from '~/hooks/course/useChangeCourseStatus';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import useUpdateCourse from '~/hooks/course/useUpdateCourse';
import { useUploadImage } from '~/hooks/useUploadFile';
import { IGetCourseByIdResponse } from '~/types/api/courseTypes';
import LoadingButtonProvider from '../loading_button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCourseInformation = ({ courseId }: { courseId: string }) => {
  const { data, isSuccess, refetch, isFetching } = useCourseDetail(courseId);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((p) => !p);

  return (
    <>
      <ChangeCourseStatus isLoading={isFetching} refetch={refetch} data={data} />

      {(isSuccess && data) || !isFetching ? (
        <>
          <div className="flex justify-between flex-col-reverse md:flex-row">
            <div className="md:mr-10 md:mt-0 mt-3">
              <h2 className=" text-2xl md:text-3xl font-bold mb-3">{data?.title}</h2>
              <div className="mb-3">
                <span className="text-gray-600">{data?.description}</span>
              </div>
              <Button variant="contained" startIcon={<EditIcon />} sx={{ textTransform: 'none' }} onClick={toggle}>
                Edit course description
              </Button>
            </div>
            <div className="items-center">
              <CardMedia
                sx={{ height: 220, borderRadius: 1, display: 'flex', aspectRatio: 1.67 }}
                image={data?.cover || '/public/default_img.png'}
                title="green iguana"
              />
            </div>
          </div>
          <CustomDialog open={open} toggle={toggle} refetch={refetch} defaultData={data} />
        </>
      ) : (
        <>
          <div className="flex justify-between flex-col-reverse md:flex-row">
            <div className="md:mr-10 md:mt-0 mt-3 flex-1">
              <Skeleton variant="rounded" width={'60%'} height={26} className="mb-3" />
              <Skeleton variant="rounded" width={'100%'} height={160} />
            </div>

            <Skeleton variant="rounded" width={220 * 1.67} height={220} />
          </div>
        </>
      )}
    </>
  );
};

export default EditCourseInformation;

function ChangeCourseStatus({
  refetch,
  data,
  isLoading,
}: {
  refetch: () => void;
  data: IGetCourseByIdResponse | undefined;
  isLoading: boolean;
}) {
  const { mutate, isPending } = useChangeCourseStatus({
    onSuccess() {
      refetch();
    },
  });

  return (
    <LoadingButtonProvider className="w-fit ml-auto mb-4 rounded-[20px]" isLoading={isLoading || isPending}>
      <div className="flex justify-end">
        {!data ? (
          <Skeleton variant="rounded" height={46} width={150} />
        ) : (
          <Button
            onClick={() => mutate()}
            color="secondary"
            variant="outlined"
            sx={{ textTransform: 'none', borderRadius: 5 }}
          >
            {data.status === ECourseStatus.Hidden ? 'Publish' : 'Hidden'}
          </Button>
        )}
      </div>
    </LoadingButtonProvider>
  );
}

function CustomDialog({
  open,
  toggle,
  refetch,
  defaultData,
}: {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  defaultData: IGetCourseByIdResponse | undefined;
}) {
  const { courseId } = useParams();

  const { mutate, isPending } = useUpdateCourse(courseId as string, {
    onSuccess(data) {
      refetch();
    },
  });

  const { mutateAsync: uploadImage, isPending: isPendingUpload } = useUploadImage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imgUrl = useRef<string>(defaultData?.cover || '');

  const [nameCourse, setNameCourse] = useState(defaultData?.title || '');

  const [description, setDescription] = useState(defaultData?.description || '');
  const [label, setLabel] = useState<string[]>(defaultData?.label || []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      setSelectedImage(file);
      imgUrl.current = URL.createObjectURL(file);
    }
  };

  const handleSaveInformation = async () => {
    let imgSrc = imgUrl.current;

    if (selectedImage) {
      imgSrc = await uploadImage(selectedImage as Blob);
    }

    mutate({
      title: nameCourse,
      description,
      label,
      cover: imgSrc,
    });
  };

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof label>) => {
    const {
      target: { value },
    } = event;
    setLabel(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <Dialog open={open} onClose={toggle} fullWidth maxWidth="md" TransitionComponent={Transition}>
        <div className="flex items-center justify-between p-4">
          <Typography
            sx={{ ml: 2, flex: 1, justifyItems: 'center' }}
            variant="h6"
            component="div"
            className="hidden sm:block"
          >
            Edit course description
          </Typography>
          <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="flex-col flex space-y-4 p-7">
          <TextField
            label="Course title"
            name="title"
            value={nameCourse}
            onChange={(e) => setNameCourse(e.target.value)}
            multiline
            required
          />
          <TextField
            label="Course description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            required
          />

          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Choose courses labels</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={label}
              onChange={handleChange}
              input={<OutlinedInput label="Choose courses labels" />}
              MenuProps={MenuProps}
            >
              {labels.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, labels, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="relative rounded-2xl w-fit mx-auto">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <img
              src={imgUrl.current || '/public/default_img.png'}
              alt="Uploaded"
              className="h-[240px] aspect-[1.67]"
            />
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <IconButton className="!text-white" onClick={() => fileInputRef.current?.click()}>
                <AddAPhotoIcon color="inherit" />
              </IconButton>
            </div>
          </div>
          <div className="flex justify-end">
            <LoadingButtonProvider isLoading={isPending || isPendingUpload}>
              <Button variant="contained" autoFocus onClick={handleSaveInformation} className="">
                Save
              </Button>
            </LoadingButtonProvider>
          </div>
        </div>
      </Dialog>
    </>
  );
}
