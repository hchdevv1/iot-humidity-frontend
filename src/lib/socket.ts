import { io } from "socket.io-client";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
export const transactionSocket =
  io(
    `${WS_URL}/transactions`,
    {
      path:
        "/socket.io",
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    },
  );