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
import Image from "next/image";

export function PlayCard() {
  const router = useRouter();
  const gameModeData = [
    {
      icon: (
        <Image
          src="/lightning-bolt.png"
          className="inline-block mt-1 h-7 w-7"
          alt="online"
          width={50}
          height={50}
        />
      ),
      title: "Play Online",
      description: "Play with other person",
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
          <p className="text-white text-4xl">
            Play <span className="text-gray-800 font-extrabold pt-1">Chess</span> Online
          </p>
          <Image className="pl-1 w-3/4 mt-4" src="/chess-icon.png" alt="chess" width={150} height={150} />
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
