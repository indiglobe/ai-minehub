import { db } from "@/index";
import { Table__User } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, getTableColumns, inArray, sql, SQL } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

type TCreate__User = Omit<
  typeof Table__User.$inferInsert,
  "tableIdentifierToken" | "id"
>;

/**
 * create user
 */
const create__User = async (data: TCreate__User) => {
  const baseQuery = db.insert(Table__User).values(data);

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__User`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const {
    "0": { affectedRows },
  } = queryOperationResult;

  if (affectedRows === 1) {
    const [insertedUserFetchingError, fetchedInsertedUsersList] =
      await tryCatch(
        db
          .select()
          .from(Table__User)
          .where(eq(Table__User.email, data.email))
          .limit(1)
          .offset(0),
      );

    if (insertedUserFetchingError) {
      console.error(`Error in insertedUserFetchingError in create__User`);
      console.error(insertedUserFetchingError);
      throw insertedUserFetchingError;
    }

    const [insertedUser] = fetchedInsertedUsersList;

    return insertedUser!;
  }

  throw new Error(`Unexpected block execution in create__User`);
};

/**
 * ----------------------------------------
 * READ (USER COUNT)
 * ----------------------------------------
 */

type TRead__UserCount = Partial<{
  identifier:
    | { role: Pick<typeof Table__User.$inferSelect, "role">["role"] }
    | { roles: Pick<typeof Table__User.$inferSelect, "role">["role"][] };
}>;

const read__UserCount = async (options?: TRead__UserCount) => {
  const conditions: SQL[] = [];

  const baseQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(Table__User);

  if (options?.identifier) {
    if ("role" in options.identifier) {
      conditions.push(eq(Table__User.role, options.identifier.role));
    }
    if ("roles" in options.identifier) {
      conditions.push(inArray(Table__User.role, options.identifier.roles));
    }
  }

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__UserCount`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const [userCount] = queryOperationResult;
  return userCount!;
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

type TRead__AllUsers = {
  identifier?:
    | {
        referrerId: (typeof Table__User.$inferSelect)["referrerId"];
      }
    | {
        role:
          | (typeof Table__User.$inferSelect)["role"]
          | (typeof Table__User.$inferSelect)["role"][];
      };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
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
 * @returns Array of user records with optional relations
 */

const read__AllUsers = async (options?: TRead__AllUsers) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier) {
    if ("role" in options.identifier && options.identifier.role !== undefined) {
      if (Array.isArray(options.identifier.role)) {
        if (options.identifier.role.length > 0) {
          conditions.push(inArray(Table__User.role, options.identifier.role));
        } else {
          return [];
        }
      } else {
        conditions.push(eq(Table__User.role, options.identifier.role));
      }
    }
  }

  const baseQuery = db.select().from(Table__User).limit(limit).offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllUsers`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const allUsersList = queryOperationResult;

  return allUsersList;
};

/**
 * ----------------------------------------
 * READ (ONE)
 * ----------------------------------------
 */

type TRead__OneUser = {
  identifier:
    | {
        id: (typeof Table__User.$inferSelect)["id"];
      }
    | {
        email: (typeof Table__User.$inferSelect)["email"];
      };
};

/**
 * Fetch a single user record from the database by email.
 *
 * Optionally includes related mining wallet, trading wallet,
 * and rating details based on join configuration.
 *
 */

const read__OneUser = async (options: TRead__OneUser) => {
  const skip = 0;
  const limit = 1;

  const conditions: SQL[] = [];

  if ("email" in options.identifier) {
    conditions.push(eq(Table__User.email, options.identifier.email));
  }

  if ("id" in options.identifier) {
    conditions.push(eq(Table__User.id, options.identifier.id));
  }

  const baseQuery = db.select().from(Table__User).limit(limit).offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__OneUser`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const [userDetails] = queryOperationResult;

  return userDetails ? userDetails : null;
};

/**
 * ----------------------------------------
 * READ REFERRALS (ONE)
 * ----------------------------------------
 */

type TRead__OneReferrals = {
  identifier:
    | {
        id: (typeof Table__User.$inferSelect)["id"];
      }
    | {
        email: (typeof Table__User.$inferSelect)["email"];
      };
};

const read__Referrals = async (options: TRead__OneReferrals) => {
  const skip = 0;
  const limit = Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if ("email" in options.identifier) {
    conditions.push(eq(Table__User.email, options.identifier.email));
  }

  if ("id" in options.identifier) {
    conditions.push(eq(Table__User.id, options.identifier.id));
  }

  const Table__ReferredUsers = alias(Table__User, "referredUsers");

  const referredUsersColumns = getTableColumns(Table__ReferredUsers);

  const [queryOperationError, queryOperationResult] = await tryCatch(
    db
      .select({
        ...referredUsersColumns,
      })
      .from(Table__User)
      .leftJoin(
        Table__ReferredUsers,
        eq(Table__User.id, Table__ReferredUsers.referrerId),
      )
      .where(and(...conditions))
      .limit(limit)
      .offset(skip),
  );

  if (queryOperationError) {
    console.error("Error in queryOperationError in read__OneReferrals:");
    throw queryOperationError;
  }

  const referredUsersList = queryOperationResult;

  return referredUsersList;
};

export {
  create__User,
  read__AllUsers,
  read__OneUser,
  read__UserCount,
  read__Referrals,
};
