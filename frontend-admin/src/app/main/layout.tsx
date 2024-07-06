import Navbar from "~/components/navbar";
export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar/>
      {children}
    </section>
  );
}
