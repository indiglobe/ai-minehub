import z from "zod";

export const create__RatingSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  associatedUser: z.string(),
  ratingStar: z.number().optional(),
});

export const read__AllRatingsSchema = z
  .object({
    identifier: z
      .object({
        ratingStar: z.number().optional(),
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
        user: z.boolean().optional(),
      })
      .optional(),
  })
  .optional();

export const read__OneRatingSchema = z.object({
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
      userDetails: z.boolean(),
    })
    .optional(),
});

export const read__RatingStatsSchema = z.object({
  joinOptions: z
    .object({
      userDetails: z.boolean(),
      ratingDetails: z.boolean(),
    })
    .optional(),
});

export const update__RatingSchema = z.object({
  identifier: z.union([
    z.object({
      associatedUser: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
  dataToUpdate: z.object({
    ratingStar: z.number().optional(),
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const delete__RatingSchema = z.object({
  identifier: z.union([
    z.object({
      associatedUser: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
  ]),
});
