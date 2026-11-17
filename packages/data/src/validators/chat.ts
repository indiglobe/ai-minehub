import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const create__ChatSchema = z.object({
  dataToInsert: z.object({
    message: z.string(),
    senderId: z.string(),
    reciverId: z.string().nullish(),
  }),
});

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllChatsSchema = z.object({
  identifier: z.object({
    involvedUser: z.union([z.string(), z.array(z.string())]).optional(),
  }),
  queryOptions: z
    .object({
      skip: z.number().optional(),
      limit: z.number().optional(),
    })
    .optional(),
});

export { create__ChatSchema, read__AllChatsSchema };
