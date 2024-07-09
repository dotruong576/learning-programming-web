'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import routePath from '~/constant/routePath';

const ForbiddenButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(routePath.LOGIN);
  }, [router]);

  return (
    <>
      <Button className="!w-fit" variant="outlined">
        {'Liên hệ hỗ trợ'.normalize()}
      </Button>
      <Button onClick={() => router.push(routePath.LOGIN)} className="!w-fit" variant="contained">
        Đăng nhập tài khoản khác
      </Button>
    </>
  );
};

export default ForbiddenButton;
