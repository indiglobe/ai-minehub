import { db } from "@/index";
import { Table__News } from "@/schema";
import { and, desc, gte, lte, SQL } from "drizzle-orm";

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

/**
 * Options for reading multiple news records.
 */
type TRead__AllNews = {
  identifier?: {
    fromDate?: Date;
    toDate?: Date;
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

/**
 * Fetch multiple news records from the database.
 *
 * Supports optional filtering by heading and date range,
 * along with pagination.
 *
 * @param options.identifier.fromDate - Start date filter
 * @param options.identifier.toDate - End date filter
 * @param options.queryOptions.skip - Pagination offset
 * @param options.queryOptions.limit - Max records to return
 * @returns Array of news records
 */
const read__AllNews = async (options?: TRead__AllNews) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.fromDate) {
    conditions.push(
      gte(Table__News.effectiveDate, options.identifier.fromDate),
    );
  }

  if (options?.identifier?.toDate) {
    conditions.push(lte(Table__News.effectiveDate, options.identifier.toDate));
  }

  const baseQuery = db
    .select()
    .from(Table__News)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__News.effectiveDate));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const dbResponse = await baseQuery;

  return dbResponse;
};

export { read__AllNews };
