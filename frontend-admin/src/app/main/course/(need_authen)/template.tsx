'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import routePath from '~/constant/routePath';
import useGetMe from '~/hooks/user/useGetMe';

const NeedAuthenTemplate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isError } = useGetMe({
    retry: 1,
  });

  useEffect(() => {
    if (!!isError) {
      router.push(routePath.FORBIDDEN);
    }
  }, [isError, router]);

  return <>{children}</>;
};

export default NeedAuthenTemplate;
