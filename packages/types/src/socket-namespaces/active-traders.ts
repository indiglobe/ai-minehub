/* eslint-disable @typescript-eslint/no-unused-vars */
import z from "zod";

const serverToClientEvents = z.object({
  "trader-joined": z.function({
    input: [],
    output: z.void(),
  }),
  "trader-left": z.function({
    input: [],
    output: z.void(),
  }),
});

type ServerToClientEvents = z.infer<typeof serverToClientEvents>;

const clientToServerEvents = z.object({
  "join-trading": z.function({
    input: [],
    output: z.void(),
  }),
  "leave-trading": z.function({
    input: [],
    output: z.void(),
  }),
});

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

const namespaceName = z.literal("/active-traders");

type NamespaceName = z.infer<typeof namespaceName>;

export type {
  ClientToServerEvents,
  InterServerEvents,
  NamespaceName,
  ServerToClientEvents,
  SocketData,
};
