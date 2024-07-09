'use client';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { userContext } from '~/context/UserContext';
import useDeleteComment from '~/hooks/comment/useDeleteComment';
import useUpdateLikeDislike from '~/hooks/comment/useUpdateLikeDislike';
import { EUpdateLikeAndDislikeAction } from '~/types/api/commentTypes';
import LoadingButtonProvider from '../loading_button';
import { ICommentComponentProps } from './comment_component';

const CommentInteraction = ({
  isCurrentUserDislike,
  isCurrentUserLike,
  numberOfDislikes: _numberOfDislikes,
  numberOfLikes: _numberOfLikes,
  numberOfReplies,
  _id: commentId,
}: Pick<
  ICommentComponentProps,
  'isCurrentUserDislike' | 'numberOfDislikes' | 'isCurrentUserLike' | 'numberOfLikes' | 'numberOfReplies' | '_id'
>) => {
  const [isLike, setIsLike] = useState<boolean>(isCurrentUserLike);
  const [isDislike, setIsDislike] = useState<boolean>(isCurrentUserDislike);
  const [numberOfLikes, setNumberOfLikes] = useState(_numberOfLikes);
  const [numberOfDislikes, setNumberOfDislikes] = useState(_numberOfDislikes);

  const { isLogin } = useContext(userContext);

  const { mutate, isPending } = useUpdateLikeDislike(commentId, {
    onSuccess(data, variables, context) {
      if (variables.action === EUpdateLikeAndDislikeAction.Dislike) {
        if (isLike) {
          setIsLike(false);
          setIsDislike(true);
          setNumberOfDislikes((prev) => prev + 1);
          setNumberOfLikes((prev) => prev - 1);
        } else {
          setIsDislike((prev) => !prev);
          setNumberOfDislikes((prev) => (isDislike ? prev - 1 : prev + 1));
        }
      } else {
        if (isDislike) {
          setIsDislike(false);
          setIsLike(true);
          setNumberOfDislikes((prev) => prev - 1);
          setNumberOfLikes((prev) => prev + 1);
        } else {
          setIsLike((prev) => !prev);
          setNumberOfLikes((prev) => (isLike ? prev - 1 : prev + 1));
        }
      }
    },
  });

  useEffect(() => {
    setIsLike(isCurrentUserLike);
    setIsDislike(isCurrentUserDislike);
  }, [isCurrentUserDislike, isCurrentUserLike]);

  const handleLike = () => {
    mutate({ action: EUpdateLikeAndDislikeAction.Like });
  };

  const handleDislile = () => {
    mutate({ action: EUpdateLikeAndDislikeAction.Dislike });
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-1">
        <LoadingButtonProvider isLoading={isPending} className="rounded-full">
          <IconButton disabled={!isLogin} onClick={handleLike}>
            {isLike ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
          </IconButton>
        </LoadingButtonProvider>
        <span>{numberOfLikes}</span>
      </div>
      <div className="flex items-center gap-1">
        <LoadingButtonProvider isLoading={isPending} className="rounded-full">
          <IconButton disabled={!isLogin} onClick={handleDislile}>
            {isDislike ? <ThumbDownAlt /> : <ThumbDownAltOutlined />}
          </IconButton>
        </LoadingButtonProvider>
        <span>{numberOfDislikes}</span>
      </div>
    </div>
  );
};

export default CommentInteraction;

export const CommentMenu = ({
  userId,
  setIsDeleted,
  commentId,
}: Pick<ICommentComponentProps, 'userId'> & {
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
  commentId: string;
}) => {
  const { data } = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { lessonId, courseId } = useParams();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate } = useDeleteComment({
    onSuccess() {
      setIsDeleted(true);
    },
  });

  return (
    <>
      {userId === data?._id && (
        <div className=" basis-5">
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            if (lessonId) {
              mutate({ commentId, lessonId: lessonId as string });
              handleClose();
              return;
            }

            if (courseId) {
              mutate({ commentId, courseId: courseId as string });
              handleClose();
              return;
            }
          }}
        >
          <DeleteOutlinedIcon /> Xoá bình luận
        </MenuItem>
      </Menu>
    </>
  );
};
