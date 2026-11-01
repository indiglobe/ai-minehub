import { z } from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__TradingOrderSchema = z.object({
  id: z.string().optional(),
  orderedBy: z.string(),
  amountInvested: z.number(),
  amountReceived: z.number().nullish(),
  tradingStatus: z
    .union([z.literal("active"), z.literal("completed")])
    .nullish(),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllTradingOrdersSchema = z
  .object({
    identifier: z
      .object({
        userId: z.string(),
      })
      .partial()
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

const read__OneTradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  joinOptions: z
    .object({
      user: z.literal(true).optional(),
    })
    .optional(),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__TradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    orderedBy: z.string().optional(),
    amountInvested: z.number().optional(),
    amountReceived: z.number().nullish(),
    tradingStatus: z
      .union([z.literal("active"), z.literal("completed")])
      .nullish(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const delete__TradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

export {
  create__TradingOrderSchema,
  read__AllTradingOrdersSchema,
  read__OneTradingOrderSchema,
  update__TradingOrderSchema,
  delete__TradingOrderSchema,
};
