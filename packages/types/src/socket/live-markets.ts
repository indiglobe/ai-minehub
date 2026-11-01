import z from "zod";

const serverToClientEvents = z.object({
  "change-applied": z.function({ input: [z.object({})], output: z.void() }),
});

export type ServerToClientEvents = z.infer<typeof serverToClientEvents>;

const clientToServerEvents = z.object({
  "apply-change": z.function(),
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
