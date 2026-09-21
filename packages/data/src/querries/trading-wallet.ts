import { db } from "@/index";
import { TradingWalletTable, UserTable } from "@/schema";
import { and, eq, getTableColumns, SQL } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
 *
 * ==========================================
 */

/**
 * Type used for creating a trading wallet.
 */
type TCreate__TradingWallet = Omit<
  typeof TradingWalletTable.$inferInsert,
  "tableIdentifierToken" | "id" | "createdAt" | "updatedAt"
>;

/**
 * Insert a new trading wallet into the database.
 * Returns the created wallet by re-fetching it using associatedUser.
 */
const create__TradingWallet = async (data: TCreate__TradingWallet) => {
  await db.insert(TradingWalletTable).values(data);

  return (await read__OneTradingWallet({
    identifier: {
      associatedUserId: data.associatedUser,
    },
  }))!;
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__OneTradingWallet = {
  identifier:
    | {
        id: (typeof TradingWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
      };

  joiningOptions?: Partial<{
    user: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof TradingWalletTable.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof UserTable.$inferSelect, true>>;
    }>;
};

const read__OneTradingWallet = async (options: TRead__OneTradingWallet) => {
  /**
   * 1. Identifier Extraction
   * Destructure the unique identifier passed into the options parameter.
   */
  const { identifier } = options;

  /**
   * 2. Schema Column Metadata
   * Retrieve all column definitions for both TradingWalletTable and UserTable.
   */
  const tradingWalletColumns = getTableColumns(TradingWalletTable);
  const userColumns = getTableColumns(UserTable);

  /**
   * 3. Condition Filters Builder
   * Initialize an array to hold dynamic SQL WHERE clauses based on the provided identifier.
   */
  const conditions: SQL[] = [];

  /**
   * Filter condition by trading wallet ID if specified.
   */
  if ("id" in identifier) {
    conditions.push(eq(TradingWalletTable.id, identifier.id));
  }

  /**
   * Filter condition by associated user ID if specified.
   */
  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(TradingWalletTable.associatedUser, identifier.associatedUserId),
    );
  }

  /**
   * 4. Wallet Field Selection Filtering
   * Filter and map only the requested fields for TradingWalletTable to omit unnecessary data.
   */
  const filteredWalletFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in tradingWalletColumns &&
              typeof value === "boolean" &&
              value,
          )
          .map(([key]) => [
            key,
            tradingWalletColumns[key as keyof typeof tradingWalletColumns],
          ]),
      ) as typeof tradingWalletColumns)
    : tradingWalletColumns;

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
    .from(TradingWalletTable)
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
      .leftJoin(UserTable, eq(UserTable.id, TradingWalletTable.associatedUser))
      .groupBy(TradingWalletTable.id);
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
 * TRADING WALLET MODULE
 * ==========================================
 * Provides full CRUD operations for TradingWalletTable.
 * Supports:
 * - Create trading wallet
 * - Read all trading wallets (pagination + optional joins)
 * - Read single trading wallet (by id or associatedUser)
 * - Update trading wallet
 * - Delete trading wallet
 * ==========================================
 */

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

// type TRead__OneTradingWallet = {
//   identifier:
//     | {
//         id: (typeof TradingWalletTable.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
//       };

//   joinOptions?: Partial<{
//     user: true;
//   }>;
// };

/**
 * Fetch a single trading wallet record from the database.
 *
 * Supports lookup by either:
 * - id
 * - associatedUser
 *
 * Optionally includes related user details.
 *
 * @param options.identifier - Unique identifier for the trading wallet
 * @param options.joinOptions.userDetails - Include related user data
 * @returns Trading wallet record if found, otherwise null
 */

// const read__OneTradingWallet = async (options: TRead__OneTradingWallet) => {
//   const { identifier } = options;

//   const conditions: SQL[] = [];

//   if ("id" in identifier) {
//     conditions.push(eq(TradingWalletTable.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(TradingWalletTable.associatedUser, identifier.associatedUser),
//     );
//   }

//   const queryResult = await db.query.TradingWalletTable.findFirst({
//     where: and(...conditions),
//     with: {
//       ...(options?.joinOptions?.user ? { user: true } : {}),
//     },
//   });

//   return queryResult ? queryResult : null;
// };

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

// type TUpdate__TradingWallet = {
//   identifier:
//     | {
//         id: (typeof TradingWalletTable.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof TradingWalletTable.$inferInsert,
//       "associatedUser" | "tableIdentifierToken" | "id"
//     >
//   >;
// };

/**
 * Update an existing trading wallet record.
 *
 * Only provided fields in `dataToUpdate` are updated. Undefined values are ignored.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the trading wallet
 * @param options.dataToUpdate - Fields to update in the trading wallet
 * @returns The updated trading wallet record if successful, otherwise null
 */

// const update__TradingWallet = async (options: TUpdate__TradingWallet) => {
//   const { identifier, dataToUpdate } = options;

//   const filteredData = Object.fromEntries(
//     Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
//   ) as typeof dataToUpdate;

//   const conditions: SQL[] = [];

//   if ("id" in identifier) {
//     conditions.push(eq(TradingWalletTable.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(TradingWalletTable.associatedUser, identifier.associatedUser),
//     );
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(TradingWalletTable)
//     .set(filteredData)
//     .where(and(...conditions));

//   return await read__OneTradingWallet({
//     identifier,
//   });
// };

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

// type TDelete__TradingWallet = {
//   identifier:
//     | {
//         id: (typeof TradingWalletTable.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
//       };
// };

/**
 * Delete a trading wallet record from the database.
 *
 * First verifies whether the record exists, then deletes it if found.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the trading wallet
 * @returns The deleted trading wallet record if it existed, otherwise null
 */

// const delete__TradingWallet = async (options: TDelete__TradingWallet) => {
//   const existing = await read__OneTradingWallet({
//     identifier: options.identifier,
//   });

//   if (!existing) {
//     return null;
//   }

//   const conditions: SQL[] = [];

//   if ("id" in options.identifier) {
//     conditions.push(eq(TradingWalletTable.id, options.identifier.id));
//   }

//   if ("associatedUser" in options.identifier) {
//     conditions.push(
//       eq(TradingWalletTable.associatedUser, options.identifier.associatedUser),
//     );
//   }

//   await db.delete(TradingWalletTable).where(and(...conditions));

//   return existing;
// };

export {
  create__TradingWallet,
  read__OneTradingWallet,
  // read__OneTradingWallet,
  // update__TradingWallet,
  // delete__TradingWallet,
};
