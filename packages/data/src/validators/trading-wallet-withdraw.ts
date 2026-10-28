import { z } from "zod";
import { DEPOSIT_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";

export const create__TradingWalletWithdrawSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(DEPOSIT_STATUS),
    cryptoWaletAddress: z.string(),
    withdrawlMethod: z.enum(TRANSACTION_METHOD),
  }),
});

export const read__TradingWalletWithdrawStatsSchema = z
  .object({
    identifier: z
      .object({
        status: z.union([
          z.enum(DEPOSIT_STATUS),
          z.array(z.enum(DEPOSIT_STATUS)),
        ]),
      })
      .optional(),
  })
  .optional();
