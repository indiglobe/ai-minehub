import { db } from "@/index";
import { Table__TradingWallet, Table__User } from "@/schema";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
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
type TCreate__TradingWallet = {
  dataToInsert: Omit<
    typeof Table__TradingWallet.$inferInsert,
    "tableIdentifierToken" | "id" | "createdAt" | "updatedAt"
  >;
};

/**
 * Insert a new trading wallet into the database.
 * Returns the created wallet by re-fetching it using associatedUser.
 */
const create__TradingWallet = async (options: TCreate__TradingWallet) => {
  const generatedId = id();

  const baseQuery = db
    .insert(Table__TradingWallet)
    .values({ ...options.dataToInsert, id: generatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__MiningWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedTradingwalletFetchingError, fetchedInsertedUsersList] =
      await tryCatch(
        db
          .select()
          .from(Table__TradingWallet)
          .where(eq(Table__TradingWallet.id, generatedId))
          .limit(1)
          .offset(0),
      );

    if (insertedTradingwalletFetchingError) {
      console.error(
        `Error in insertedTradingwalletFetchingError in create__TradingWallet`,
      );
      console.error(insertedTradingwalletFetchingError);
      throw insertedTradingwalletFetchingError;
    }

    const [insertedTradingWallet] = fetchedInsertedUsersList;

    return insertedTradingWallet!;
  }
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__OneTradingWallet = {
  identifier:
    | {
        id: (typeof Table__TradingWallet.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__TradingWallet.$inferSelect)["associatedUser"];
      };
};

const read__OneTradingWallet = async (options: TRead__OneTradingWallet) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("id" in identifier) {
    conditions.push(eq(Table__TradingWallet.id, identifier.id));
  }

  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(Table__TradingWallet.associatedUser, identifier.associatedUserId),
    );
  }

  const baseQuery = db.select().from(Table__TradingWallet).limit(1).offset(0);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__OneTradingWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const [tradingWallet] = queryOperationResult;

  return tradingWallet ? tradingWallet : null;
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
 * Provides full CRUD operations for Table__TradingWallet.
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
//         id: (typeof Table__TradingWallet.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof Table__TradingWallet.$inferSelect)["associatedUser"];
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
//     conditions.push(eq(Table__TradingWallet.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(Table__TradingWallet.associatedUser, identifier.associatedUser),
//     );
//   }

//   const queryResult = await db.query.Table__TradingWallet.findFirst({
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
//         id: (typeof Table__TradingWallet.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof Table__TradingWallet.$inferSelect)["associatedUser"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof Table__TradingWallet.$inferInsert,
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
//     conditions.push(eq(Table__TradingWallet.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(Table__TradingWallet.associatedUser, identifier.associatedUser),
//     );
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(Table__TradingWallet)
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
//         id: (typeof Table__TradingWallet.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof Table__TradingWallet.$inferSelect)["associatedUser"];
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
//     conditions.push(eq(Table__TradingWallet.id, options.identifier.id));
//   }

//   if ("associatedUser" in options.identifier) {
//     conditions.push(
//       eq(Table__TradingWallet.associatedUser, options.identifier.associatedUser),
//     );
//   }

//   await db.delete(Table__TradingWallet).where(and(...conditions));

//   return existing;
// };

export {
  create__TradingWallet,
  read__OneTradingWallet,
  // read__OneTradingWallet,
  // update__TradingWallet,
  // delete__TradingWallet,
};
