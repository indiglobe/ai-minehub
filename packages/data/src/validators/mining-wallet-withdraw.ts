import { WITHDRAWL_STATUS, TRANSACTION_METHOD } from "@repo/utils/db-enums";
import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__MiningWalletWithdrawSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(WITHDRAWL_STATUS),
    cryptoWalletAddress: z.string(),
    withdrawlMethod: z.enum(TRANSACTION_METHOD),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__MiningWalletWithdrawStatsSchema = z
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllMiningWalletWithdrawSchema = z
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__MiningWalletMonthlyWithdrawStatsSchema = z
  .object({
    year: z.number().int().min(2000).max(9999).optional(),
  })
  .optional();

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__MiningWalletWithdrawSchema = z.object({
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
    cryptoWalletAddress: z.string().optional(),
    status: z.enum(WITHDRAWL_STATUS).optional(),
    withdrawlMethod: z.enum(TRANSACTION_METHOD).optional(),
  }),
});

export {
  create__MiningWalletWithdrawSchema,
  read__MiningWalletWithdrawStatsSchema,
  read__AllMiningWalletWithdrawSchema,
  read__MiningWalletMonthlyWithdrawStatsSchema,
  update__MiningWalletWithdrawSchema,
};
