import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@repo/types/socket/live-markets";

export default function registerLiveMarkets(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) {
  const LiveMarkets = io.of("/live-markets");

  LiveMarkets.on("connection", (socket) => {
    socket.on("apply-change", () => {
      socket.broadcast.emit("change-applied");
    });

    socket.on("disconnect", () => {
      console.log("LiveMarkets disconnected:", socket.id);
    });
  });
}
