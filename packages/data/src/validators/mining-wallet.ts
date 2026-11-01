import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__MiningWalletSchema = z.object({
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

const read__OneMiningWalletSchema = z.object({
  identifier: z.union([
    z.object({ id: z.string() }),
    z.object({ associatedUserId: z.string() }),
  ]),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__OneMiningWalletSchema = z.object({
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
  create__MiningWalletSchema,
  read__OneMiningWalletSchema,
  update__OneMiningWalletSchema,
  update__BalanceSchema,
};
