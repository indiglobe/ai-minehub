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
  ping: z.function(),
});

export type InterServerEvents = z.infer<typeof interServerEvents>;

export interface SocketData {}
