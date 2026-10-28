import { WITHDRAWL_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";
import z from "zod";

export const create__MiningWalletWithdrawSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(WITHDRAWL_STATUS),
    cryptoWalletAddress: z.string(),
    withdrawalMethod: z.enum(TRANSACTION_METHOD),
  }),
});

export const read__MiningWalletWithdrawStatsSchema = z
  .object({
    identifier: z
      .object({
        status: z.union([
          z.enum(WITHDRAWL_STATUS),
          z.array(z.enum(WITHDRAWL_STATUS)),
        ]),
      })
      .optional(),
  })
  .optional();

export const read__AllMiningWalletWithdrawSchema = z
  .object({
    identifier: z
      .object({
        orderedBy: z.string().optional(),
        wallet: z.string().optional(),
        status: z
          .union([z.enum(WITHDRAWL_STATUS), z.array(z.enum(WITHDRAWL_STATUS))])
          .optional(),
      })
      .optional(),
    queryOptions: z
      .object({
        skip: z.number().optional(),
        limit: z.number().optional(),
      })
      .optional(),
  })
  .optional();
