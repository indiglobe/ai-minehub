import { Server } from "socket.io";

export default function registerChat(io: Server) {
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    console.log("Chat connected:", socket.id);

    // Join a room
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
    });

    // Leave a room (optional)
    socket.on("leaveRoom", (roomId: string) => {
      socket.leave(roomId);
      console.log(`${socket.id} left room: ${roomId}`);
    });

    // Send message to a specific room
    socket.on("message", ({ roomId, msg }) => {
      chat.to(roomId).emit("message", {
        msg,
        senderId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log("Chat disconnected:", socket.id);
    });
  });
}
