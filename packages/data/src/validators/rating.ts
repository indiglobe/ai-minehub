import z from "zod";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

const read__AllRatingsSchema = z
  .object({
    identifier: z
      .object({
        ratingStar: z.number().optional(),
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

const read__OneRatingSchema = z.object({
  identifier: z.union([
    z.object({
      associatedUser: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
  joinOptions: z
    .object({
      user: z.literal(true).optional(),
    })
    .optional(),
});

export { read__AllRatingsSchema, read__OneRatingSchema };
