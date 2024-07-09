"use client";
import React, { useContext } from "react";
import AvatarMenu from "~/components/AvatarMenu";

export default function Navbar() {

  return (
    <nav className="flex h-10vh w-full items-center justify-end space-x-8 bg-main-color">
      <div>
          <AvatarMenu />
      </div>
    </nav>
  );
}
