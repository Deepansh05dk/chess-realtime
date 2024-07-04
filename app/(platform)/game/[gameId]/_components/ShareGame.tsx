import { useState } from "react";
import { Button } from "@/components/ui/button";

export const ShareGame = ({
  className,
  gameId,
}: {
  className?: string;
  gameId: string;
}) => {
  const url = window.origin + "/game/" + gameId;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
  };

  return (
    <div
      className={`flex flex-col items-center gap-y-6 ${className} bg-gray-900 p-8 rounded-xl shadow-2xl border-2 border-red-500`}
    >
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight text-red-500 font-mono">
        Play with Friends
      </h3>

      <div className="flex items-center gap-x-3 bg-gray-800 p-3 rounded-lg">
        <LinkSvg />
        <div
          onClick={handleCopy}
          className="text-gray-300 cursor-pointer hover:text-red-400 transition-colors duration-300 font-mono"
        >
          {url}
        </div>
      </div>

      <Button
        onClick={handleCopy}
        className={`font-mono text-white font-bold rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
          copied
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {copied ? `Copied to Clipboard!` : `Copy the link`}
      </Button>
    </div>
  );
};

const LinkSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};
