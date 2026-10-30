import { z } from "zod";
import { DEPOSIT_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";

export const create__MiningWalletDepositeSchema = z.object({
  dataToInsert: z.object({
    id: z.string().optional(),
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(DEPOSIT_STATUS).optional(),
    depositMethod: z.enum(TRANSACTION_METHOD),
    transactionId: z.string(),
    depositProof: z.string(),
  }),
});

export const read__AllMiningWalletDepositeSchema = z
  .object({
    identifier: z
      .object({
        orderedBy: z.string().optional(),
        wallet: z.string().optional(),
        status: z
          .union([z.enum(DEPOSIT_STATUS), z.array(z.enum(DEPOSIT_STATUS))])
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

export const read__MiningWalletDepositStatsSchema = z
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

export const update__MiningWalletDepositeSchema = z.object({
  identifier: z.union([
    z.object({
      walletId: z.string(),
    }),
    z.object({
      userId: z.string(),
    }),
  ]),
  dataToInsert: z.object({
    orderedBy: z.string().optional(),
    wallet: z.string().optional(),
    amount: z.number().optional(),
    status: z.enum(DEPOSIT_STATUS).optional(),
    depositMethod: z.enum(TRANSACTION_METHOD).optional(),
    transactionId: z.string().optional(),
    depositProof: z.string().optional(),
  }),
});
