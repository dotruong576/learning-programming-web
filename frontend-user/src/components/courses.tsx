import Image from "next/image";

export default function Thumbnail() {
  return (
    <div
      className={
        "space- flex w-1/5 flex-col space-y-4 rounded-lg bg-white p-4 shadow transition hover:cursor-pointer hover:shadow-2xl"
      }
    >
    <Image src="/default_img.png" alt="Course's Thumbnail" width={400} height={300}></Image>
      <div className={"truncate text-center font-bold hover:cursor-pointer"}>
        Simple C++ Course
      </div>
      <div className={"flex space-x-4"}>
        <p className={""}>100000 learners</p>
      </div>
      <div className={"mb-4 flex"}>Rating</div>
    </div>
  );
}
