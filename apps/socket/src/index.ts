import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import registerChat from "@/namespace/chat";
import registerActiveTraders from "@/namespace/active-traders";

const PORT = process.env.PORT ?? 3000;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

registerChat(io);
registerActiveTraders(io);

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
