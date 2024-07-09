import SideMenu from "~/components/sideMenu";
export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      <SideMenu />
      {children}
    </div>
  );
}
