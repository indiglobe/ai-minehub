import z from "zod";

export const create__UserSchema = z.object({
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
  age: z.number(),
  role: z.union([z.literal("admin"), z.literal("basic")]).optional(),
  phoneNumber: z.string(),
  referrerId: z.string().nullish(),
  updatedAt: z.date().optional(),
});

export const read__AllUsersSchema = z
  .object({
    identifier: z
      .object({
        role: z.union([z.literal("admin"), z.literal("basic")]).optional(),
        referrerId: z.string().nullish(),
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
        tradingWallet: z.literal(true).optional(),
        miningWallet: z.literal(true).optional(),
        rating: z.literal(true).optional(),
        referredBy: z.literal(true).optional(),
        referrals: z.literal(true).optional(),
        miningOrders: z.literal(true).optional(),
        tradingOrders: z.literal(true).optional(),
      })
      .optional(),
  })
  .optional();

export const read__OneUserSchema = z.object({
  identifier: z.union([
    z.object({
      email: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
  joinOptions: z
    .object({
      tradingWallet: z.literal(true).optional(),
      miningWallet: z.literal(true).optional(),
      rating: z.literal(true).optional(),
      referredBy: z.literal(true).optional(),
      referrals: z.literal(true).optional(),
      miningOrders: z.literal(true).optional(),
      tradingOrders: z.literal(true).optional(),
    })
    .optional(),
});

export const update__UserSchema = z.object({
  identifier: z.union([
    z.object({
      email: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    fullName: z.string().optional(),
    avatarUrl: z.string().optional(),
    age: z.number().optional(),
    role: z.union([z.literal("admin"), z.literal("basic")]).optional(),
    phoneNumber: z.string().optional(),
    referrerId: z.string().nullish(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__UserSchema = z.object({
  identifier: z.union([
    z.object({
      email: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
});
