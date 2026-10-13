import z from "zod";

export const read__AllReferalEarningSchema = z.object({
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
}).optional();
