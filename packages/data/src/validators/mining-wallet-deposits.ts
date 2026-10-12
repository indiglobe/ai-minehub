import { z } from "zod";
import { DEPOSIT_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";

export const create__MiningWalletDepositeSchema = z.object({
  dataToInsert: z.object({
    id: z.string().optional(),
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(DEPOSIT_STATUS).nullish(),
    depositMethod: z.enum(TRANSACTION_METHOD),
    transactionId: z.string(),
    depositProof: z.string(),
  }),
});
