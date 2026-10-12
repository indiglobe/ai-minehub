import { db } from "@/index";
import { Table__MiningProfile } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * READ (ALL)
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
 * CREATE
 * ==========================================
 */

// type TCreate__MiningProfile = Omit<
//   typeof Table__MiningProfile.$inferInsert,
//   "tableIdentifierToken" | "updatedAt" | "createdAt"
// >;

// const create__MiningProfile = async (data: TCreate__MiningProfile) => {
//   const generatedId = data.id ?? id();

//   await db.insert(Table__MiningProfile).values({ ...data, id: generatedId });

//   return (await read__OneMiningProfile({
//     identifier: {
//       id: generatedId,
//     },
//   }))!;
// };

/**
 * ==========================================
 * READ (ALL) - Mining Profiles
 * ==========================================
 *
 * Fetches multiple mining profiles from the database using strict `db.select()` with
 * granular field selection and optional relation aggregation.
 *
 * @param options - Configuration object containing filters, pagination, join options, and selected fields.
 * @returns An array of filtered mining profile records (along with aggregated orders if joined).
 */

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

// type TRead__OneMiningProfile = {
//   identifier:
//     | {
//         id: string;
//       }
//     | {
//         category: string;
//       };

//   joinOptions?: Partial<{
//     orders: true;
//   }>;
// };

// const read__OneMiningProfile = async (options: TRead__OneMiningProfile) => {
//   const conditions: SQL[] = [];

//   if ("id" in options.identifier) {
//     conditions.push(eq(Table__MiningProfile.id, options.identifier.id));
//   }

//   if ("category" in options.identifier) {
//     conditions.push(
//       eq(Table__MiningProfile.category, options.identifier.category),
//     );
//   }

//   const profile = await db.query.Table__MiningProfile.findFirst({
//     where: and(...conditions),
//     with: {
//       ...(options.joinOptions?.orders ? { orders: true } : {}),
//     },
//   });

//   return profile ? profile : null;
// };

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

// type TUpdate__MiningProfile = {
//   identifier: {
//     id: string;
//   };

//   dataToUpdate: Partial<
//     Omit<typeof Table__MiningProfile.$inferInsert, "tableIdentifierToken" | "id">
//   >;
// };

// const update__MiningProfile = async (options: TUpdate__MiningProfile) => {
//   const filteredData = Object.fromEntries(
//     Object.entries(options.dataToUpdate).filter(
//       ([, value]) => value !== undefined,
//     ),
//   );

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(Table__MiningProfile)
//     .set(filteredData)
//     .where(eq(Table__MiningProfile.id, options.identifier.id));

//   return await read__OneMiningProfile({
//     identifier: options.identifier,
//   });
// };

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

// type TDelete__MiningProfile = {
//   identifier: {
//     id: string;
//   };
// };

// const delete__MiningProfile = async (options: TDelete__MiningProfile) => {
//   const existing = await read__OneMiningProfile({
//     identifier: options.identifier,
//   });

//   if (!existing) {
//     return null;
//   }

//   await db
//     .delete(Table__MiningProfile)
//     .where(eq(Table__MiningProfile.id, options.identifier.id));

//   return existing;
// };

export {
  read__AllMiningProfiles,
  // create__MiningProfile,
  // read__OneMiningProfile,
  // update__MiningProfile,
  // delete__MiningProfile,
};
