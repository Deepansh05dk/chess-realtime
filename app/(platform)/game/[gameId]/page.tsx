"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChessBoard, isPromoting } from "./_components/ChessBoard";
import { useSocket } from "@/hooks/useSocket";
import { Chess, Move } from "chess.js";
import { useRouter, useParams } from "next/navigation";
import MovesTable from "./_components/MovesTable";
import { useSession } from "next-auth/react";
import { UserAvatar } from "./_components/UserAvatar";
import { useToast } from "@/components/ui/use-toast";

// TODO: Move together, there's code repetition here
import {
  INIT_GAME,
  MOVE,
  GAME_ADDED,
  GAME_ENDED,
  GAME_JOINED,
  GAME_OVER,
  GAME_TIME,
  EXIT_GAME,
  JOIN_ROOM,
  USER_TIMEOUT,
  GAME_NOT_FOUND,
} from "@/constants/game";

import { Result, GameResult } from "@/types/game";

const GAME_TIME_MS = 10 * 60 * 1000;

import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  movesAtom,
  userSelectedMoveIndexAtom,
} from "@/context/recoilContextProvider";
import GameEndModal from "./_components/GameEndModal";
import { Wait } from "./_components/wait";
import { ShareGame } from "./_components/ShareGame";
import ExitGameModel from "./_components/ExitGameModel";

const moveAudio =
  typeof Audio !== "undefined" ? new Audio("/move.wav") : undefined;

interface Metadata {
  blackPlayer: { id: string; name: string };
  whitePlayer: { id: string; name: string };
}

