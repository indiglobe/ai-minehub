import z from "zod";
import {ROLE} from '@repo/utils/db-enums'

export const userDetailsCookieSchema = z.object({
  userId: z.string(),
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
  age: z.number(),
  role: z.enum(ROLE),
  phone: z.string(),
});

export type TUserDetailsCookieSchema = z.infer<typeof userDetailsCookieSchema>;
