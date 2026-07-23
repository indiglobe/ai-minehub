import { db } from "@/index";
import { RatingTable, UserTable } from "@/schema";
import { and, count, desc, eq, getTableColumns, sql, SQL } from "drizzle-orm";

/**
 * ==========================================
 * RATING MODULE
 * ==========================================
 * Provides full CRUD operations for RatingTable.
 * Supports:
 * - Create rating
 * - Read all ratings (filter + pagination + joins)
 * - Read single rating (by id or associatedUser)
 * - Update rating
 * - Delete rating
 * - Rating statistics aggregation
 * ==========================================
 */

/**
 * Type representing a Rating record.
 */
export type TRating = typeof RatingTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

/**
 * Type used for creating a rating.
 */
export type TCreate__Rating = Omit<
  typeof RatingTable.$inferInsert,
  "tableIdentifierToken"
>;

/**
 * Create a new rating record in the database.
 *
 * After insertion, it fetches and returns the created rating
 * using the associated user as the lookup key.
 *
 * @param data - Rating payload excluding system-generated fields
 * @returns The newly created rating record
 */
export const create__Rating = async (data: TCreate__Rating) => {
  await db.insert(RatingTable).values(data);

  return await read__OneRating({
    identifier: {
      associatedUser: data.associatedUser,
    },
  });
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

export type TRead__AllRatings = {
  identifier?: {
    ratingStar?: (typeof RatingTable.$inferSelect)["ratingStar"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: Partial<{
    user: boolean;
  }>;
};

/**
 * Fetch multiple rating records from the database.
 *
 * Supports optional filtering by rating star, along with pagination
 * and optional inclusion of related user details.
 *
 * @param options.identifier.ratingStar - Filter ratings by star value
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @param options.joinOptions.user - Include related user data
 * @returns Array of rating records
 */
export const read__AllRatings = async (options?: TRead__AllRatings) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.ratingStar) {
    conditions.push(eq(RatingTable.ratingStar, options.identifier.ratingStar));
  }

  return db.query.RatingTable.findMany({
    limit,
    offset: skip,
    where: and(...conditions),
    orderBy: [desc(RatingTable.createdAt)],
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

export type TRead__OneRating = {
  identifier:
    | {
        associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
      }
    | {
        id: (typeof RatingTable.$inferSelect)["id"];
      };

  joinOptions?: Partial<{
    user: boolean;
  }>;
};

/**
 * Fetch a single rating record from the database.
 *
 * Supports lookup by either:
 * - associatedUser
 * - id
 *
 * Optionally includes related user details if requested.
 *
 * @param options.identifier - Unique identifier for the rating record
 * @param options.joinOptions.user - Include related user data
 * @returns The rating record if found, otherwise null
 */
export const read__OneRating = async (options: TRead__OneRating) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("associatedUser" in identifier) {
    conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
  }

  if ("id" in identifier) {
    conditions.push(eq(RatingTable.id, identifier.id));
  }

  const queryResult = await db.query.RatingTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
    },
  });

  return queryResult ? queryResult : null;
};

/**
 * ==========================================
 * READ (STATS)
 * ==========================================
 */

export type TRead__RatingStats = {
  joinOptions?: {
    user: boolean;
    rating: boolean;
  };
};

/**
 * Fetch aggregated rating statistics grouped by rating star.
 *
 * Returns total count per rating star along with optional aggregated
 * JSON details for ratings and related user information.
 *
 * @param options.joinOptions.rating - Include rating record details in response
 * @param options.joinOptions.user - Include related user details in response
 * @returns Array of grouped rating statistics with optional JSON details
 */
