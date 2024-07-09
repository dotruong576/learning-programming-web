'use client';
import { Avatar, Button, Rating, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { userContext } from '~/context/UserContext';
import useCreateComment from '~/hooks/comment/useCreateComment';
import { TCUCommentResponse } from '~/types/api/commentTypes';
import LoadingButtonProvider from '../loading_button';

interface IPostCommentComponent {
  canRating?: boolean;
  uploadNewComment: (_: TCUCommentResponse) => void;
  courseId?: string;
  lessonId?: string;
}

const PostCommentComponent = ({ canRating = false, uploadNewComment, courseId, lessonId }: IPostCommentComponent) => {
  const { isLogin, data } = useContext(userContext);

  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const { mutate, isPending } = useCreateComment({
    onSuccess(data, variables, context) {
      uploadNewComment(data);
    },
  });

  return (
    <div className="flex mb-6 w-full items-start">
      <Avatar src={data ? data.avatar : '/images/avatar.jpeg'} alt="User Avatar" className="mr-3" />
      <div className="w-full">
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
          disabled={!isLogin}
          variant="outlined"
          placeholder={!isLogin ? 'Vui lòng đăng nhập để bình luận.' : 'Nhập bình luận...'}
        />
        <div className="flex items-center justify-between mt-3">
          {canRating && (
            <Rating
              name="comment-rating"
              onChange={(_, newValue) => {
                setRating(newValue ?? 0);
              }}
              defaultValue={0}
              value={rating}
              precision={0.5}
              readOnly={!isLogin}
            />
          )}

          <LoadingButtonProvider isLoading={isPending}>
            <Button
              onClick={() =>
                mutate({
                  content,
                  rating,
                  courseId,
                  lessonId,
                })
              }
              variant="contained"
              disabled={!content || (canRating && !rating)}
            >
              Post
            </Button>
          </LoadingButtonProvider>
        </div>
      </div>
    </div>
  );
};

export default PostCommentComponent;
