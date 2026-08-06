import { db } from "@/index";
import { TradingWalletTable } from "@/schema";
import { and, desc, eq, SQL } from "drizzle-orm";

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
 * Type representing a Trading Wallet record.
 */
export type TTradingWallet = typeof TradingWalletTable.$inferSelect;

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
      associatedUser: data.associatedUser,
    },
  }))!;
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllTradingWallets = {
  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: Partial<{
    user: true;
  }>;
};

/**
 * Fetch all trading wallet records from the database.
 *
 * Supports pagination and optional inclusion of related user details.
 * Structure is prepared for future filtering conditions.
 *
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @param options.joinOptions.userDetails - Include related user data
 * @returns Array of trading wallet records
 */

const read__AllTradingWallets = async (options: TRead__AllTradingWallets) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (conditions.length === 0)
    return await db.query.TradingWalletTable.findMany({
      limit,
      offset: skip,
      orderBy: [desc(TradingWalletTable.createdAt)],
      with: {
        ...(options?.joinOptions?.user ? { user: true } : {}),
      },
    });

  return await db.query.TradingWalletTable.findMany({
    limit,
    offset: skip,
    where: and(...conditions),
    orderBy: [desc(TradingWalletTable.createdAt)],
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneTradingWallet = {
  identifier:
    | {
        id: (typeof TradingWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
      };

  joinOptions?: Partial<{
    user: true;
  }>;
};

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

const read__OneTradingWallet = async (options: TRead__OneTradingWallet) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("id" in identifier) {
    conditions.push(eq(TradingWalletTable.id, identifier.id));
  }

  if ("associatedUser" in identifier) {
    conditions.push(
      eq(TradingWalletTable.associatedUser, identifier.associatedUser),
    );
  }

  const queryResult = await db.query.TradingWalletTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
    },
  });

  return queryResult ? queryResult : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

type TUpdate__TradingWallet = {
  identifier:
    | {
        id: (typeof TradingWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof TradingWalletTable.$inferInsert,
      "associatedUser" | "tableIdentifierToken" | "id"
    >
  >;
};

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

const update__TradingWallet = async (options: TUpdate__TradingWallet) => {
  const { identifier, dataToUpdate } = options;

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
  ) as typeof dataToUpdate;

  const conditions: SQL[] = [];

  if ("id" in identifier) {
    conditions.push(eq(TradingWalletTable.id, identifier.id));
  }

  if ("associatedUser" in identifier) {
    conditions.push(
      eq(TradingWalletTable.associatedUser, identifier.associatedUser),
    );
  }

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(TradingWalletTable)
    .set(filteredData)
    .where(and(...conditions));

  return await read__OneTradingWallet({
    identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

type TDelete__TradingWallet = {
  identifier:
    | {
        id: (typeof TradingWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof TradingWalletTable.$inferSelect)["associatedUser"];
      };
};

/**
 * Delete a trading wallet record from the database.
 *
 * First verifies whether the record exists, then deletes it if found.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the trading wallet
 * @returns The deleted trading wallet record if it existed, otherwise null
 */

const delete__TradingWallet = async (options: TDelete__TradingWallet) => {
  const existing = await read__OneTradingWallet({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(TradingWalletTable.id, options.identifier.id));
  }

  if ("associatedUser" in options.identifier) {
    conditions.push(
      eq(TradingWalletTable.associatedUser, options.identifier.associatedUser),
    );
  }

  await db.delete(TradingWalletTable).where(and(...conditions));

  return existing;
};

export {
  create__TradingWallet,
  read__AllTradingWallets,
  read__OneTradingWallet,
  update__TradingWallet,
  delete__TradingWallet,
};

export type {
  TCreate__TradingWallet,
  TRead__AllTradingWallets,
  TRead__OneTradingWallet,
  TUpdate__TradingWallet,
  TDelete__TradingWallet,
};
