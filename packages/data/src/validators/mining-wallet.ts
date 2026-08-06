import z from "zod";

export const create__MiningWalletSchema = z.object({
  id: z.string().optional(),
  balance: z.number().nullish(),
  associatedUser: z.string(),
});

export const read__AllMiningWalletsSchema = z
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

export const read__OneMiningWalletSchema = z.object({
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
      user: z.literal(true).optional(),
    })
    .optional(),
});

export const update__MiningWalletSchema = z.object({
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

export const delete__MiningWalletSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      associatedUser: z.string(),
    }),
  ]),
});
