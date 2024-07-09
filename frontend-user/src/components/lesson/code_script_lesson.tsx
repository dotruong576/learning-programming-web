'use client';

import { Editor } from '@monaco-editor/react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Slide, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { ELessonType } from '~/constant/enum/lessonEnum';
import useGetUserLessons from '~/hooks/userLessons/useGetUserLessons';
import { useSubmitCodescriptLessonResult } from '~/hooks/userLessons/useSubmitUserLessons';
import { TCodescriptLessonResourse } from '~/types/api/lessonTypes';
import { TUserCodescriptLessonCheckpoint } from '~/types/api/userLessonTypes';

const CodeScriptLesson = ({ resource }: { resource: TCodescriptLessonResourse[] }) => {
  const editorRef = useRef<any>(null);

  const { courseId, lessonId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: previousResult, refetch } = useGetUserLessons(
    courseId as string,
    lessonId as string,
    ELessonType.CodeScript,
  );

  const checkpoint = previousResult?.checkpoint as TUserCodescriptLessonCheckpoint;

  const { mutate } = useSubmitCodescriptLessonResult({
    onSuccess() {
      refetch();
    },
  });

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const handleExecute = () => {
    mutate({
      code: encodeURIComponent(editorRef.current?.getValue()).toString(),
    });
  };
  const [openTestcase, setOpenTestcase] = useState(false);

  return (
    <div ref={containerRef} className="p-3 flex flex-col items-end bg-[#C9C9C9] relative">
      <Editor
        value={decodeURIComponent(checkpoint?.code || '')}
        height="60vh"
        defaultLanguage="javascript"
        defaultValue={`//input name as variable input\nfunction foo()\n{\n\ninput = input + "a"\n\n} \n\nfoo();`}
        onMount={handleEditorDidMount}
      />

      <div className="flex gap-4">
        <Button
          startIcon={<QuizOutlinedIcon />}
          variant="outlined"
          onClick={() => setOpenTestcase(true)}
          className="monaco-editor !mt-3 relative !bg-[var(--vscode-editorGutter-background)]"
        >
          Testcase
        </Button>

        <Button
          startIcon={<SlowMotionVideoIcon />}
          onClick={handleExecute}
          variant="outlined"
          className="monaco-editor !mt-3 relative !bg-[var(--vscode-editorGutter-background)]"
        >
          Thực thi
        </Button>
      </div>

      <Slide direction="up" in={openTestcase} container={containerRef.current}>
        <div className="absolute bottom-0 left-0 right-0 bg-textMain rounded-t-lg text-[#C9C9C9] max-h-[50%] overflow-y-auto">
          <div className="ml-auto w-fit">
            <IconButton onClick={() => setOpenTestcase(false)}>
              <CloseIcon className="text-[#C9C9C9]" />
            </IconButton>
          </div>
          {resource.map((item, index) => (
            <Accordion
              sx={{
                margin: `0px !important`,
              }}
              key={index}
            >
              <div className="flex items-center bg-[#2C1835]">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="text-[#C9C9C9]" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="flex-auto"
                >
                  <div className="flex items-center justify-between w-full">
                    <Typography className="text-[#C9C9C9]">Testcase {index + 1}</Typography>
                    {!!checkpoint && (
                      <div>
                        {checkpoint?.result?.[index] ? (
                          <CheckCircleOutlineIcon className="text-[#98CA08]" />
                        ) : (
                          <ErrorOutlineIcon className="text-[#D90404]" />
                        )}
                      </div>
                    )}
                  </div>
                </AccordionSummary>
              </div>
              <AccordionDetails className="bg-textMain">
                <div>
                  <p className="text-[#C9C9C9]">
                    Input: <span>{item.input}</span>
                  </p>
                  <p className="text-[#C9C9C9]">
                    Expected: <span>{item.expected}</span>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Slide>
    </div>
  );
};

export default CodeScriptLesson;
