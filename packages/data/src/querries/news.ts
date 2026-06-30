import { db } from "@/index";
import { NewstTable } from "@/schema";
import { id } from "@repo/utils/id";
import { and, desc, eq, gte, lte, SQL } from "drizzle-orm";

/**
 * ==========================================
 * NEWS MODULE
 * ==========================================
 * Provides full CRUD operations for NewstTable.
 * ==========================================
 */

/**
 * News record type.
 */
export type TNews = typeof NewstTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

/**
 * Type used for creating a news record.
 */
export type TCreate__News = Omit<
  typeof NewstTable.$inferInsert,
  "tableIdentifierToken"
>;

/**
 * Create a new news record in the database.
 *
 * After insertion, it fetches and returns the created news record.
 *
 * @param data - News payload excluding system-generated fields
 * @returns The newly created news record
 */
export const create__News = async (data: TCreate__News) => {
  const generatedId = data.id ?? id();

  await db.insert(NewstTable).values({ ...data, id: generatedId });

  return await read__OneNews({
    identifier: {
      id: generatedId,
    },
  });
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

/**
 * Options for reading multiple news records.
 */
export type TRead__AllNews = {
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
export const read__AllNews = async (options?: TRead__AllNews) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.fromDate) {
    conditions.push(gte(NewstTable.effectiveDate, options.identifier.fromDate));
  }

  if (options?.identifier?.toDate) {
    conditions.push(lte(NewstTable.effectiveDate, options.identifier.toDate));
  }

  return await db.query.NewstTable.findMany({
    limit,
    offset: skip,
    where: and(...conditions),
    orderBy: [desc(NewstTable.effectiveDate)],
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

/**
 * Options for fetching a single news record.
 */
export type TRead__OneNews = {
  identifier: {
    id: (typeof NewstTable.$inferSelect)["id"];
  };
};

/**
 * Fetch a single news record by its ID.
 *
 * @param options.identifier.id - Unique news ID
 * @returns News record if found, otherwise null
 */
export const read__OneNews = async (options: TRead__OneNews) => {
  const queryResult = await db.query.NewstTable.findFirst({
    where: eq(NewstTable.id, options.identifier.id),
  });

  return queryResult ? queryResult : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

/**
 * Options for updating a news record.
 */
export type TUpdate__News = {
  identifier: {
    id: (typeof NewstTable.$inferSelect)["id"];
  };

  dataToUpdate: Partial<
    Omit<typeof NewstTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

/**
 * Update an existing news record.
 *
 * Only provided fields are updated. Undefined values are ignored.
 *
 * @param options.identifier.id - News ID
 * @param options.dataToUpdate - Fields to update
 * @returns Updated news record or null if no update occurred
 */
export const update__News = async (options: TUpdate__News) => {
  const filteredData = Object.fromEntries(
    Object.entries(options.dataToUpdate).filter(
      ([, value]) => value !== undefined,
    ),
  ) as typeof options.dataToUpdate;

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(NewstTable)
    .set(filteredData)
    .where(eq(NewstTable.id, options.identifier.id));

  return await read__OneNews({
    identifier: options.identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

/**
 * Options for deleting a news record.
 */
export type TDelete__News = {
  identifier: {
    id: (typeof NewstTable.$inferSelect)["id"];
  };
};

/**
 * Delete a news record after verifying existence.
 *
 * @param options.identifier.id - News ID
 * @returns Deleted news record if it existed, otherwise null
 */
export const delete__News = async (options: TDelete__News) => {
  const existing = await read__OneNews({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  await db.delete(NewstTable).where(eq(NewstTable.id, options.identifier.id));

  return existing;
};
