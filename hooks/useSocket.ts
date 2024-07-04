"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(`${WS_URL}?token=${user?.id}`);
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  return socket;
};
