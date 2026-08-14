import z from "zod";

export const create__MiningProfileSchema = z.object({
  id: z.string().optional(),
  maximumAllowedAmount: z.number(),
  minimumAllowedAmount: z.number(),
  lockinPeriod: z.number(),
  category: z.string(),
  dailyReturn: z.number(),
});

export const read__AllMiningProfilesSchema = z
  .object({
    identifier: z
      .object({
        id: z.string().optional(),
        category: z.string().optional(),
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
        orders: z.literal(true).optional(),
      })
      .optional(),
  })
  .optional();

export const read__OneMiningProfileSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      category: z.string(),
    }),
  ]),
  joinOptions: z
    .object({
      orders: z.literal(true).optional(),
    })
    .optional(),
});

export const update__MiningProfileSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    maximumAllowedAmount: z.number().optional(),
    minimumAllowedAmount: z.number().optional(),
    lockinPeriod: z.number().optional(),
    category: z.string().optional(),
    dailyReturn: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__MiningProfileSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});
