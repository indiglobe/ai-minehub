import { db } from "@/index";
import { Table__Rating, Table__User } from "@/schema";
import { and, count, eq, getTableColumns, SQL } from "drizzle-orm";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllRatings = {
  identifier?: {
    ratingStar?: (typeof Table__Rating.$inferSelect)["ratingStar"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
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

  const conditions: SQL[] = [];

  if (options?.identifier?.ratingStar) {
    conditions.push(
      eq(Table__Rating.ratingStar, options.identifier.ratingStar),
    );
  }

  const baseQuery = db.select().from(Table__Rating).limit(limit).offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const dbResponse = await baseQuery;

  return dbResponse;
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
const read__RatingStats = async () => {
  const ratingColumns = getTableColumns(Table__Rating);
  const userColumns = getTableColumns(Table__User);

  const dbResponse = await db
    .select({
      ratingStarType: Table__Rating.ratingStar,
      total: count(Table__Rating.id),
    })
    .from(Table__Rating)
    .innerJoin(Table__User, eq(userColumns.id, ratingColumns.associatedUser))
    .groupBy(Table__Rating.ratingStar)
    .orderBy(Table__Rating.ratingStar);

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
 * Provides full CRUD operations for Table__Rating.
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
//   typeof Table__Rating.$inferInsert,
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
//   await db.insert(Table__Rating).values(data);

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
//         associatedUser: (typeof Table__Rating.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof Table__Rating.$inferSelect)["id"];
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
//     conditions.push(eq(Table__Rating.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(Table__Rating.id, identifier.id));
//   }

//   const queryResult = await db.query.Table__Rating.findFirst({
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
//         associatedUser: (typeof Table__Rating.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof Table__Rating.$inferSelect)["id"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof Table__Rating.$inferInsert,
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
//     conditions.push(eq(Table__Rating.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(Table__Rating.id, identifier.id));
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(Table__Rating)
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
//         associatedUser: (typeof Table__Rating.$inferSelect)["associatedUser"];
//       }
//     | {
//         id: (typeof Table__Rating.$inferSelect)["id"];
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
//     conditions.push(eq(Table__Rating.associatedUser, identifier.associatedUser));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(Table__Rating.id, identifier.id));
//   }

//   await db.delete(Table__Rating).where(and(...conditions));

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
