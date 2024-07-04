import { Navbar } from "./_components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex border-collapse flex-col min-h-[100vh] bg-slate-400">
      <Navbar />
      <main className="flex-1 pt-[2rem] pb-1 mx-auto mt-5 h-[100vh] flex justify-center ">
        {children}
      </main>
    </div>
  );
}
