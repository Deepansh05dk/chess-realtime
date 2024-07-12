import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex border-collapse flex-col min-h-[100vh] bg-slate-400 ">
      <Navbar />
      <main className="flex-1 pt-[2rem] pb-1 mt-5 flex justify-center overflow-x-scroll no-scrollbar">
        {children}
      </main>
      <Footer />
    </div>
  );
}
