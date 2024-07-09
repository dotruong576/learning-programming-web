import Navbar from "~/components/navbar";
export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar/>
      <div className="pt-10vh">{children}</div>
    </section>
  );
}
