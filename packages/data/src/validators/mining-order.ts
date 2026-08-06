import { z } from "zod";

export const create__MiningOrderSchema = z.object({
  id: z.string().optional(),
  orderedBy: z.string(),
  amountInvested: z.number(),
  miningProfileUsed: z.string(),
});

export const read__AllMiningOrdersSchema = z.object({
  identifier: z
    .object({
      id: z.string().optional(),
      miningProfileUsed: z.string().optional(),
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
      user: z.literal(true).optional(),
      miningProfile: z.literal(true).optional(),
    })
    .optional(),
});

export const read__OneMiningOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  joinOptions: z
    .object({
      user: z.literal(true).optional(),
      miningProfile: z.literal(true).optional(),
    })
    .optional(),
});

export const update__MiningOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    orderedBy: z.string().optional(),
    amountInvested: z.number().optional(),
    miningProfileUsed: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__MiningOrderSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});
