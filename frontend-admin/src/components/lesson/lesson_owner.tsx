import { Checklist, Code, Menu, PlayCircle } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ELessonType } from '~/constant/enum/lessonEnum';
interface LessonOwnerProps {
  id: string;
  name: string;
  quantity: string;
  exerciseType: string;
  isChoose?: boolean;
}
const LessonOwner: React.FC<LessonOwnerProps> = ({ id, name, quantity, exerciseType, isChoose }) => {
  let exerciseIcon;

  switch (exerciseType) {
    case 'video':
      exerciseIcon = <PlayCircleOutlineIcon></PlayCircleOutlineIcon>;
      break;
    case 'selection_quiz':
      exerciseIcon = <Checklist></Checklist>;
      break;
    case 'code_quiz':
      exerciseIcon = <Code></Code>;
      break;
    default:
      exerciseIcon = <PlayCircle></PlayCircle>;
      break;
  }
  return (
    <div className="flex items-center">
      <Menu></Menu>
      <div
        className={isChoose ? ' bg-gray-200 rounded-2xl w-full ml-3 space-y-4' : 'rounded-2xl w-full ml-3 space-y-4'}
      >
        <div className="p-2">
          <div className="flex flex-row place-items-cent items-center">
            {exerciseIcon}
            <p className="px-2">{name}</p>
          </div>
          <div className="ml-auto mt-2 flex items-center">
            <span className="text-sm">{exerciseType === ELessonType.Video ? `${quantity}` : ` ${quantity} câu`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonOwner;
