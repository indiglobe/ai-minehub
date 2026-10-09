import { db } from "@/index";
import { Table__User } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

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

const read__UserCount = async () => {
  const baseQuery = db.$count(Table__User);

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__UserCount`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  return queryOperationResult;
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
        role: (typeof Table__User.$inferSelect)["role"];
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
    if ("role" in options.identifier) {
      conditions.push(eq(Table__User.role, options.identifier.role));
    }

    if ("referrerId" in options.identifier && options.identifier.referrerId) {
      conditions.push(
        eq(Table__User.referrerId, options.identifier.referrerId),
      );
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


export {
  create__User,
  read__AllUsers,
  read__OneUser,
  read__UserCount,
};
