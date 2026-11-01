import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__TradingWalletSchema = z.object({
  dataToInsert: z.object({
    balance: z.number().optional(),
    associatedUser: z.string(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__OneTradingWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__BalanceSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    balance: z.number(),
  }),
});

export {
  create__TradingWalletSchema,
  read__OneTradingWalletSchema,
  update__BalanceSchema,
};
