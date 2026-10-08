import { ROLE } from "@repo/utils/db-enums";
import z from "zod";

export const create__UserSchema = z.object({
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
  age: z.number(),
  role: z.enum(ROLE).optional(),
  phoneNumber: z.string(),
  referrerId: z.string().nullish(),
  updatedAt: z.date().optional(),
});

export const read__AllUsersSchema = z
  .object({
    identifier: z
      .object({
        role: z.enum(ROLE).optional(),
        referrerId: z.string().nullish(),
      })
      .optional(),
    queryOptions: z
      .object({
        skip: z.number().optional(),
        limit: z.number().optional(),
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
    role: z.enum(ROLE).optional(),
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
