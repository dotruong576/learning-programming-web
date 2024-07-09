import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import moment from 'moment';
import React, { useState } from 'react';
import CommentInteraction, { CommentMenu } from './comment_interaction';

export interface ICommentComponentProps {
  numberOfLikes: number;
  numberOfDislikes: number;
  numberOfReplies: number;
  isCurrentUserLike: boolean;
  isCurrentUserDislike: boolean;
  content: string;
  userId: string;
  isReply: boolean;
  fullName: string;
  rating?: number;
  avatar: string;
  createdAt: string;
  _id: string;
}

const CommentComponent: React.FC<ICommentComponentProps> = ({
  avatar,
  fullName,
  userId,
  rating,
  content,
  createdAt,
  isReply,
  ...rest
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div className="flex items-start space-x-4 mb-10 relative">
      {isDeleted && (
        <div
          onClick={(e) => {
            if (isDeleted) {
              e.stopPropagation();
            }
          }}
          className="bg-gray-500/50 absolute top-0 left-0 right-0 bottom-0 z-[100] rounded-md"
        ></div>
      )}
      {/* Avatar, Đánh giá, Ngày bình luận */}
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-3 justify-between w-full">
          <div className="flex items-center space-x-4 flex-1">
            <Avatar src={avatar} alt={fullName} />
            <span className="font-bold">{fullName}</span>
            {!!rating && <Rating name="comment-rating" value={rating} precision={0.5} readOnly />}
            <span className="text-gray-500">{moment(createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <CommentMenu userId={userId} setIsDeleted={setIsDeleted} commentId={rest._id} />
        </div>
        <p className="my-3 ">{content}</p>
        <CommentInteraction {...rest} />
      </div>
    </div>
  );
};

export default CommentComponent;