export const read__RatingStats = async (options: TRead__RatingStats) => {
  const { joinOptions } = options;

  const ratingTableCol = getTableColumns(RatingTable);
  const userTableCol = getTableColumns(UserTable);

  const details = sql<
    {
      rating?: typeof RatingTable.$inferSelect;
      user?: typeof UserTable.$inferSelect;
    }[]
  >`
    JSON_ARRAYAGG(
      JSON_OBJECT(
        ${
          joinOptions?.rating
            ? sql`
              'rating',
              JSON_OBJECT(
                'id', ${ratingTableCol.id},
                'associatedUser', ${ratingTableCol.associatedUser},
                'ratingStar', ${ratingTableCol.ratingStar},
                'createdAt', ${ratingTableCol.createdAt},
                'updatedAt', ${ratingTableCol.updatedAt},
                'tableIdentifierToken', ${ratingTableCol.tableIdentifierToken}
              ),
            `
            : sql``
        }

        ${
          joinOptions?.user
            ? sql`
              'user',
              JSON_OBJECT(
                'id', ${userTableCol.id},
                'fullName', ${userTableCol.fullName},
                'email', ${userTableCol.email},
                'avatarUrl', ${userTableCol.avatarUrl},
                'phoneNumber', ${userTableCol.phoneNumber},
                'role', ${userTableCol.role},
                'age', ${userTableCol.age},
                'createdAt', ${userTableCol.createdAt},
                'updatedAt', ${userTableCol.updatedAt},
                'tableIdentifierToken', ${userTableCol.tableIdentifierToken}
              )
            `
            : sql``
        }
      )
    )
  `;

  const result = await db
    .select({
      ratingStarType: RatingTable.ratingStar,
      total: count(RatingTable.id),
      details,
    })
    .from(RatingTable)
    .innerJoin(UserTable, eq(userTableCol.id, ratingTableCol.associatedUser))
    .groupBy(RatingTable.ratingStar)
    .orderBy(RatingTable.ratingStar);

  return result;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

export type TUpdate__Rating = {
  identifier:
    | {
        associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
      }
    | {
        id: (typeof RatingTable.$inferSelect)["id"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof RatingTable.$inferInsert,
      "associatedUser" | "tableIdentifierToken"
    >
  >;
};

/**
 * Update an existing rating record.
 *
 * Updates only the fields provided in `dataToUpdate`.
 * Any `undefined` values are filtered out before executing the update.
 *
 * If no valid fields are provided, the function returns `null` and no query is executed.
 *
 * After updating, the updated record is re-fetched and returned.
 *
 * @param options.identifier - Unique identifier used to locate the rating
 * (either `id` or `associatedUser`)
 * @param options.dataToUpdate - Partial rating fields to update
 * @returns The updated rating record, or `null` if nothing was updated
 */
export const update__Rating = async (options: TUpdate__Rating) => {
  const { identifier, dataToUpdate } = options;

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
  ) as typeof dataToUpdate;

  const conditions: SQL[] = [];

  if ("associatedUser" in identifier) {
    conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
  }

  if ("id" in identifier) {
    conditions.push(eq(RatingTable.id, identifier.id));
  }

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(RatingTable)
    .set(filteredData)
    .where(and(...conditions));

  return await read__OneRating({
    identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

export type TDelete__Rating = {
  identifier:
    | {
        associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
      }
    | {
        id: (typeof RatingTable.$inferSelect)["id"];
      };
};

/**
 * Delete a rating after verifying it exists.
 *
 * First checks if the rating exists using the provided identifier.
 * If found, deletes the record from the database and returns the
 * previously existing rating data.
 *
 * @param options.identifier - Unique identifier used to locate the rating
 * (either `id` or `associatedUser`)
 * @returns The deleted rating record if it existed, otherwise `null`
 */
export const delete__Rating = async ({ identifier }: TDelete__Rating) => {
  const existingRating = await read__OneRating({
    identifier,
  });

  if (!existingRating) {
    return null;
  }

  const conditions: SQL[] = [];

  if ("associatedUser" in identifier) {
    conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
  }

  if ("id" in identifier) {
    conditions.push(eq(RatingTable.id, identifier.id));
  }

  await db.delete(RatingTable).where(and(...conditions));

  return existingRating;
};
