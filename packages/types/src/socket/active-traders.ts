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

export type ServerToClientEvents = z.infer<typeof serverToClientEvents>;

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

export type ClientToServerEvents = z.infer<typeof clientToServerEvents>;

const interServerEvents = z.object({
  ping: z.function({
    input: [],
    output: z.void(),
  }),
});

export type InterServerEvents = z.infer<typeof interServerEvents>;

export const socketData = z.object({});

export type SocketData = z.infer<typeof socketData>;
