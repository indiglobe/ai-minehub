import { db } from "@/index";
import { UserTable } from "@/schema";
import { and, desc, eq, sql, SQL } from "drizzle-orm";

/**
 * ----------------------------------------
 * TYPES
 * ----------------------------------------
 */

export type TUser = typeof UserTable.$inferSelect;

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

type TCreate__User = Omit<
  typeof UserTable.$inferInsert,
  "tableIdentifierToken" | "id" | "createdAt"
>;

/**
 * create user
 */
const create__User = async (data: TCreate__User) => {
  await db.insert(UserTable).values(data);

  return (await read__OneUser({
    identifier: {
      email: data.email,
    },
  }))!;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

type TRead__AllUsers = {
  identifier?: {
    role?: (typeof UserTable.$inferSelect)["role"];
    referrerId?: (typeof UserTable.$inferSelect)["referrerId"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: Partial<{
    tradingWallet: true;
    miningWallet: true;
    rating: true;
    referredBy: true;
    referrals: true;
    miningOrders: true;
    tradingOrders: true;
  }>;
};

/**
 * Fetch multiple user records from the database.
 *
 * Supports filtering by role, pagination, and optional inclusion
 * of related mining wallet, trading wallet, and rating details.
 *
 * @param options.identifier.role - Filter users by role
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @param options.joinOptions.miningWallet - Include mining wallet relation
 * @param options.joinOptions.tradingWalletDetails - Include trading wallet relation
 * @param options.joinOptions.ratingDetails - Include rating relation
 * @returns Array of user records with optional relations
 */

const read__AllUsers = async (options?: TRead__AllUsers) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.role) {
    conditions.push(eq(UserTable.role, options.identifier.role));
  }

  if (options?.identifier?.referrerId) {
    conditions.push(eq(UserTable.referrerId, options.identifier.referrerId));
  }

  const queryResult = db.query.UserTable.findMany({
    limit: limit,
    offset: skip,
    where: and(...conditions),
    orderBy: [desc(UserTable.createdAt)],
    with: {
      ...(options?.joinOptions?.miningWallet ? { miningWallet: true } : {}),
      ...(options?.joinOptions?.rating ? { rating: true } : {}),
      ...(options?.joinOptions?.tradingWallet ? { tradingWallet: true } : {}),
      ...(options?.joinOptions?.miningOrders ? { miningOrders: true } : {}),
      ...(options?.joinOptions?.referrals ? { referrals: true } : {}),
      ...(options?.joinOptions?.referredBy ? { referredBy: true } : {}),
      ...(options?.joinOptions?.tradingOrders ? { tradingOrders: true } : {}),
    },
  });

  return queryResult;
};

/**
 * ----------------------------------------
 * READ (ONE)
 * ----------------------------------------
 */

type TRead__OneUser = {
  identifier:
    | {
        email: (typeof UserTable.$inferSelect)["email"];
      }
    | {
        id: (typeof UserTable.$inferSelect)["id"];
      };

  joinOptions?: Partial<{
    tradingWallet: true;
    miningWallet: true;
    rating: true;
    referredBy: true;
    referrals: true;
    miningOrders: true;
    tradingOrders: true;
  }>;
};

/**
 * Fetch a single user record from the database by email.
 *
 * Optionally includes related mining wallet, trading wallet,
 * and rating details based on join configuration.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @param options.joinOptions.miningWallet - Include mining wallet relation
 * @param options.joinOptions.tradingWalletDetails - Include trading wallet relation
 * @param options.joinOptions.ratingDetails - Include rating relation
 * @returns User record if found, otherwise null
 */

const read__OneUser = async (options: TRead__OneUser) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("email" in identifier) {
    conditions.push(eq(UserTable.email, identifier.email));
  }

  if ("id" in identifier) {
    conditions.push(sql`LOWER(${UserTable.id}) = LOWER(${identifier.id})`);
  }

  const queryResult = await db.query.UserTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options?.joinOptions?.miningWallet ? { miningWallet: true } : {}),
      ...(options?.joinOptions?.rating ? { rating: true } : {}),
      ...(options?.joinOptions?.tradingWallet ? { tradingWallet: true } : {}),
      ...(options?.joinOptions?.miningOrders ? { miningOrders: true } : {}),
      ...(options?.joinOptions?.referrals ? { referrals: true } : {}),
      ...(options?.joinOptions?.referredBy ? { referredBy: true } : {}),
      ...(options?.joinOptions?.tradingOrders ? { tradingOrders: true } : {}),
    },
  });

  return queryResult ? queryResult : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

type TUpdate__User = {
  identifier:
    | {
        email: (typeof UserTable.$inferSelect)["email"];
      }
    | {
        id: (typeof UserTable.$inferSelect)["id"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof UserTable.$inferInsert,
      "email" | "tableIdentifierToken" | "referrerCode" | "id"
    >
  >;
};

/**
 * Update an existing user record in the database.
 *
 * Only provided fields in `dataToUpdate` are updated. Undefined values are ignored.
 * User is identified uniquely by email.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @param options.dataToUpdate - Fields to update in the user record
 * @returns The updated user record if successful, otherwise null
 */

const update__User = async ({ identifier, dataToUpdate }: TUpdate__User) => {
  const filteredData = Object.fromEntries(
    Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
  ) as typeof dataToUpdate;

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  const conditions: SQL[] = [];

  if ("email" in identifier) {
    conditions.push(eq(UserTable.email, identifier.email));
  }

  if ("id" in identifier) {
    conditions.push(eq(UserTable.id, identifier.id));
  }

  await db
    .update(UserTable)
    .set(filteredData)
    .where(and(...conditions));

  return await read__OneUser({
    identifier,
  });
};

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

type TDelete__User = {
  identifier:
    | {
        email: (typeof UserTable.$inferSelect)["email"];
      }
    | {
        id: (typeof UserTable.$inferSelect)["id"];
      };
};

/**
 * Delete a user record from the database.
 *
 * First checks whether the user exists before performing deletion.
 * User is identified uniquely by email.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @returns The deleted user record if it existed, otherwise null
 */

const delete__User = async (options: TDelete__User) => {
  const { identifier } = options;

  const conditions: SQL[] = [];

  if ("email" in identifier) {
    conditions.push(eq(UserTable.email, identifier.email));
  }

  if ("id" in identifier) {
    conditions.push(eq(UserTable.id, identifier.id));
  }

  const existingUser = await read__OneUser({
    identifier,
  });

  if (!existingUser) {
    return null;
  }

  await db.delete(UserTable).where(and(...conditions));

  return existingUser;
};

export type {
  TCreate__User,
  TRead__AllUsers,
  TRead__OneUser,
  TUpdate__User,
  TDelete__User,
};

export {
  create__User,
  read__AllUsers,
  read__OneUser,
  update__User,
  delete__User,
};
