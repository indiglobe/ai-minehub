import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  NamespaceName,
} from "@repo/types/socket-namespaces/chat";
import { create__Chat } from "@repo/data/querries/chat";
import { tryCatch } from "@repo/utils/try-catch";
import { ROLE } from "@repo/utils/db-enums";

const channelMapper: Map<
  string,
  Set<{ role: (typeof ROLE)[number]; userId: string }>
> = new Map();

export default function registerChat(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) {
  const chat = io.of("/chat" satisfies NamespaceName);

  chat.on("connection", (socket) => {
    console.log("chat connected:", socket.id);

    socket.on("join-channel", async ({ channelId, senderId, role }) => {
      await socket.join(channelId);

      let users = channelMapper.get(channelId);

      if (!users) {
        users = new Set();
        channelMapper.set(channelId, users);
      }

      // Prevent duplicate users based on userId
      const existingUser = [...users].find((user) => user.userId === senderId);

      if (existingUser) {
        users.delete(existingUser);
      }

      users.add({
        userId: senderId,
        role,
      });

      socket.emit("channel-joined", { channelId, senderId });

      console.log(`${socket.id} joined ${channelId}`);
      console.log("Channel users:", [...users]);
    });

    socket.on("leave-channel", async ({ channelId, senderId }) => {
      await socket.leave(channelId);

      const users = channelMapper.get(channelId);

      if (users) {
        // Delete user by userId instead of object reference
        const existingUser = [...users].find(
          (user) => user.userId === senderId,
        );

        if (existingUser) {
          users.delete(existingUser);
        }

        if (users.size === 0) {
          channelMapper.delete(channelId);
        }
      }

      socket.emit("channel-left", { channelId, senderId });

      console.log(`${socket.id} left ${channelId}`);
    });

    socket.on(
      "send-message",
      async ({ channelId, message, senderId, role, reciverId }) => {
        if (role === "BASIC") {
          const [, createdChat] = await tryCatch(
            create__Chat({
              dataToInsert: {
                message,
                senderId,
              },
            }),
          );

          if (createdChat) {
            socket.broadcast.to(channelId).emit("new-message", {
              channelId,
              message,
              senderId,
              role,
              createdAt: createdChat.createdAt,
              id: createdChat.id,
              reciverId: null,
              updatedAt: createdChat.updatedAt,
            });
          }
        }

        if (role === "ADMIN" && reciverId) {
          const [, createdChat] = await tryCatch(
            create__Chat({
              dataToInsert: {
                message,
                senderId,
                reciverId,
              },
            }),
          );

          if (createdChat) {
            socket.broadcast.to(channelId).emit("new-message", {
              channelId,
              message,
              senderId,
              role,
              createdAt: createdChat.createdAt,
              id: createdChat.id,
              reciverId: channelId,
              updatedAt: createdChat.updatedAt,
            });
          }
        }
      },
    );

    socket.on("disconnect", () => {
      console.log("chat disconnected:", socket.id);
    });
  });
}