const Game = () => {
  const socket = useSocket();
  const { gameId } = useParams();
  const session = useSession();
  const user = session.data?.user;
  const route = useRouter();
  const { toast } = useToast();
  console.log(session)
  const [chess, _setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [added, setAdded] = useState(false);
  const [started, setStarted] = useState(false);
  const [gameMetadata, setGameMetadata] = useState<Metadata | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [player1TimeConsumed, setPlayer1TimeConsumed] = useState(0);
  const [player2TimeConsumed, setPlayer2TimeConsumed] = useState(0);
  const [gameID, setGameID] = useState("");
  const setMoves = useSetRecoilState(movesAtom);
  const userSelectedMoveIndex = useRecoilValue(userSelectedMoveIndexAtom);
  const userSelectedMoveIndexRef = useRef(userSelectedMoveIndex);

  useEffect(() => {
    userSelectedMoveIndexRef.current = userSelectedMoveIndex;
  }, [userSelectedMoveIndex]);

  useEffect(() => {
    console.log(user)
    if (!user) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please Login First",
      });
      route.push("/");
    }
  }, [session.status]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case GAME_ADDED:
          setAdded(true);
          setGameID(message.gameId);
          break;
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          route.push(`/game/${message.payload.gameId}`);
          setGameMetadata({
            blackPlayer: message.payload.blackPlayer,
            whitePlayer: message.payload.whitePlayer,
          });
          break;
        case MOVE:
          const { move, player1TimeConsumed, player2TimeConsumed } =
            message.payload;
          setPlayer1TimeConsumed(player1TimeConsumed);
          setPlayer2TimeConsumed(player2TimeConsumed);
          if (userSelectedMoveIndexRef.current !== null) {
            setMoves((moves) => [...moves, move]);
            return;
          }
          try {
            if (isPromoting(chess, move.from, move.to)) {
              chess.move({
                from: move.from,
                to: move.to,
                promotion: "q",
              });
            } else {
              chess.move({ from: move.from, to: move.to });
            }
            setMoves((moves) => [...moves, move]);
            moveAudio?.play();
          } catch (error) { }
          break;
        case GAME_OVER:
          setResult(message.payload.result);
          break;

        case GAME_ENDED:
          let wonBy;
          switch (message.payload.status) {
            case "COMPLETED":
              wonBy = message.payload.result !== "DRAW" ? "CheckMate" : "Draw";
              break;
            case "PLAYER_EXIT":
              wonBy = "Player Exit";
              break;
            default:
              wonBy = "Timeout";
          }
          setResult({
            result: message.payload.result,
            by: wonBy,
          });
          chess.reset();
          setStarted(false);
          setAdded(false);

          break;

        case USER_TIMEOUT:
          setResult(message.payload.win);
          break;

        case GAME_JOINED:
          setGameMetadata({
            blackPlayer: message.payload.blackPlayer,
            whitePlayer: message.payload.whitePlayer,
          });
          setPlayer1TimeConsumed(message.payload.player1TimeConsumed);
          setPlayer2TimeConsumed(message.payload.player2TimeConsumed);

          setStarted(true);

          message.payload.moves.map((x: Move) => {
            if (isPromoting(chess, x.from, x.to)) {
              chess.move({ ...x, promotion: "q" });
            } else {
              chess.move(x);
            }
          });
          setMoves(message.payload.moves);
          break;

        case GAME_TIME:
          setPlayer1TimeConsumed(message.payload.player1Time);
          setPlayer2TimeConsumed(message.payload.player2Time);
          break;

        case GAME_NOT_FOUND:
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Your requested game not found",
          });
          route.push("/");
          break;
        default:
          alert(message.payload.message);
          break;
      }
    };

    if (gameId !== "random") {
      socket.send(
        JSON.stringify({
          type: JOIN_ROOM,
          payload: {
            gameId,
          },
        })
      );
    }
  }, [chess, socket]);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (chess.turn() === "w") {
          setPlayer1TimeConsumed((p) => p + 100);
        } else {
          setPlayer2TimeConsumed((p) => p + 100);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [started, gameMetadata, user]);

  const getTimer = (timeConsumed: number) => {
    const timeLeftMs = GAME_TIME_MS - timeConsumed;
    const minutes = Math.floor(timeLeftMs / (1000 * 60));
    const remainingSeconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

    return (
      <div className="text-white">
        Time Left: {minutes < 10 ? "0" : ""}
        {minutes}:{remainingSeconds < 10 ? "0" : ""}
        {remainingSeconds}
      </div>
    );
  };

  const handleExit = () => {
    socket?.send(
      JSON.stringify({
        type: EXIT_GAME,
        payload: {
          gameId,
        },
      })
    );
    setMoves([]);
    route.push("/");
  };

  if (!socket)
    return (
      <Wait
        title={"Waiting for connection"}
        description={"Getting your game ready"}
      />
    );

  return (
    <div className="">
      {result && (
        <GameEndModal
          blackPlayer={gameMetadata?.blackPlayer}
          whitePlayer={gameMetadata?.whitePlayer}
          gameResult={result}
        ></GameEndModal>
      )}
      {started && (
        <div className="justify-center flex pt-4 text-white">
          {(user?.id === gameMetadata?.blackPlayer?.id ? "b" : "w") ===
            chess.turn()
            ? "Your turn"
            : "Opponent's turn"}
        </div>
      )}
      <div className="justify-center flex">
        <div className="pt-2 w-full">
          <div className="flex gap-8 w-full">
            <div className="text-white">
              <div className="flex justify-center">
                <div>
                  {started && (
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <UserAvatar
                          name={
                            user?.id === gameMetadata?.whitePlayer?.id
                              ? gameMetadata?.blackPlayer?.name
                              : gameMetadata?.whitePlayer?.name
                          }
                        />
                        {getTimer(
                          user?.id === gameMetadata?.whitePlayer?.id
                            ? player2TimeConsumed
                            : player1TimeConsumed
                        )}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className={`w-full flex justify-center text-white`}>
                      <ChessBoard
                        started={started}
                        gameId={(gameId as string) ?? ""}
                        myColor={
                          user?.id === gameMetadata?.blackPlayer?.id ? "b" : "w"
                        }
                        chess={chess}
                        setBoard={setBoard}
                        socket={socket}
                        board={board}
                      />
                    </div>
                  </div>
                  {started && (
                    <div className="mt-4 flex justify-between">
                      <UserAvatar
                        name={
                          user?.id === gameMetadata?.blackPlayer?.id
                            ? gameMetadata?.blackPlayer?.name
                            : gameMetadata?.whitePlayer?.name ?? ""
                        }
                      />
                      {getTimer(
                        user?.id === gameMetadata?.blackPlayer?.id
                          ? player2TimeConsumed
                          : player1TimeConsumed
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-md pt-2 bg-bgAuxiliary3 flex-1 overflow-auto h-[95vh] overflow-y-scroll no-scrollbar">
              {started && <div>hello </div>}
              {!started ? (
                <div className="pt-8 flex justify-center w-full">
                  {added ? (
                    <div className="flex flex-col items-center space-y-4 justify-center">
                      <div className="text-white">
                        <Wait
                          title={"Waiting for opponenets"}
                          description={"Your opponent will join soon"}
                        />
                      </div>
                      <ShareGame gameId={gameID} />
                    </div>
                  ) : (
                    gameId === "random" && (
                      <Button
                        onClick={() => {
                          socket.send(
                            JSON.stringify({
                              type: INIT_GAME,
                            })
                          );
                        }}
                      >
                        Play
                      </Button>
                    )
                  )}
                </div>
              ) : (
                <div className="p-8 flex justify-center w-full">
                  <ExitGameModel onClick={() => handleExit()} />
                </div>
              )}
              <div>
                <MovesTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
