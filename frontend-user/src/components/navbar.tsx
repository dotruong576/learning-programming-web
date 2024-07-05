"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useContext } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { userContext } from "~/context/UserContext";
import useLogout from "~/hooks/auth/useLogout";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const { isLogin: auth, data } = useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
    handleClose();
  };

  return (
    <nav className="flex h-10vh w-full items-center justify-between space-x-8 bg-main-color">
      <div className="flex items-center space-x-8">
        {/* logo */}
        <div
          onClick={() => {
            router.push("/main/mainpage");
          }}
          className="h-full select-none place-content-center pl-8 font-sans text-3xl font-bold text-black hover:cursor-pointer"
        >
          pro<span className="text-blue-600">c</span>ode
        </div>
        {/* category dropdown menu */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-fit justify-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700">
              Categories
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/main"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm transition-all",
                      )}
                    >
                      C++
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm transition-all",
                      )}
                    >
                      Python
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm transition-all",
                      )}
                    >
                      JavaScript
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm transition-all",
                      )}
                    >
                      Others
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* search box */}
        <div className="flex grow items-center space-x-4 rounded-md bg-white p-2.5">
          <MagnifyingGlassIcon className="h-5" />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      {/*user logo, sign up, log in*/}
      <div>
        {auth ? (
          <Menu as="div" className="mx-4">
            <div>
              <Menu.Button>
                <img src="" alt="" className={"h-10 w-10 bg-black"} />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-4 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/main"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm transition-all",
                        )}
                      >
                        My profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm transition-all",
                        )}
                      >
                        Setting
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm transition-all",
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className={"mx-4 flex justify-end space-x-8"}></div>
        )}
      </div>
    </nav>
  );
}
