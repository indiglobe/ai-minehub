import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__MiningProfileSchema = z.object({
  dataToInsert: z.object({
    maximumAllowedAmount: z.number(),
    minimumAllowedAmount: z.number(),
    lockinPeriod: z.number(),
    category: z.string(),
    dailyReturn: z.number(),
    isPopular: z.boolean().optional(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllMiningProfilesSchema = z
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__MiningProfileSchema = z.object({
  identifier: z.object({
    id: z.string().length(10),
  }),

  dataToUpdate: z.object({
    maximumAllowedAmount: z.number().int().positive().optional(),
    minimumAllowedAmount: z.number().int().positive().optional(),
    lockinPeriod: z.number().int().positive().optional(),
    category: z.string().min(1).max(50).optional(),
    dailyReturn: z.number().optional(),
    isPopular: z.boolean().optional(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const delete__MiningProfileSchema = z.object({
  identifier: z.object({
    id: z.string().length(10),
  }),
});

export {
  create__MiningProfileSchema,
  read__AllMiningProfilesSchema,
  update__MiningProfileSchema,
  delete__MiningProfileSchema,
};
