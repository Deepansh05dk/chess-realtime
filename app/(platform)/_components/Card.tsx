"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GameModeComponent from "./GameModeComponent";
import { useRouter } from "next/navigation";

export function PlayCard() {
  const router = useRouter();
  const gameModeData = [
    {
      icon: (
        <img
          src="/lightning-bolt.png"
          className="inline-block mt-1 h-7 w-7"
          alt="online"
        />
      ),
      title: "Play Online",
      description: "Play vs a Person of Similar Skill",
      onClick: () => {
        router.push("/game/random");
      },
      disabled: false,
    },
  ];

  return (
    <Card className="bg-transparent border-none">
      <CardHeader className="pb-3 text-center">
        <CardTitle className="font-semibold tracking-wide flex flex-col items-center justify-center">
          <p className="text-white">
            Play <span className="text-[#602C1A] font-bold pt-1">Chess</span>
          </p>
          <img className="pl-1 w-3/4 mt-4" src="/chess-icon.jpg" alt="chess" />
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="grid gap-2 cursor-pointer mt-1">
        {gameModeData.map((data) => {
          return <GameModeComponent key={data.title} {...data} />;
        })}
      </CardContent>
    </Card>
  );
}
