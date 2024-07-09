import Navbar from "~/components/navbar";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col"}>
      <Navbar />
      {children}
    </div>
  );
}
