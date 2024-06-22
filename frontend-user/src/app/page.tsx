import { redirect } from "next/navigation";
export default function Home() {
  redirect('/main/mainpage');
  return null;
}
