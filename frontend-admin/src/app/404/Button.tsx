'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotFoundButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  return (
    <>
      <Button onClick={() => router.replace('/')} className="!w-fit" variant="contained">
        Trở về trang chủ
      </Button>
    </>
  );
};

export default NotFoundButton;
