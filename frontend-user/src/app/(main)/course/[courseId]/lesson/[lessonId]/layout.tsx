import React from 'react';
import PaginationComponent from '~/components/pagination_component';

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-20">{children}</div>
      <PaginationComponent />
    </>
  );
}
