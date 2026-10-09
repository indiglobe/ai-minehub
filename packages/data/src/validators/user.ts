import { ROLE, USER_STATUS } from "@repo/utils/db-enums";
import z from "zod";

export const create__UserSchema = z.object({
  email: z.email(),
  fullName: z.string(),
  avatarUrl: z.url(),
  age: z.number(),
  role: z.enum(ROLE).optional(),
  phoneNumber: z.string(),
  referrerId: z.string().nullable().optional(),
  userStatus: z.enum(USER_STATUS).nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const read__AllUsersSchema = z
  .object({
    identifier: z
      .union([
        z.object({
          referrerId: z.string().nullable(),
        }),
        z.object({
          role: z.enum(ROLE),
        }),
      ])
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
      id: z.string(),
    }),
    z.object({
      email: z.email(),
    }),
  ]),
});
