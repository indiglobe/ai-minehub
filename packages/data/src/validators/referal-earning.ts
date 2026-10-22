import { REFERRER_EARNING_CAUSE } from "@repo/utils/db-enums";
import z from "zod";

export const create__ReferalEarningSchema = z.object({
  earningWay: z.enum(REFERRER_EARNING_CAUSE),
  earnerId: z.string(),
  sourceUserId: z.string(),
  amount: z.number(),
});

export const read__AllReferalEarningSchema = z
  .object({
    identifier: z
      .object({
        userId: z.string(),
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
