import { ROLE, USER_STATUS } from "@repo/utils/db-enums";
import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__UserSchema = z.object({
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__UserCountSchema = z
  .object({
    identifier: z
      .object({
        role: z.union([z.enum(ROLE), z.array(z.enum(ROLE))]),
      })
      .optional(),
  })
  .optional();

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllUsersSchema = z
  .object({
    identifier: z
      .union([
        z.object({
          referrerId: z.string().nullable(),
        }),
        z.object({
          role: z.union([z.enum(ROLE), z.array(z.enum(ROLE))]),
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__OneUserSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      email: z.email(),
    }),
  ]),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__ReferralsSchema = z.object({
  identifier: z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      email: z.string(),
    }),
  ]),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__UserSchema = z.object({
  identifier: z.object({
    id: z.string().length(10),
  }),

  dataToUpdate: z.object({
    email: z.email().optional(),
    fullName: z.string().optional(),
    avatarUrl: z.string().optional(),
    age: z.number().int().positive().optional(),
    role: z.enum(ROLE).optional(),
    phoneNumber: z.string().optional(),
    referrerId: z.string().nullable().optional(),
    userStatus: z.enum(USER_STATUS).nullable().optional(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__UserMonthlyStatsSchema = z
  .object({
    year: z.number().int().min(2000).max(9999).optional(),
  })
  .optional();

export {
  create__UserSchema,
  read__UserCountSchema,
  read__AllUsersSchema,
  read__OneUserSchema,
  read__ReferralsSchema,
  update__UserSchema,
  read__UserMonthlyStatsSchema,
};
