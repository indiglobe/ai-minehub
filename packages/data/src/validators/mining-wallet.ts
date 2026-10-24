import z from "zod";

export const create__MiningWalletSchema = z.object({
  dataToInsert: z.object({
    balance: z.number().optional(),
    associatedUser: z.string(),
  }),
});

export const read__OneMiningWalletSchema = z.object({
  identifier: z.union([
    z.object({ id: z.string() }),
    z.object({ associatedUserId: z.string() }),
  ]),
});

export const update__OneMiningWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    balance: z.number().optional(),
  }),
});
