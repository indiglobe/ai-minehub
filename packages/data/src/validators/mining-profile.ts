import z from "zod";

export const read__AllMiningProfilesSchema = z
  .object({
    identifier: z
      .object({
        isPopular: z.boolean().optional(),
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
