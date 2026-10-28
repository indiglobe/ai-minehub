import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import registerChat from "@/namespace/chat";
import registerActiveTraders from "@/namespace/active-traders";
import registerLiveMarkets from "./namespace/live-market";

const PORT = process.env.PORT ?? 3000;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

registerChat(io);
registerActiveTraders(io);
registerLiveMarkets(io);

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
