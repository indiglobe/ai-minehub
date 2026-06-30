import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@repo/types/socket/active-traders";

export default function registerActiveTraders(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) {
  const activeTraders = io.of("/active-traders");

  activeTraders.on("connection", (socket) => {
    socket.on("join-trading", () => {
      socket.broadcast.emit("trader-joined");
    });

    socket.on("leave-trading", () => {
      socket.broadcast.emit("trader-left");
    });

    socket.on("disconnect", () => {
      console.log("activeTraders disconnected:", socket.id);
    });
  });
}
