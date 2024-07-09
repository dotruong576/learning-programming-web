"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/main');
  });

  return <main></main>;
}
export default HomePage;