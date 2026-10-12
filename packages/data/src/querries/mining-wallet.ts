import { db } from "@/index";
import { Table__MiningWallet } from "@/schema";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__MiningWallet = Omit<
  typeof Table__MiningWallet.$inferInsert,
  "tableIdentifierToken" | "createdAt" | "updatedAt" | "id"
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
  const generatedId = id();

  const baseQuery = db
    .insert(Table__MiningWallet)
    .values({ ...data, id: generatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__MiningWallet`);
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
          .from(Table__MiningWallet)
          .where(eq(Table__MiningWallet.id, generatedId))
          .limit(1)
          .offset(0),
      );

    if (insertedUserFetchingError) {
      console.error(
        `Error in insertedUserFetchingError in create__MiningWallet`,
      );
      console.error(insertedUserFetchingError);
      throw insertedUserFetchingError;
    }

    const [insertedMiningWallet] = fetchedInsertedUsersList;

    return insertedMiningWallet!;
  }

  throw new Error(`Unexpected block execution in create__MiningWallet`);
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneMiningWallet = {
  identifier:
    | {
        id: (typeof Table__MiningWallet.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__MiningWallet.$inferSelect)["associatedUser"];
      };
};

const read__OneMiningWallet = async (options: TRead__OneMiningWallet) => {
  /**
   * Identifier Extraction
   * Destructure the unique identifier passed into the options parameter.
   */
  const { identifier } = options;

  /**
   * Condition Filters Builder
   * Initialize an array to hold dynamic SQL WHERE clauses based on the provided identifier.
   */
  const conditions: SQL[] = [];

  /**
   * Filter condition by mining wallet ID if specified.
   */
  if ("id" in identifier) {
    conditions.push(eq(Table__MiningWallet.id, identifier.id));
  }

  /**
   * Filter condition by associated user ID if specified.
   */
  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(Table__MiningWallet.associatedUser, identifier.associatedUserId),
    );
  }

  /**
   * Base Query Initialization
   * Setup the core `db.select()` statement limited to the single record.
   */
  const baseQuery = db.select().from(Table__MiningWallet).limit(1);

  /**
   * Apply WHERE Conditions
   * Append the identification conditions to the query.
   */
  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__OneMiningWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const [miningWallet] = queryOperationResult;

  return miningWallet ? miningWallet : null;
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

//   return await db.query.Table__MiningWallet.findMany({
//     limit,
//     offset: skip,
//     where: conditions.length > 0 ? and(...conditions) : undefined,
//     orderBy: [desc(Table__MiningWallet.createdAt)],
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
//         id: (typeof Table__MiningWallet.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof Table__MiningWallet.$inferSelect)["associatedUser"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof Table__MiningWallet.$inferInsert,
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
//     conditions.push(eq(Table__MiningWallet.id, identifier.id));
//   }

//   if ("associatedUser" in identifier) {
//     conditions.push(
//       eq(Table__MiningWallet.associatedUser, identifier.associatedUser),
//     );
//   }

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(Table__MiningWallet)
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
//         id: (typeof Table__MiningWallet.$inferSelect)["id"];
//       }
//     | {
//         associatedUser: (typeof Table__MiningWallet.$inferSelect)["associatedUser"];
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
//     conditions.push(eq(Table__MiningWallet.id, options.identifier.id));
//   }

//   if ("associatedUser" in options.identifier) {
//     conditions.push(
//       eq(Table__MiningWallet.associatedUser, options.identifier.associatedUser),
//     );
//   }

//   await db.delete(Table__MiningWallet).where(and(...conditions));

//   return existing;
// };

export {
  create__MiningWallet,
  // read__AllMiningWallets,
  read__OneMiningWallet,
  // update__MiningWallet,
  // delete__MiningWallet,
};
