
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Server } from "socket.io";

import { routes } from "@/routes/__root";
import registerActiveTraders from "@/socket-namespace/active-traders";
import registerChat from "@/socket-namespace/chat";

const PORT = Number(process.env.PORT) || 3000;

const app = new Hono();

app.route("/", routes);

const httpServer = serve({
  fetch: app.fetch,
  port: PORT,
  hostname: "0.0.0.0",
});

const io = new Server(httpServer, {
  cors: {
    origin: ["https://aiminehub.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.engine.on("connection_error", (err) => {
  console.error("Socket.IO connection error:", {
    code: err.code,
    message: err.message,
    context: err.context,
  });
});

registerActiveTraders(io);
registerChat(io);

httpServer.on("listening", () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app, io, httpServer };












