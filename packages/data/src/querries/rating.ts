import { db } from "@/index";
import { RatingTable, UserTable } from "@/schema";
import { and, count, eq, getTableColumns, sql, SQL } from "drizzle-orm";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllRatings = {
  identifier?: {
    ratingStar?: (typeof RatingTable.$inferSelect)["ratingStar"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joiningOptions?: Partial<{
    user: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof RatingTable.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof UserTable.$inferSelect, true>>;
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
 * @param options.joiningOptions.user - Include related user data
 * @returns Array of rating records
 */
const read__AllRatings = async (options?: TRead__AllRatings) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const ratingColumns = getTableColumns(RatingTable);
  const userColumns = getTableColumns(UserTable);

  const conditions: SQL[] = [];

  if (options?.identifier?.ratingStar) {
    conditions.push(eq(RatingTable.ratingStar, options.identifier.ratingStar));
  }

  const filteredRatingFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in ratingColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => [
            key,
            ratingColumns[key as keyof typeof ratingColumns],
          ]),
      ) as typeof ratingColumns)
    : ratingColumns;

  const filteredUsersFields =
    options?.joiningOptions?.user && options.selectedFields?.user
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.user)
            .filter(
              ([key, value]) =>
                key in userColumns && typeof value === "boolean" && value,
            )
            .map(([key]) => [
              key,
              userColumns[key as keyof typeof userColumns],
            ]),
        ) as typeof userColumns)
      : options?.joiningOptions?.user && !options.selectedFields
        ? userColumns
        : undefined;

  const selectedQueryFields = {
    ...filteredRatingFields,

    ...(filteredUsersFields && options?.joiningOptions?.user
      ? {
          user: {
            ...filteredUsersFields,
          },
        }
      : {}),
  };

  const baseQuery = db
    .select(selectedQueryFields)
    .from(RatingTable)
    .limit(limit)
    .offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  if (options?.joiningOptions?.user) {
    baseQuery.leftJoin(UserTable, eq(UserTable.id, RatingTable.associatedUser));
  }

  const dbResponse = await baseQuery;

  return dbResponse;
};

