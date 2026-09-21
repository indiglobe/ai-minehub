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
import { MiningWalletTable, UserTable } from "@/schema";
import { and, eq, getTableColumns, SQL } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

/**
 * ====================
 * MINING WALLET MODULE
 * ====================
 * Provides full CRUD operations for MiningWalletTable.
 * Supports:
 * - Create mining wallet
 * - Read all mining wallets (pagination + optional joins)
 * - Read single mining wallet (by id or associatedUser)
 * - Update mining wallet
 * - Delete mining wallet
 * ====================
 */

type TCreate__MiningWallet = Omit<
  typeof MiningWalletTable.$inferInsert,
  "tableIdentifierToken" | "createdAt" | "updatedAt"
>;

/**
 * Create a new mining wallet record in the database.
 *
 * Inserts the provided mining wallet data into the table and then
 * retrieves the created record using the associated user identifier.
 *
 * @param data - Mining wallet data excluding system-generated fields
 * @returns The newly created mining wallet record
 */
const create__MiningWallet = async (data: TCreate__MiningWallet) => {
  await db.insert(MiningWalletTable).values(data);

  return (await read__OneMiningWallet({
    identifier: {
      associatedUserId: data.associatedUser,
    },
  }))!;
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneMiningWallet = {
  identifier:
    | {
        id: (typeof MiningWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
      };

  joiningOptions?: Partial<{
    user: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof MiningWalletTable.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof UserTable.$inferSelect, true>>;
    }>;
};

const read__OneMiningWallet = async (options: TRead__OneMiningWallet) => {
  /**
   * 1. Identifier Extraction
   * Destructure the unique identifier passed into the options parameter.
   */
  const { identifier } = options;

  /**
   * 2. Schema Column Metadata
   * Retrieve all column definitions for both MiningWalletTable and UserTable.
   */
  const miningWalletColumns = getTableColumns(MiningWalletTable);
  const userColumns = getTableColumns(UserTable);

  /**
   * 3. Condition Filters Builder
   * Initialize an array to hold dynamic SQL WHERE clauses based on the provided identifier.
   */
  const conditions: SQL[] = [];

  /**
   * Filter condition by mining wallet ID if specified.
   */
  if ("id" in identifier) {
    conditions.push(eq(MiningWalletTable.id, identifier.id));
  }

  /**
   * Filter condition by associated user ID if specified.
   */
  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(MiningWalletTable.associatedUser, identifier.associatedUserId),
    );
  }

  /**
   * 4. Wallet Field Selection Filtering
   * Filter and map only the requested fields for MiningWalletTable to omit unnecessary data.
   */
  const filteredWalletFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in miningWalletColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => [
            key,
            miningWalletColumns[key as keyof typeof miningWalletColumns],
          ]),
      ) as typeof miningWalletColumns)
    : miningWalletColumns;

  /**
   * 5. User Field Selection Filtering
   * Identify target fields to retrieve from UserTable if the user relation is requested.
   */
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
      : options?.joiningOptions?.user
        ? userColumns
        : undefined;

  /**
   * 7. Final Query Selection Fields Construction
   * Combine wallet fields and JSON-aggregated user fields into the final selection object.
   */
  const selectedQueryFields = {
    ...filteredWalletFields,

    ...(filteredUsersFields && options?.joiningOptions?.user
      ? {
          user: {
            ...filteredUsersFields,
          },
        }
      : {}),
  };

  /**
   * 8. Base Query Initialization
   * Setup the core `db.select()` statement limited to the single record.
   */
  const baseQuery = db
    .select(selectedQueryFields)
    .from(MiningWalletTable)
    .limit(1);

  /**
   * 9. Apply WHERE Conditions
   * Append the identification conditions to the query.
   */
  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  /**
   * 10. Apply Joins and Grouping
   * If the user relation is requested, execute a LEFT JOIN and group by wallet ID to satisfy FULL_GROUP_BY rules.
   */
  if (options?.joiningOptions?.user) {
    baseQuery
      .leftJoin(UserTable, eq(UserTable.id, MiningWalletTable.associatedUser))
      .groupBy(MiningWalletTable.id);
  }

  /**
   * 11. Query Execution & Return
   * Execute the query and return the first matched record or null if not found.
   */
  const [queryResult] = await baseQuery;

  return queryResult ? queryResult : null;
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
 * READ (ALL)
 * ==========================================
 */

// type TRead__AllMiningWallets = {
//   queryOptions?: {
//     skip?: number;
//     limit?: number;
//   };

//   joinOptions?: Partial<{
//     user: true;
//   }>;
// };

/**
 * Fetch all mining wallet records from the database.
 *
 * Supports pagination and optional inclusion of related user details.
 * Currently no filters are applied, but the structure supports future conditions.
 *
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @param options.joinOptions.userDetails - Include related user data
 * @returns Array of mining wallet records
 */

// const read__AllMiningWallets = async (options?: TRead__AllMiningWallets) => {
//   const skip = options?.queryOptions?.skip ?? 0;
//   const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

//   const conditions: SQL[] = [];

//   return await db.query.MiningWalletTable.findMany({
//     limit,
//     offset: skip,
//     where: conditions.length > 0 ? and(...conditions) : undefined,
//     orderBy: [desc(MiningWalletTable.createdAt)],
//     with: {
//       ...(options?.joinOptions?.user ? { user: true } : {}),
//     },
//   });
// };

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

// type TUpdate__MiningWallet = {
//   identifier:
//     | {
//         id: (typeof MiningWalletTable.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof MiningWalletTable.$inferInsert,
//       "associatedUser" | "tableIdentifierToken" | "id"
//     >
//   >;
// };

/**
 * Update an existing mining wallet record.
 *
 * Only provided fields in `dataToUpdate` are updated. Undefined values are ignored.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the mining wallet
 * @param options.dataToUpdate - Fields to update in the mining wallet
 * @returns The updated mining wallet record if successful, otherwise null
 */

// const update__MiningWallet = async (options: TUpdate__MiningWallet) => {
//   const { identifier, dataToUpdate } = options;

//   const filteredData = Object.fromEntries(
//     Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
//   ) as typeof dataToUpdate;

//   const conditions: SQL[] = [];

//   if ("id" in identifier) {
//     conditions.push(eq(MiningWalletTable.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(MiningWalletTable.associatedUser, identifier.associatedUser),
//     );
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(MiningWalletTable)
//     .set(filteredData)
//     .where(and(...conditions));

//   return await read__OneMiningWallet({
//     identifier,
//   });
// };

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

// type TDelete__MiningWallet = {
//   identifier:
//     | {
//         id: (typeof MiningWalletTable.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
//       };
// };

/**
 * Delete a mining wallet record from the database.
 *
 * First checks if the record exists before deletion.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the mining wallet
 * @returns The deleted mining wallet record if it existed, otherwise null
 */

// const delete__MiningWallet = async (options: TDelete__MiningWallet) => {
//   const existing = await read__OneMiningWallet({
//     identifier: options.identifier,
//   });

//   if (!existing) {
//     return null;
//   }

//   const conditions: SQL[] = [];

//   if ("id" in options.identifier) {
//     conditions.push(eq(MiningWalletTable.id, options.identifier.id));
//   }

//   if ("associatedUser" in options.identifier) {
//     conditions.push(
//       eq(MiningWalletTable.associatedUser, options.identifier.associatedUser),
//     );
//   }

//   await db.delete(MiningWalletTable).where(and(...conditions));

//   return existing;
// };

export {
  create__MiningWallet,
  // read__AllMiningWallets,
  read__OneMiningWallet,
  // update__MiningWallet,
  // delete__MiningWallet,
};
