import { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import z from "zod";

export const read__AllMiningOrdersSchema = z
  .object({
    identifier: z
      .object({
        miningProfileUsed: z.string().optional(),
        miningStatus: z.enum(INVESTMENT_STATUS).optional(),
        userId: z.string().optional(),
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
