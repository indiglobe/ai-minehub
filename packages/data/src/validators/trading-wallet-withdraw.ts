import { z } from "zod";
import {
  DEPOSIT_STATUS,
  TRANSACTION_METHOD,
  WITHDRAWL_STATUS,
} from "@repo/utils/db-enums";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__TradingWalletWithdrawSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    wallet: z.string(),
    amount: z.number(),
    status: z.enum(DEPOSIT_STATUS),
    cryptoWaletAddress: z.string(),
    withdrawlMethod: z.enum(TRANSACTION_METHOD),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__TradingWalletWithdrawStatsSchema = z
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

const read__AllTradingWalletWithdrawSchema = z
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

const read__TradingWalletMonthlyWithdrawStatsSchema = z
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

const update__TradingWalletWithdrawSchema = z.object({
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
    cryptoWaletAddress: z.string().optional(),
    status: z.enum(WITHDRAWL_STATUS).optional(),
    withdrawlMethod: z.enum(TRANSACTION_METHOD).optional(),
  }),
});

export {
  create__TradingWalletWithdrawSchema,
  read__TradingWalletWithdrawStatsSchema,
  read__AllTradingWalletWithdrawSchema,
  read__TradingWalletMonthlyWithdrawStatsSchema,
  update__TradingWalletWithdrawSchema,
};
