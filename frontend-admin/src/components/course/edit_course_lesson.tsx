'use client';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import EditLesson from '~/components/lesson/edit_lesson';
import { reorder } from '~/helper/dragAndDrop';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import { IGetCourseByIdResponse } from '~/types/api/courseTypes';
import StrictModeDroppable from '../droppable';
import LessonOwner from '../lesson/lesson_owner';

const EditCourseLesson = ({ courseId }: { courseId: string }) => {
  const { data, isSuccess, isFetching } = useCourseDetail(courseId);
  const [lessonList, setLessonList] = useState<IGetCourseByIdResponse['lessons']>([]);
  const [selectLessonId, setSelectLessonId] = useState<string>('');

  useEffect(() => {
    if (data && isSuccess) {
      setLessonList(data.lessons);
    }
  }, [data, isSuccess]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(lessonList, source.index, destination.index);
    setLessonList(newItems);
  };

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className=" text-1xl md:text-2xl font-bold mb-3">Curriculum</h2>
        <AddLessonButton />
      </div>
      <div className="md:flex justify-end mt-3">
        {!data || !isSuccess || isFetching ? (
          <Skeleton variant="rounded" height={550} width={330} className="!mr-4" />
        ) : lessonList.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="list">
              {(provided) => (
                <div
                  className="border-dashed border border-gray-100 md:w-1/4 w-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {lessonList.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided) => (
                        <div
                          onClick={() => setSelectLessonId(item._id)}
                          className="m-1 p-1 select-none"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <LessonOwner
                            id={item._id}
                            name={item.title}
                            quantity={item.duration.toString()}
                            exerciseType={item.type}
                            isChoose={item._id === selectLessonId}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        ) : (
          <div className="w-full h-full min-h-[250px] flex items-center justify-center">
            <p>no lessons</p>
          </div>
        )}

        <div className="border-2 border-gray-300 md:w-3/4 min-h-[450px] w-full rounded-2xl flex-shrink-0">
          {selectLessonId ? (
            <EditLesson lessonId={selectLessonId} />
          ) : (
            <div className="text-center h-full flex items-center justify-center">Choose a question</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditCourseLesson;

function AddLessonButton() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((_) => !_);

  return (
    <>
      <Button variant="contained" onClick={toggle} startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
        Add lesson
      </Button>

      <Dialog fullWidth maxWidth="md" open={open} onClose={toggle}>
        <EditLesson onSuccess={toggle} />
      </Dialog>
    </>
  );
}
