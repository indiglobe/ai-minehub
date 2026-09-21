/**
 * ⚠️ WARNING: ENTERING THE FORBIDDEN REALM OF DRIZZLE.
 *
 * This query is significantly more complicated than it has any right to be.
 * If you're reading this, congratulations — you have made it this far.
 *
 * Do not assume that you will understand this query immediately.
 * I certainly didn't.
 * I wrote it.
 * I stared at it for several hours.
 * I questioned several of my life choices.
 * I eventually got it working.
 *
 * At some point, I understood exactly what every join, subquery, condition,
 * and deeply questionable piece of SQL wizardry was doing.
 *
 * That understanding has since left my body.
 *
 * If you're planning to modify this query, please take a moment to ask yourself:
 * "Do I really need to do this?"
 *
 * If the answer is yes, may God have mercy on both of us.
 *
 * Also, future me:
 * If you're reading this and thinking,
 * "What the hell was I thinking when I wrote this?"
 * The answer is: I don't know.
 *
 * Good luck.
 * May your types be inferred, your joins be correct,
 * and your query planner show mercy.
 */

import { db } from "@/index";
import { MiningOrderTable, MiningProfileTable } from "@/schema";
import { and, eq, getTableColumns, sql, SQL } from "drizzle-orm";

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

  joiningOptions?: Partial<{
    orders: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof MiningProfileTable.$inferSelect, true>
  > &
    Partial<{
      orders: Partial<Record<keyof typeof MiningOrderTable.$inferSelect, true>>;
    }>;
};

const read__AllMiningProfiles = async (options?: TRead__AllMiningProfiles) => {
  /**
   * 1. Pagination Setup
   * Extract skip and limit parameters with fallback defaults for safe querying.
   */
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  /**
   * 2. Schema Column Metadata
   * Retrieve all column definitions for both MiningProfileTable and MiningOrderTable.
   */
  const miningOrderColumns = getTableColumns(MiningOrderTable);
  const miningProfileColumns = getTableColumns(MiningProfileTable);

  /**
   * 3. Condition Filters Builder
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
      eq(MiningProfileTable.isPopular, options.identifier.isPopular),
    );
  }

  /**
   * 4. Profile Field Selection Filtering
   * Filter and map only the requested fields for MiningProfileTable to omit unnecessary data.
   */
  const filteredMiningProfileFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in miningProfileColumns &&
              typeof value === "boolean" &&
              value,
          )
          .map(([key]) => [
            key,
            miningProfileColumns[key as keyof typeof miningProfileColumns],
          ]),
      ) as typeof miningProfileColumns)
    : miningProfileColumns;

  /**
   * 5. Order Field Selection Filtering
   * Identify target fields to retrieve from MiningOrderTable if the orders relation is requested.
   */
  const targetOrderFields =
    options?.joiningOptions?.orders && options.selectedFields?.orders
      ? Object.entries(options.selectedFields.orders)
          .filter(
            ([key, value]) =>
              key in miningOrderColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => key)
      : options?.joiningOptions?.orders
        ? Object.keys(miningOrderColumns)
        : [];

  /**
   * 6. JSON Object Mapping Arguments Builder
   * Construct alternating key-value SQL pairs for MySQL's `JSON_OBJECT` aggregation.
   */
  const orderJsonObjectArgs: SQL[] = [];
  if (options?.joiningOptions?.orders && targetOrderFields.length > 0) {
    for (const key of targetOrderFields) {
      const column = miningOrderColumns[key as keyof typeof miningOrderColumns];
      orderJsonObjectArgs.push(sql`${key}`);
      orderJsonObjectArgs.push(sql`${column}`);
    }
  }

  /**
   * 7. Final Query Selection Fields Construction
   * Combine profile fields and JSON-aggregated order fields into the final selection object.
   */
  const selectedQueryFields = {
    ...filteredMiningProfileFields,

    ...(options?.joiningOptions?.orders
      ? {
          orders:
            orderJsonObjectArgs.length > 0
              ? sql<
                  (typeof MiningOrderTable.$inferSelect)[]
                >`COALESCE(JSON_ARRAYAGG(JSON_OBJECT(${sql.join(orderJsonObjectArgs, sql`, `)})), JSON_ARRAY())`
              : sql<(typeof MiningOrderTable.$inferSelect)[]>`JSON_ARRAY()`,
        }
      : {}),
  };

  /**
   * 8. Base Query Initialization
   * Setup the core `db.select()` statement with pagination limits and offsets.
   */
  const baseQuery = db
    .select(selectedQueryFields)
    .from(MiningProfileTable)
    .limit(limit)
    .offset(skip);

  /**
   * 9. Apply WHERE Conditions
   * Append conditions to the query if any identifier filters were provided.
   */
  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  /**
   * 10. Apply Joins and Grouping
   * If orders are requested, execute a LEFT JOIN, group by profile ID to satisfy FULL_GROUP_BY rules,
   * and finalize ordering.
   */
  if (options?.joiningOptions?.orders) {
    baseQuery
      .leftJoin(
        MiningOrderTable,
        eq(MiningOrderTable.miningProfileUsed, MiningProfileTable.id),
      )
      .orderBy()
      .groupBy(MiningProfileTable.id);
  }

  /**
   * 11. Query Execution & Return
   * Execute the constructed query against the database and return the result.
   */
  const queryResult = await baseQuery;

  return queryResult;
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
//   typeof MiningProfileTable.$inferInsert,
//   "tableIdentifierToken" | "updatedAt" | "createdAt"
// >;

// const create__MiningProfile = async (data: TCreate__MiningProfile) => {
//   const generatedId = data.id ?? id();

//   await db.insert(MiningProfileTable).values({ ...data, id: generatedId });

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
//     conditions.push(eq(MiningProfileTable.id, options.identifier.id));
//   }

//   if ("category" in options.identifier) {
//     conditions.push(
//       eq(MiningProfileTable.category, options.identifier.category),
//     );
//   }

//   const profile = await db.query.MiningProfileTable.findFirst({
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
//     Omit<typeof MiningProfileTable.$inferInsert, "tableIdentifierToken" | "id">
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
//     .update(MiningProfileTable)
//     .set(filteredData)
//     .where(eq(MiningProfileTable.id, options.identifier.id));

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
//     .delete(MiningProfileTable)
//     .where(eq(MiningProfileTable.id, options.identifier.id));

//   return existing;
// };

export {
  read__AllMiningProfiles,
  // create__MiningProfile,
  // read__OneMiningProfile,
  // update__MiningProfile,
  // delete__MiningProfile,
};
