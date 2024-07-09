'use client';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useLogout from '~/hooks/auth/useLogout';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import routePath from '~/constant/routePath';
import React, { useContext } from 'react';
import { userContext } from '~/context/UserContext';
import { Box, IconButton, Tooltip } from '@mui/material';


export default function AvatarMenu() {
  const { isLogin: auth, data } = useContext(userContext);
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  return (
    <div className={"mx-4"}>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={data ? data.avatar : '~/public/avatar.png'} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
                onClick={() => {
                  router.push(routePath.EDIT);
                  handleCloseUserMenu();
                }}
              >Profile</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Setting</MenuItem>
          <MenuItem onClick={handleLogout}>Sign out</MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
