import LaunchIcon from '@mui/icons-material/Launch';
import { Avatar } from '@mui/material';
import React from 'react';
interface SttStudentProps {
  id: string;
  name: string;
  avatar: string;
  timejoin: string;
  onclick: (data: string) => void;
}

const SttStudent: React.FC<SttStudentProps> = ({ id, name, avatar, timejoin, onclick }) => {
  return (
    <div className="border border-gray-400 rounded-2xl mb-6">
      <div className="p-5">
        <div className="flex items-center">
          <Avatar alt={name} src={avatar} />
          <span className="ml-5">{name}</span>
        </div>
        <div className="border border-gray-300 mt-4"></div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Joining date</b>
          </span>
          <span>{timejoin}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Detail</b>
          </span>
          <button onClick={() => onclick}>
            <LaunchIcon fontSize="small"></LaunchIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SttStudent;
