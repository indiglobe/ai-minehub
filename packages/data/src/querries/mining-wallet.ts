import { db } from "@/index";
import { MiningWalletTable } from "@/schema";
import { and, desc, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * MINING WALLET MODULE
 * ==========================================
 * Provides full CRUD operations for MiningWalletTable.
 * Supports:
 * - Create mining wallet
 * - Read all mining wallets (pagination + optional joins)
 * - Read single mining wallet (by id or associatedUser)
 * - Update mining wallet
 * - Delete mining wallet
 * ==========================================
 */

/**
 * Type representing a Mining Wallet record.
 */
export type TMiningWallet = typeof MiningWalletTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

export type TCreate__MiningWallet = Omit<
  typeof MiningWalletTable.$inferInsert,
  "tableIdentifierToken"
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
export const create__MiningWallet = async (data: TCreate__MiningWallet) => {
  await db.insert(MiningWalletTable).values(data);

  return await read__OneMiningWallet({
    identifier: {
      associatedUser: data.associatedUser,
    },
  });
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

export type TRead__AllMiningWallets = {
  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: {
    userDetails: boolean;
  };
};

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

export const read__AllMiningWallets = async (
  options?: TRead__AllMiningWallets,
) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  return await db.query.MiningWalletTable.findMany({
    limit,
    offset: skip,
    where: conditions.length > 0 ? and(...conditions) : undefined,
    orderBy: [desc(MiningWalletTable.createdAt)],
    with: {
      ...(options?.joinOptions?.userDetails ? { userDetails: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

export type TRead__OneMiningWallet = {
  identifier:
    | {
        id: (typeof MiningWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
      };

  joinOptions?: {
    userDetails: boolean;
  };
};

/**
 * Fetch a single mining wallet record from the database.
 *
 * Supports lookup by either:
 * - id
 * - associatedUser
 *
 * Optionally includes related user details.
 *
 * @param options.identifier - Unique identifier for the mining wallet
 * @param options.joinOptions.userDetails - Include related user data
 * @returns Mining wallet record if found, otherwise null
 */

export const read__OneMiningWallet = async (
  options: TRead__OneMiningWallet,
) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("id" in identifier) {
    conditions.push(eq(MiningWalletTable.id, identifier.id));
  }

  if ("associatedUser" in identifier) {
    conditions.push(
      eq(MiningWalletTable.associatedUser, identifier.associatedUser),
    );
  }

  const queryResult = await db.query.MiningWalletTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options?.joinOptions?.userDetails ? { userDetails: true } : {}),
    },
  });

  return queryResult ? queryResult : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

export type TUpdate__MiningWallet = {
  identifier:
    | {
        id: (typeof MiningWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof MiningWalletTable.$inferInsert,
      "associatedUser" | "tableIdentifierToken"
    >
  >;
};

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

export const update__MiningWallet = async (options: TUpdate__MiningWallet) => {
  const { identifier, dataToUpdate } = options;

  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
  ) as typeof dataToUpdate;

  const conditions: SQL[] = [];

  if ("id" in identifier) {
    conditions.push(eq(MiningWalletTable.id, identifier.id));
  }

  if ("associatedUser" in identifier) {
    conditions.push(
      eq(MiningWalletTable.associatedUser, identifier.associatedUser),
    );
  }

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(MiningWalletTable)
    .set(filteredData)
    .where(and(...conditions));

  return await read__OneMiningWallet({
    identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

export type TDelete__MiningWallet = {
  identifier:
    | {
        id: (typeof MiningWalletTable.$inferSelect)["id"];
      }
    | {
        associatedUser: (typeof MiningWalletTable.$inferSelect)["associatedUser"];
      };
};

/**
 * Delete a mining wallet record from the database.
 *
 * First checks if the record exists before deletion.
 * Supports lookup by either id or associatedUser.
 *
 * @param options.identifier - Unique identifier for the mining wallet
 * @returns The deleted mining wallet record if it existed, otherwise null
 */

export const delete__MiningWallet = async (options: TDelete__MiningWallet) => {
  const existing = await read__OneMiningWallet({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(MiningWalletTable.id, options.identifier.id));
  }

  if ("associatedUser" in options.identifier) {
    conditions.push(
      eq(MiningWalletTable.associatedUser, options.identifier.associatedUser),
    );
  }

  await db.delete(MiningWalletTable).where(and(...conditions));

  return existing;
};
