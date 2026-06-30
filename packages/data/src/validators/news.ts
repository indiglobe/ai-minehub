import z from "zod";

export const create__NewsSchema = z.object({
  id: z.string().optional(),
  effectiveDate: z.date(),
  heading: z.string(),
  details: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const read__AllNewsSchema = z
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

export const read__OneNewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});

export const update__NewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
  dataToUpdate: z.object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    effectiveDate: z.date().optional(),
    heading: z.string().optional(),
    details: z.string().optional(),
  }),
});

export const delete__NewsSchema = z.object({
  identifier: z.object({
    id: z.string(),
  }),
});
