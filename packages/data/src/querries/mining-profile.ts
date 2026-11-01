import { db } from "@/index";
import { Table__MiningProfile } from "@/schema";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * CREATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TCreate__MiningProfile = {
  dataToInsert: Omit<
    typeof Table__MiningProfile.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__MiningProfile = async (options: TCreate__MiningProfile) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__MiningProfile)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__MiningProfile`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedMiningProfile] = await db
      .select()
      .from(Table__MiningProfile)
      .where(eq(Table__MiningProfile.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedMiningProfile!;
  }

  throw Error("Unexpected block in create__MiningProfile");
};

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

type TRead__AllMiningProfiles = {
  identifier?: Partial<{
    isPopular: boolean;
  }>;

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllMiningProfiles = async (options?: TRead__AllMiningProfiles) => {
  /**
   * Pagination Setup
   * Extract skip and limit parameters with fallback defaults for safe querying.
   */
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  /**
   * Condition Filters Builder
   * Initialize an array to hold dynamic SQL WHERE clauses based on identifiers.
   */
  const conditions: SQL[] = [];

  /**
   * Filter condition by profile popularity if specified.
   */
  if (
    options?.identifier?.isPopular &&
    typeof options.identifier.isPopular === "boolean"
  ) {
    conditions.push(
      eq(Table__MiningProfile.isPopular, options.identifier.isPopular),
    );
  }

  /**
   * 8. Base Query Initialization
   * Setup the core `db.select()` statement with pagination limits and offsets.
   */
  const baseQuery = db
    .select()
    .from(Table__MiningProfile)
    .limit(limit)
    .offset(skip);

  /**
   * Apply WHERE Conditions
   * Append conditions to the query if any identifier filters were provided.
   */
  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  /**
   * Query Execution & Return
   * Execute the constructed query against the database and return the result.
   */
  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllMiningProfiles`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const miningProfiles = queryOperationResult;

  return miningProfiles;
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * UPDATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TUpdate__MiningProfile = {
  identifier: {
    id: (typeof Table__MiningProfile.$inferSelect)["id"];
  };

  dataToUpdate: Partial<
    Omit<
      typeof Table__MiningProfile.$inferInsert,
      "tableIdentifierToken" | "createdAt" | "updatedAt" | "id"
    >
  >;
};

const update__MiningProfile = async (options: TUpdate__MiningProfile) => {
  const conditions: SQL[] = [];

  conditions.push(eq(Table__MiningProfile.id, options.identifier.id));

  const baseQuery = db
    .update(Table__MiningProfile)
    .set({ ...options.dataToUpdate })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__MiningProfile`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [updatedMiningProfile] = await db
      .select()
      .from(Table__MiningProfile)
      .where(and(...conditions))
      .limit(1)
      .offset(0);

    return updatedMiningProfile!;
  }

  throw Error("Unexpected block in update__MiningProfile");
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * DELETE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TDelete__MiningProfile = {
  identifier: {
    id: (typeof Table__MiningProfile.$inferSelect)["id"];
  };
};

const delete__MiningProfile = async (options: TDelete__MiningProfile) => {
  const conditions: SQL[] = [];

  conditions.push(eq(Table__MiningProfile.id, options.identifier.id));

  const baseQuery = db.delete(Table__MiningProfile).where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in delete__MiningProfile`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    return {
      id: options.identifier.id,
      deleted: true,
    };
  }

  throw Error("Unexpected block in delete__MiningProfile");
};

export {
  read__AllMiningProfiles,
  update__MiningProfile,
  delete__MiningProfile,
  create__MiningProfile,
};
