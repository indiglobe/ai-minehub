import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__NewsSchema = z.object({
  id: z.string().optional(),
  effectiveDate: z.date(),
  heading: z.string(),
  details: z.string(),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllNewsSchema = z
  .object({
    identifier: z
      .object({
        fromDate: z.date().optional(),
        toDate: z.date().optional(),
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

const read__OneNewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const update__NewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    effectiveDate: z.date().optional(),
    heading: z.string().optional(),
    details: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const delete__NewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

export {
  create__NewsSchema,
  read__AllNewsSchema,
  read__OneNewsSchema,
  update__NewsSchema,
  delete__NewsSchema,
};
