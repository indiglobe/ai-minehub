import z from "zod";

export const create__TradingWalletSchema = z.object({
  balance: z.number().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  associatedUser: z.string(),
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
        userDetails: z.boolean(),
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
      associatedUser: z.string(),
    }),
  ]),
  joinOptions: z
    .object({
      userDetails: z.boolean(),
    })
    .optional(),
});

export const update__TradingWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUser: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    id: z.string().optional(),
    balance: z.number().optional(),
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