type TRead__RatingStats = Partial<{
  selectedFields?: Partial<{
    user: Partial<Record<keyof typeof UserTable.$inferSelect, true>>;
    rating: Partial<Record<keyof typeof RatingTable.$inferSelect, true>>;
  }>;
}>;

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
const read__RatingStats = async (options?: TRead__RatingStats) => {
  const ratingColumns = getTableColumns(RatingTable);
  const userColumns = getTableColumns(UserTable);

  const targetUserFields = options?.selectedFields?.user
    ? Object.entries(options?.selectedFields.user)
        .filter(
          ([key, value]) =>
            key in userColumns && typeof value === "boolean" && value,
        )
        .map(([key]) => key)
    : [];

  const userJsonObjectArgs: SQL[] = [];
  if (targetUserFields.length > 0) {
    for (const key of targetUserFields) {
      const column = userColumns[key as keyof typeof userColumns];
      userJsonObjectArgs.push(sql`${key}`);
      userJsonObjectArgs.push(sql`${column}`);
    }
  }

  const targetRatingFields = options?.selectedFields?.rating
    ? Object.entries(options?.selectedFields.rating)
        .filter(
          ([key, value]) =>
            key in ratingColumns && typeof value === "boolean" && value,
        )
        .map(([key]) => key)
    : [];

  const ratingJsonObjectArgs: SQL[] = [];
  if (targetRatingFields.length > 0) {
    for (const key of targetRatingFields) {
      const column = ratingColumns[key as keyof typeof ratingColumns];
      ratingJsonObjectArgs.push(sql`${key}`);
      ratingJsonObjectArgs.push(sql`${column}`);
    }
  }

  const filteredSelectedFields = {
    ...(options?.selectedFields?.user
      ? {
          users:
            userJsonObjectArgs.length > 0
              ? sql<
                  (typeof userColumns)[]
                >`COALESCE(JSON_ARRAYAGG(JSON_OBJECT(${sql.join(userJsonObjectArgs, sql`, `)})), JSON_ARRAY())`
              : sql<(typeof userColumns)[]>`JSON_ARRAY()`,
        }
      : {}),
    ...(options?.selectedFields?.rating
      ? {
          ratings:
            ratingJsonObjectArgs.length > 0
              ? sql<
                  (typeof RatingTable.$inferSelect)[]
                >`COALESCE(JSON_ARRAYAGG(JSON_OBJECT(${sql.join(ratingJsonObjectArgs, sql`, `)})), JSON_ARRAY())`
              : sql<(typeof RatingTable.$inferSelect)[]>`JSON_ARRAY()`,
        }
      : {}),
  };

  const dbResponse = await db
    .select({
      ratingStarType: RatingTable.ratingStar,
      total: count(RatingTable.id),
      ...filteredSelectedFields,
    })
    .from(RatingTable)
    .innerJoin(UserTable, eq(userColumns.id, ratingColumns.associatedUser))
    .groupBy(RatingTable.ratingStar)
    .orderBy(RatingTable.ratingStar);

  return dbResponse;
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

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
 * ==========================================
 * CREATE
 * ==========================================
 */

/**
 * Type used for creating a rating.
 */
// type TCreate__Rating = Omit<
//   typeof RatingTable.$inferInsert,
//   "tableIdentifierToken" | "updatedAt" | "createdAt"
// >;

/**
 * Create a new rating record in the database.
 *
 * After insertion, it fetches and returns the created rating
 * using the associated user as the lookup key.
 *
 * @param data - Rating payload excluding system-generated fields
 * @returns The newly created rating record
 */
// const create__Rating = async (data: TCreate__Rating) => {
//   await db.insert(RatingTable).values(data);

//   return (await read__OneRating({
//     identifier: {
//       associatedUser: data.associatedUser,
//     },
//   }))!;
// };

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

// type TRead__OneRating = {
//   identifier:
//     | {
//         associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof RatingTable.$inferSelect)["id"];
//       };

//   joinOptions?: Partial<{
//     user: true;
//   }>;
// };

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
// const read__OneRating = async (options: TRead__OneRating) => {
//   const { identifier } = options;

//   const conditions: SQL[] = [];

//   if ("associatedUser" in identifier) {
//     conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(RatingTable.id, identifier.id));
//   }

//   const queryResult = await db.query.RatingTable.findFirst({
//     where: and(...conditions),
//     with: {
//       ...(options?.joinOptions?.user ? { user: true } : {}),
//     },
//   });

//   return queryResult ? queryResult : null;
// };

/**
 * ==========================================
 * READ (STATS)
 * ==========================================
 */

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

// type TUpdate__Rating = {
//   identifier:
//     | {
//         associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof RatingTable.$inferSelect)["id"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof RatingTable.$inferInsert,
//       "associatedUser" | "tableIdentifierToken" | "id"
//     >
//   >;
// };

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
// const update__Rating = async (options: TUpdate__Rating) => {
//   const { identifier, dataToUpdate } = options;

//   const filteredData = Object.fromEntries(
//     Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
//   ) as typeof dataToUpdate;

//   const conditions: SQL[] = [];

//   if ("associatedUser" in identifier) {
//     conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(RatingTable.id, identifier.id));
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(RatingTable)
//     .set(filteredData)
//     .where(and(...conditions));

//   return await read__OneRating({
//     identifier,
//   });
// };

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

// type TDelete__Rating = {
//   identifier:
//     | {
//         associatedUser: (typeof RatingTable.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof RatingTable.$inferSelect)["id"];
//       };
// };

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
// const delete__Rating = async ({ identifier }: TDelete__Rating) => {
//   const existingRating = await read__OneRating({
//     identifier,
//   });

//   if (!existingRating) {
//     return null;
//   }

//   const conditions: SQL[] = [];

//   if ("associatedUser" in identifier) {
//     conditions.push(eq(RatingTable.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(RatingTable.id, identifier.id));
//   }

//   await db.delete(RatingTable).where(and(...conditions));

//   return existingRating;
// };

export {
  // create__Rating,
  read__AllRatings,
  // read__OneRating,
  read__RatingStats,
  // update__Rating,
  // delete__Rating,
};
