import { db } from "@/index";
import { Table__Rating, Table__User } from "@/schema";
import { and, count, eq, getTableColumns, SQL } from "drizzle-orm";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * READ (ALL)
 * ==========================================
 * ==========================================
 * ==========================================
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

export { read__AllRatings, read__RatingStats };
