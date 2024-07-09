import Navbar from "~/components/navbar";
import SideMenu from "~/components/sideMenu";
export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col"}>
      <Navbar />
      <SideMenu />
      {children}
    </div>

    
  );
}
