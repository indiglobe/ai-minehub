import z from "zod";

export const create__TradingWalletSchema = z.object({
  dataToInsert: z.object({
    balance: z.number().nullish(),
    associatedUser: z.string(),
  }),
});

export const read__AllTradingWalletsSchema = z
  .object({
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

export const read__OneTradingWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUserId: z.string(),
    }),
  ]),
});

export const TUpdate__TradingWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUser: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    balance: z.number().nullish(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__TradingWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUser: z.string(),
    }),
  ]),
});
