import z from "zod";

export const create__UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  fullName: z.string(),
  avatarUrl: z.string(),
  age: z.number(),
  role: z.enum(["admin", "basic"]).optional(),
  phoneNumber: z.string().length(10),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const read__AllUsersSchema = z
  .object({
    identifier: z
      .object({
        role: z.enum(["admin", "basic"]).optional(),
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
        ratingDetails: z.boolean(),
        tradingWalletDetails: z.boolean(),
        miningWalletDetails: z.boolean(),
      })
      .optional(),
  })
  .optional();

export const read__OneUserSchema = z.object({
  identifier: z.object({
    email: z.string().email(),
  }),

  joinOptions: z
    .object({
      ratingDetails: z.boolean(),
      tradingWalletDetails: z.boolean(),
      miningWalletDetails: z.boolean(),
    })
    .optional(),
});

export const update__UserSchema = z.object({
  identifier: z.object({
    email: z.string().email(),
  }),

  dataToUpdate: z.object({
    fullName: z.string().optional(),
    avatarUrl: z.string().optional(),
    age: z.number().optional(),
    role: z.enum(["admin", "basic"]).optional(),
    phoneNumber: z.string().length(10).optional(),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__UserSchema = z.object({
  identifier: z.object({
    email: z.string().email(),
  }),
});
