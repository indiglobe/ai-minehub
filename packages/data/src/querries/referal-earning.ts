import { Table__ReferalEarning } from "@/schema";
import { and, eq, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

type TRead__AllReferalEarning = {
  identifier?: {
    userId: (typeof Table__ReferalEarning.$inferSelect)["earnerId"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

/**
 * Fetch multiple user records from the database.
 *
 * Supports filtering by role, pagination, and optional inclusion
 * of related mining wallet, trading wallet, and rating details.
 *
 * @param options.identifier.role - Filter users by role
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @returns Array of user records with optional relations
 */

const read__AllReferalEarning = async (options?: TRead__AllReferalEarning) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier) {
    if ("userId" in options.identifier) {
      conditions.push(
        eq(Table__ReferalEarning.earnerId, options.identifier.userId),
      );
    }
  }

  const baseQuery = db
    .select()
    .from(Table__ReferalEarning)
    .limit(limit)
    .offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllReferalEarning`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const allReferalEarning = queryOperationResult;

  return allReferalEarning;
};

export { read__AllReferalEarning };
