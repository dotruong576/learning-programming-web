import { UserGroupIcon } from "@heroicons/react/16/solid";
export default function Thumbnail() {
  return (
    <div
      className={
        "space- flex w-1/5 flex-col space-y-4 rounded-lg bg-white p-4 shadow transition hover:shadow-2xl"
      }
    >
      <img
        src="https://preview.redd.it/jinhsi-is-peak-character-design-v0-4eege37vvg2d1.png?auto=webp&s=c4ef7f935c1c85beade9e6a4cb6d62812ddce7e0"
        alt="Course's Thumbnail"
        className={"m-4 h-36 w-36 self-center"}
      />
      <div className={"truncate text-center font-bold hover:cursor-pointer"}>
        Simple C++ Course
      </div>
      <div className={"flex space-x-4"}>
        <UserGroupIcon className={"h-6"} />
        <p className={""}>100000 learners</p>
      </div>
      <div className={"mb-4 flex"}>Rating</div>
    </div>
  );
}
