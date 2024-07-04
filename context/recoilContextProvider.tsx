"use client";
import { RecoilRoot, atom } from "recoil";
import { SessionProvider } from "next-auth/react";

import { Move } from "chess.js";

export const isBoardFlippedAtom = atom({
  key: "isBoardFlippedAtom",
  default: false,
});

export const movesAtom = atom<Move[]>({
  key: "movesAtom",
  default: [],
});

export const userSelectedMoveIndexAtom = atom<number | null>({
  key: "userSelectedMoveIndex",
  default: null,
});

export const todoListState = atom({
  key: "TodoList",
  default: [],
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
