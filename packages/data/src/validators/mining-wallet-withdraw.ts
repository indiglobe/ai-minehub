import { DEPOSIT_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";
import z from "zod";

export const create__MiningWalletWithdrawSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(DEPOSIT_STATUS),
    cryptoWalletAddress: z.string(),
    withdrawalMethod: z.enum(TRANSACTION_METHOD),
  }),
});
