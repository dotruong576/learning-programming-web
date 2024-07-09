import Navbar from "~/components/navbar";
import SideMenu from "~/components/sideMenu";
export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      <SideMenu />
      <div className={"flex flex-col w-full"}>
      <Navbar />
      {children}
      </div>

    </div>

    
  );
}
