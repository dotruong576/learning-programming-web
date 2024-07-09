'use client';

import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Button from '@mui/material/Button';
import { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { defaultSelectionQuestionResource } from '~/constant/data/lesson';
import { ELessonType } from '~/constant/enum/lessonEnum';
import deepClone from '~/helper/deepClone';
import { downloadFunc } from '~/helper/downloadFile';
import { generateUUIDUsingMathRandom } from '~/helper/generateUUID';
import getVideoDuration from '~/helper/getVideoDuration';
import { useUploadVideo } from '~/hooks/useUploadFile';
import {
  TCodescriptLessonResourse,
  TLessonResource,
  TSelectionLessonResourse,
  TVideoLessonResourse,
} from '~/types/api/lessonTypes';
import LoadingButtonProvider from '../loading_button';
import SelectionQuestion from './selection_question_edit';

interface IEditLessonResource {
  type: ELessonType;
  handleSubmit: (_resource: TLessonResource) => Promise<any>;
  prevInformation: boolean;
  isMutating: boolean;
  defaultData: TLessonResource | undefined;
}

function EditLessonResource({ type, ...res }: IEditLessonResource) {
  switch (type) {
    case ELessonType.Video:
      return <EditVideoLesson {...res} />;
    case ELessonType.CodeScript:
      return <EditCodeScriptLesson {...res} />;
    case ELessonType.Selection:
      return <EditSelectionLesson {...res} />;
    default:
      return <></>;
  }
}

export default memo(EditLessonResource);

function EditVideoLesson({
  handleSubmit,
  prevInformation,
  isMutating,
  defaultData,
}: Omit<IEditLessonResource, 'type'>) {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const { mutateAsync, isPending } = useUploadVideo();
  const videoSrcRef = useRef<string>((defaultData as TVideoLessonResourse)?.file || '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (selectedVideo) {
      URL.revokeObjectURL(videoSrcRef.current);
    }

    if (files) {
      const file = files[0];
      setSelectedVideo(file);
      videoSrcRef.current = URL.createObjectURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (videoSrcRef.current && videoSrcRef.current !== ((defaultData as TVideoLessonResourse)?.file || '')) {
        URL.revokeObjectURL(videoSrcRef.current);
      }
    };
  }, [defaultData]);

  const onSave = async () => {
    if (selectedVideo) {
      const videSrc = await mutateAsync(selectedVideo as Blob);
      const duration = await getVideoDuration(selectedVideo);
      handleSubmit({ file: videSrc, duration: duration.toString() } as TVideoLessonResourse);
    }
  };

  return (
    <div className="space-y-5 text-sm text-gray-500">
      <input
        type="file"
        accept="video/mp4"
        onChange={handleVideoUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button
        variant="outlined"
        startIcon={<FileUploadOutlinedIcon />}
        size="small"
        sx={{ textTransform: 'none' }}
        onClick={() => fileInputRef.current?.click()}
      >
        upload lesson video
      </Button>
      {selectedVideo ? (
        <div>
          <span>{selectedVideo.name}</span>
        </div>
      ) : (
        <div></div>
      )}
      <LoadingButtonProvider className="w-fit" isLoading={isPending || isMutating}>
        <Button disabled={!prevInformation || !selectedVideo} variant="contained" size="small" onClick={onSave}>
          Save
        </Button>
      </LoadingButtonProvider>

      {videoSrcRef && <video controls src={videoSrcRef.current} className="aspect-video mx-auto" />}
    </div>
  );
}

function EditCodeScriptLesson({ handleSubmit, prevInformation, isMutating }: Omit<IEditLessonResource, 'type'>) {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const onSave = async () => {
    if (selectedFile) {
      try {
        setIsLoading(true);
        const text = await selectedFile.text();
        const data = JSON.parse(text);

        handleSubmit(data as TCodescriptLessonResourse[]);
      } catch (err) {
        toast('File is not in the correct format', {
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex-col flex space-y-3 text-sm text-gray-500">
      <input
        type="file"
        accept="application/JSON"
        onChange={handleTextUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      <span>Upload the json file to create a list of test cases for the code script lecture.</span>
      <span>The json file must have the same content as the sample file below.</span>
      <div className="flex-col space-y-3">
        <Button
          startIcon={<SaveAltOutlinedIcon />}
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => downloadFunc('/files/sample_testcase.json')}
        >
          download sample test case
        </Button>
        <br></br>
        <Button
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload sample test case
        </Button>
      </div>
      <span>file name</span>
      <div>
        <LoadingButtonProvider className="w-fit" isLoading={isMutating || isLoading}>
          <Button disabled={!prevInformation || !selectedFile} variant="contained" size="small" onClick={onSave}>
            Save
          </Button>
        </LoadingButtonProvider>
      </div>
    </div>
  );
}

function EditSelectionLesson({
  handleSubmit,
  prevInformation,
  isMutating,
  defaultData,
}: Omit<IEditLessonResource, 'type'>) {
  const [resource, setResource] = useState<Array<TSelectionLessonResourse & { id: string }>>([]);

  useEffect(() => {
    if (defaultData && Array.isArray(defaultData)) {
      setResource(
        (defaultData as TSelectionLessonResourse[]).map((item) => ({ ...item, id: generateUUIDUsingMathRandom() })),
      );
    }
  }, [defaultData]);

  const onSave = () => {
    handleSubmit(resource);
  };

  const isApproveTosubmit = resource.every(
    (question) =>
      !!question.answerA &&
      !!question.answerB &&
      !!question.answerC &&
      !!question.answerD &&
      !!question.correctAnswer &&
      !!question.question,
  );

  return (
    <div>
      <div className="mb-5">
        <LoadingButtonProvider className="w-fit" isLoading={isMutating}>
          <Button
            disabled={!prevInformation || resource.length === 0 || !isApproveTosubmit}
            variant="contained"
            size="small"
            onClick={onSave}
          >
            Save
          </Button>
        </LoadingButtonProvider>
      </div>
      <div className="space-y-4">
        {resource.map((item, index) => (
          <SelectionQuestion
            key={item.id}
            clickDelete={() => setResource((prev) => deepClone(prev).splice(index, 1))}
            handleUpdateResouce={(data) => {
              setResource((prev) => {
                const clone = deepClone(prev);
                clone.splice(index, 1, { ...data, id: item.id });
                return clone;
              });
            }}
            {...item}
            id={index + 1}
          />
        ))}

        <div className="justify-center w-full flex">
          <Button
            onClick={() =>
              setResource((prev) => {
                const clone = deepClone(prev);
                clone.push({ ...defaultSelectionQuestionResource, id: generateUUIDUsingMathRandom() });
                return clone;
              })
            }
            color="inherit"
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Add question
          </Button>
        </div>
      </div>
    </div>
  );
}
