"use client";
import {Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, Menu as MuiMenu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import React, { useContext } from 'react';
import routePath from '~/constant/routePath';
import { userContext } from '~/context/UserContext';
import useLogout from '~/hooks/auth/useLogout';


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
    <nav className="flex h-10vh w-full items-center justify-between space-x-8 bg-white">
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

      <div className="w-1/6 sm:mr-10 mr-0.5 sm:w-1/3 justify-end">
        {auth ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Open profile">
              <IconButton onClick={handleClick} sx={{ p: 0, justifyContent: 'flex-end' }}>
                <Avatar alt="Remy Sharp" src={data ? data.avatar : '/images/avatar.jpeg'} />
              </IconButton>
            </Tooltip>
            <MuiMenu
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
                  router.push(routePath.EDIT);
                  handleClose();
                }}
              >
                <Avatar /> Tài khoản của tôi
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </MuiMenu>
          </Box>
        ) : (
          <div>
            <div className="hidden sm:block">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/login" className="font-medium hover:underline ">
                  <Button color="secondary" variant="outlined" sx={{ textTransform: 'none', marginRight: 3 }}>
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register" className="font-medium hover:underline ">
                  <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }}>
                    Đăng ký
                  </Button>
                </Link>
              </Box>
            </div>
            <div className="block md:hidden">
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <MuiMenu
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
                  <Link href="/register" className="font-medium hover:underline ">
                    <MenuItem onClick={handleClose}>Đăng ký</MenuItem>
                  </Link>
                  <Link href="/login" className="font-medium hover:underline ">
                    <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
                  </Link>
                </MuiMenu>
              </Box>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
