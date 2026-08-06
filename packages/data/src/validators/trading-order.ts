import { z } from "zod";

export const create__TradingOrderSchema = z.object({
  id: z.string().optional(),
  orderedBy: z.string(),
  amountInvested: z.number(),
  amountRecived: z.number().nullish(),
  tradingStatus: z
    .union([z.literal("active"), z.literal("completed")])
    .nullish(),
});

export const read__AllTradingOrdersSchema = z
  .object({
    identifier: z
      .object({
        id: z.string().optional(),
      })
      .optional(),
    queryOptions: z
      .object({
        skip: z.number().optional(),
        limit: z.number().optional(),
      })
      .optional(),
    joinOptions: z
      .object({
        user: z.literal(true).optional(),
      })
      .optional(),
  })
  .optional();

export const read__OneTradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  joinOptions: z
    .object({
      user: z.literal(true).optional(),
    })
    .optional(),
});

export const update__TradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    orderedBy: z.string().optional(),
    amountInvested: z.number().optional(),
    amountRecived: z.number().nullish(),
    tradingStatus: z
      .union([z.literal("active"), z.literal("completed")])
      .nullish(),
  }),
});

export const delete__TradingOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});
