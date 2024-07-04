import React, { useState } from "react";
import { GameResult, Result } from "@/types/game";

interface ModalProps {
  blackPlayer?: { id: string; name: string };
  whitePlayer?: { id: string; name: string };
  gameResult: GameResult;
}

const GameEndModal: React.FC<ModalProps> = ({
  blackPlayer,
  whitePlayer,
  gameResult,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const PlayerDisplay = ({
    player,
    gameResult,
    isWhite,
  }: {
    player?: { id: string; name: string };
    gameResult: Result;
    isWhite: boolean;
  }) => {
    const imageSrc = isWhite ? "/wk.png" : "/bk.png";
    const borderColor =
      gameResult === (isWhite ? Result.WHITE_WINS : Result.BLACK_WINS)
        ? "border-green-500"
        : "border-red-500";

    return (
      <div className="flex flex-col items-center">
        <div className={`border-4 rounded-full p-2 ${borderColor} bg-gray-800`}>
          <img
            src={imageSrc}
            alt={`${isWhite ? "White" : "Black"} King`}
            className="w-12 h-12"
          />
        </div>
        <div className="text-center text-sm p-2">
          <p
            className="text-gray-300 font-mono truncate w-24"
            title={getPlayerName(player)}
          >
            {getPlayerName(player)}
          </p>
        </div>
      </div>
    );
  };

  const getWinnerMessage = (result: Result) => {
    switch (result) {
      case Result.BLACK_WINS:
        return "Black Wins!";
      case Result.WHITE_WINS:
        return "White Wins!";
      default:
        return "It's a Draw";
    }
  };

  const getPlayerName = (player: { id: string; name: string } | undefined) => {
    return player ? player.name : "Unknown";
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="relative rounded-xl shadow-2xl bg-gray-900 w-96 border-2 border-red-500">
            <div className="px-8 py-10 items-center self-center m-auto">
              <div className="m-auto mb-6">
                <h2 className="text-4xl font-bold mb-2 text-red-500 text-center font-mono">
                  {getWinnerMessage(gameResult.result)}
                </h2>
              </div>
              <div className="m-auto mb-6">
                <p className="text-xl text-gray-300 text-center font-mono">
                  by {gameResult.by}
                </p>
              </div>
              <div className="flex flex-row justify-between items-center bg-gray-800 rounded-lg px-6 py-8">
                <PlayerDisplay
                  isWhite={true}
                  player={whitePlayer}
                  gameResult={gameResult.result}
                />
                <div className="text-red-500 text-3xl font-bold font-mono">
                  vs
                </div>
                <PlayerDisplay
                  isWhite={false}
                  player={blackPlayer}
                  gameResult={gameResult.result}
                />
              </div>
            </div>
            <div className="px-8 py-6 bg-gray-800 text-right rounded-b-xl">
              <button
                className="px-8 py-3 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none font-bold font-mono transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameEndModal;
