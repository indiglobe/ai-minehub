import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  NamespaceName,
} from "@repo/types/socket-namespaces/active-traders";

export default function registerCoordinate(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) {
  const activeTraders = io.of("/active-traders" satisfies NamespaceName);

  activeTraders.on("connection", (socket) => {
    console.log("active-traders connected:", socket.id);

    socket.on("join-trading", () => {
      socket.emit("trader-joined");
    });

    socket.on("leave-trading", () => {
      socket.emit("trader-left");
    });

    socket.on("disconnect", () => {
      console.log("active-traders disconnected:", socket.id);
    });
  });
}
