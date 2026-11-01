import { z } from "zod";
import { DEPOSIT_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__MiningWalletDepositSchema = z.object({
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllMiningWalletDepositSchema = z
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__MiningWalletDepositStatsSchema = z
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__MiningWalletDepositSchema = z.object({
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__MiningWalletMonthlyDepositStatsSchema = z
  .object({
    year: z.number().int().min(2000).max(9999).optional(),
  })
  .optional();

export {
  create__MiningWalletDepositSchema,
  read__AllMiningWalletDepositSchema,
  read__MiningWalletDepositStatsSchema,
  update__MiningWalletDepositSchema,
  read__MiningWalletMonthlyDepositStatsSchema,
};
