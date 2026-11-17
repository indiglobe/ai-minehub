/* eslint-disable @typescript-eslint/no-unused-vars */
import z from "zod";
import { ROLE } from "@repo/utils/db-enums";

// Server -> Client
const serverToClientEvents = z.object({
  "channel-joined": z.function({
    input: [
      z.object({
        channelId: z.string(),
        senderId: z.string(),
      }),
    ],
    output: z.void(),
  }),

  "channel-left": z.function({
    input: [
      z.object({
        channelId: z.string(),
        senderId: z.string(),
      }),
    ],
    output: z.void(),
  }),

  "new-message": z.function({
    input: [
      z.intersection(
        z.object({
          id: z.string(),
          message: z.string(),
          senderId: z.string(),
          reciverId: z.string().nullable(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
        z.object({
          role: z.enum(ROLE),
          channelId: z.string(),
        }),
      ),
    ],
    output: z.void(),
  }),
});

type ServerToClientEvents = z.infer<typeof serverToClientEvents>;

// Client -> Server
const clientToServerEvents = z.object({
  "join-channel": z.function({
    input: [
      z.object({
        channelId: z.string(),
        senderId: z.string(),
        role: z.enum(ROLE),
      }),
    ],
    output: z.void(),
  }),

  "leave-channel": z.function({
    input: [
      z.object({
        channelId: z.string(),
        senderId: z.string(),
      }),
    ],
    output: z.void(),
  }),

  "send-message": z.function({
    input: [
      z.object({
        channelId: z.string(),
        message: z.string(),
        senderId: z.string(),
        reciverId: z.string().optional(),
        role: z.enum(ROLE),
      }),
    ],
    output: z.void(),
  }),
});

// Types
type ClientToServerEvents = z.infer<typeof clientToServerEvents>;

const interServerEvents = z.object({
  ping: z.function({
    input: [],
    output: z.void(),
  }),
});

type InterServerEvents = z.infer<typeof interServerEvents>;

const socketData = z.object({});

type SocketData = z.infer<typeof socketData>;

const namespaceName = z.literal("/chat");

type NamespaceName = z.infer<typeof namespaceName>;

export type {
  //

  ClientToServerEvents,
  InterServerEvents,
  NamespaceName,
  ServerToClientEvents,
  SocketData,
};
