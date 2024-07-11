import { THEMES_DATA } from "@/constants/theme";
import Image from "next/image";
import { PlayCard } from "./_components/Card";
export default function Home() {
  const currentTheme = THEMES_DATA;
  return (
    <>
      <div className="max-w-full mt-0 ">
        <div className="flex flex-col md:flex-row w-full gap-x-10 px-6 sm:px-10">
          <Image
            className="rounded-md w-[65%] h-[500px] hidden md:block"
            src={`${currentTheme.boardimage}`}
            alt="chess-board"
            width={400}
            height={400}
          />
          <PlayCard />
        </div>
      </div>
    </>
  );
}
