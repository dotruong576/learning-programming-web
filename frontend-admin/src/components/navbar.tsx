"use client";
import React, { useContext } from "react";
import { redirect, useRouter } from "next/navigation";
import { userContext } from "~/context/UserContext";
import AvatarMenu from "~/components/AvatarMenu";

export default function Navbar() {
  const router = useRouter();
  const { isLogin: auth, data } = useContext(userContext);

  return (
    <nav className="flex h-10vh w-full items-center justify-end space-x-8 bg-main-color">
      <div>
        {auth ? (
          <AvatarMenu />
        ) : (
          redirect('/403')
        )
        }
      </div>
    </nav>
  );
}
