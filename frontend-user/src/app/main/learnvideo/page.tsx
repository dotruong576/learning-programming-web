'use client';
import SideMenu from '~/components/sidemenu';

export default function LearnVideo() {
  return <div className={'h-full'}><SideMenu />
    <video width="320" height="240" controls>
      <source src="../../../../../../../Videos/test.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>;
}
