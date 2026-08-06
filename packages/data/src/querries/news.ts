import { db } from "@/index";
import { NewsTable } from "@/schema";
import { id } from "@repo/utils/id";
import { and, desc, eq, gte, lte, SQL } from "drizzle-orm";

/**
 * ==========================================
 * NEWS MODULE
 * ==========================================
 * Provides full CRUD operations for NewsTable.
 * ==========================================
 */

/**
 * News record type.
 */
export type TNews = typeof NewsTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

/**
 * Type used for creating a news record.
 */
type TCreate__News = Omit<
  typeof NewsTable.$inferInsert,
  "tableIdentifierToken" | "createdAt" | "updatedAt"
>;

/**
 * Create a new news record in the database.
 *
 * After insertion, it fetches and returns the created news record.
 *
 * @param data - News payload excluding system-generated fields
 * @returns The newly created news record
 */
const create__News = async (data: TCreate__News) => {
  const generatedId = data.id ?? id();

  await db.insert(NewsTable).values({ ...data, id: generatedId });

  return (await read__OneNews({
    identifier: {
      id: generatedId,
    },
  }))!;
};

/**
 * ==========================================
 * READ (ALL)
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
    conditions.push(gte(NewsTable.effectiveDate, options.identifier.fromDate));
  }

  if (options?.identifier?.toDate) {
    conditions.push(lte(NewsTable.effectiveDate, options.identifier.toDate));
  }

  return await db.query.NewsTable.findMany({
    limit,
    offset: skip,
    where: and(...conditions),
    orderBy: [desc(NewsTable.effectiveDate)],
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
type TRead__OneNews = {
  identifier: {
    id: (typeof NewsTable.$inferSelect)["id"];
  };
};

/**
 * Fetch a single news record by its ID.
 *
 * @param options.identifier.id - Unique news ID
 * @returns News record if found, otherwise null
 */
const read__OneNews = async (options: TRead__OneNews) => {
  const queryResult = await db.query.NewsTable.findFirst({
    where: eq(NewsTable.id, options.identifier.id),
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
type TUpdate__News = {
  identifier: {
    id: (typeof NewsTable.$inferSelect)["id"];
  };

  dataToUpdate: Partial<
    Omit<typeof NewsTable.$inferInsert, "tableIdentifierToken" | "id">
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
const update__News = async (options: TUpdate__News) => {
  const filteredData = Object.fromEntries(
    Object.entries(options.dataToUpdate).filter(
      ([, value]) => value !== undefined,
    ),
  ) as typeof options.dataToUpdate;

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(NewsTable)
    .set(filteredData)
    .where(eq(NewsTable.id, options.identifier.id));

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
type TDelete__News = {
  identifier: {
    id: (typeof NewsTable.$inferSelect)["id"];
  };
};

/**
 * Delete a news record after verifying existence.
 *
 * @param options.identifier.id - News ID
 * @returns Deleted news record if it existed, otherwise null
 */
const delete__News = async (options: TDelete__News) => {
  const existing = await read__OneNews({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  await db.delete(NewsTable).where(eq(NewsTable.id, options.identifier.id));

  return existing;
};

export type {
  TCreate__News,
  TRead__AllNews,
  TRead__OneNews,
  TUpdate__News,
  TDelete__News,
};

export {
  create__News,
  read__AllNews,
  read__OneNews,
  update__News,
  delete__News,
};
