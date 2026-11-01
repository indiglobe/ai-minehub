import { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__MiningOrderSchema = z.object({
  dataToInsert: z.object({
    orderedBy: z.string(),
    amountInvested: z.number(),
    amountReceived: z.number().nullish(),
    miningProfileUsed: z.string(),
    miningStatus: z.enum(INVESTMENT_STATUS).optional(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllMiningOrdersSchema = z
  .object({
    identifier: z
      .object({
        miningProfileUsed: z.string().optional(),
        miningStatus: z
          .union([
            z.enum(INVESTMENT_STATUS),
            z.array(z.enum(INVESTMENT_STATUS)),
          ])
          .optional(),
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

const update__MiningOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    orderedBy: z.string().optional(),
    amountInvested: z.number().optional(),
    amountReceived: z.number().nullish(),
    miningProfileUsed: z.string().optional(),
    miningStatus: z.enum(INVESTMENT_STATUS).optional(),
  }),
});

export {
  create__MiningOrderSchema,
  read__AllMiningOrdersSchema,
  update__MiningOrderSchema,
};
