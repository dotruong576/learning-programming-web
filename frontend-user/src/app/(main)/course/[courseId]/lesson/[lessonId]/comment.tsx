'use client';

import { Skeleton } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentComponent from '~/components/comment/comment_component';
import PostCommentComponent from '~/components/comment/post_comment_component';
import deepClone from '~/helper/deepClone';
import { useGetCommentByLessonId } from '~/hooks/comment/useGetComment';
import { TCUCommentResponse } from '~/types/api/commentTypes';

const LessonCommentSection = () => {
  const { lessonId } = useParams();

  const { data, isSuccess, isFetching } = useGetCommentByLessonId(lessonId as string);
  lessonId;
  const [comments, setComments] = useState<TCUCommentResponse[]>([]);

  useEffect(() => {
    if (data) setComments(data);
  }, [data]);

  return (
    <div className="flex flex-col mx-32">
      <h2 className="text-2xl font-bold my-8">Đánh giá</h2>
      <PostCommentComponent
        uploadNewComment={(newComment: TCUCommentResponse) => {
          setComments((prev) => {
            const clone = deepClone(prev);
            clone.unshift(newComment);
            return clone;
          });
        }}
        lessonId={lessonId as string | undefined}
      />

      <div className="my-4 w-full">
        {isFetching || !data || !isSuccess
          ? new Array(20).fill(0).map((_, index) => (
              <div key={index} className="mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" width={250} height={24} />
                </div>
                <Skeleton variant="rounded" width={'100%'} height={100} />
              </div>
            ))
          : comments.map((item) => <CommentComponent key={item._id} {...item} />)}
      </div>
    </div>
  );
};

export default LessonCommentSection;
