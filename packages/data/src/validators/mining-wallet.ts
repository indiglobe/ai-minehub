import z from "zod";

export const create__MiningWalletSchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
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
        userDetails: z.boolean(),
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
      userDetails: z.boolean(),
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
    updatedAt: z.date().optional(),
    createdAt: z.date().optional(),
    id: z.string().optional(),
    balance: z.number().nullish(),
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
