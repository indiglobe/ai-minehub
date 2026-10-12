import z from "zod";

export const create__MiningWalletSchema = z.object({
  dataToInsert: z.object({
    balance: z.number().nullish(),
    associatedUser: z.string(),
  }),
});

export const read__OneMiningWalletSchema = z.object({
  identifier: z.union([
    z.object({ id: z.string() }),
    z.object({ associatedUserId: z.string() }),
  ]),
});
