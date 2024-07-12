"use client";
import { ReactNode, MouseEventHandler } from "react";

interface GameModeComponent {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
}

const GameModeComponent = ({
  icon,
  title,
  description,
  onClick,
  disabled,
}: GameModeComponent) => (
  <div
    onClick={onClick}
    className="-mx-4 mt-1 bg-bgAuxiliary2 hover:scale-[1.02] flex items-start space-x-4 rounded-sm p-2 transition-all shadow-lg bg-slate-600 "
  >
    {icon}

    <div className="space-y-1">
      <p className="text-xl pt-1 font-extrabold leading-none text-white">
        {title}
      </p>
      <p className="text-sm font-medium text-slate-100 pt-2 text-muted-foreground">
        {description}
      </p>
      {disabled && (
        <p className="text-xs text-red-500 font-semibold">Coming Soon ...</p>
      )}
    </div>
  </div>
);

export default GameModeComponent;
