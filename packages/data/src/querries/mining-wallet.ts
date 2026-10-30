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

type TCreate__MiningWallet = {
  dataToInsert: Omit<
    typeof Table__MiningWallet.$inferInsert,
    "tableIdentifierToken" | "createdAt" | "updatedAt" | "id"
  >;
};

const create__MiningWallet = async (options: TCreate__MiningWallet) => {
  const generatedId = id();

  const baseQuery = db
    .insert(Table__MiningWallet)
    .values({ ...options.dataToInsert, id: generatedId });

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
  const baseQuery = db.select().from(Table__MiningWallet).limit(1).offset(0);

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
 * UPDATE
 * ==========================================
 */

type TUpdate__OneMiningWallet = {
  identifier:
    | {
        id: (typeof Table__MiningWallet.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__MiningWallet.$inferSelect)["associatedUser"];
      };

  dataToUpdate: Partial<
    Omit<
      typeof Table__MiningWallet.$inferSelect,
      | "tableIdentifierToken"
      | "createdAt"
      | "updatedAt"
      | "id"
      | "associatedUser"
    >
  >;
};

const update__OneMiningWallet = async (options: TUpdate__OneMiningWallet) => {
  /**
   * Identifier Extraction
   * Destructure the identifier and update data passed into the options parameter.
   */
  const { identifier, dataToUpdate } = options;

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
   * Setup the core `db.update()` statement with the provided update data.
   */
  const baseQuery = db
    .update(Table__MiningWallet)
    .set(dataToUpdate)
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__OneMiningWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  /**
   * Update Result Validation
   * Check whether exactly one record was updated.
   */
  const {
    "0": { affectedRows },
  } = queryOperationResult;

  if (affectedRows === 1) {
    /**
     * Updated Record Fetching
     * Fetch the updated mining wallet using the provided identifier.
     */
    const [updatedMiningWalletFetchingError, fetchedUpdatedMiningWalletsList] =
      await tryCatch(
        db
          .select()
          .from(Table__MiningWallet)
          .where(and(...conditions))
          .limit(1)
          .offset(0),
      );

    if (updatedMiningWalletFetchingError) {
      console.error(
        `Error in updatedMiningWalletFetchingError in update__OneMiningWallet`,
      );
      console.error(updatedMiningWalletFetchingError);
      throw updatedMiningWalletFetchingError;
    }

    const [updatedMiningWallet] = fetchedUpdatedMiningWalletsList;

    return updatedMiningWallet ?? null;
  }

  /**
   * No Record Updated
   * Return null if no mining wallet matched the provided identifier.
   */
  if (affectedRows === 0) {
    return null;
  }

  throw new Error(`Unexpected block execution in update__OneMiningWallet`);
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

type TUpdate__Balance = {
  identifier:
    | {
        id: (typeof Table__MiningWallet.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__MiningWallet.$inferSelect)["associatedUser"];
      };

  dataToUpdate: Required<
    Partial<Pick<typeof Table__MiningWallet.$inferSelect, "balance">>
  >;
};

const update__AddBalance = async (options: TUpdate__Balance) => {
  /**
   * Identifier Extraction
   * Destructure the identifier and update data passed into the options parameter.
   */
  const { identifier, dataToUpdate } = options;

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

  const [wallet] = await db
    .select()
    .from(Table__MiningWallet)
    .where(and(...conditions));

  /**
   * Base Query Initialization
   * Setup the core `db.update()` statement with the provided update data.
   */
  const baseQuery = db
    .update(Table__MiningWallet)
    .set({ ...dataToUpdate, balance: wallet!.balance + dataToUpdate.balance })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__OneMiningWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  /**
   * Update Result Validation
   * Check whether exactly one record was updated.
   */
  const {
    "0": { affectedRows },
  } = queryOperationResult;

  if (affectedRows === 1) {
    /**
     * Updated Record Fetching
     * Fetch the updated mining wallet using the provided identifier.
     */
    const [updatedMiningWalletFetchingError, fetchedUpdatedMiningWalletsList] =
      await tryCatch(
        db
          .select()
          .from(Table__MiningWallet)
          .where(and(...conditions))
          .limit(1)
          .offset(0),
      );

    if (updatedMiningWalletFetchingError) {
      console.error(
        `Error in updatedMiningWalletFetchingError in update__OneMiningWallet`,
      );
      console.error(updatedMiningWalletFetchingError);
      throw updatedMiningWalletFetchingError;
    }

    const [updatedMiningWallet] = fetchedUpdatedMiningWalletsList;

    return updatedMiningWallet ?? null;
  }

  /**
   * No Record Updated
   * Return null if no mining wallet matched the provided identifier.
   */
  if (affectedRows === 0) {
    return null;
  }

  throw new Error(`Unexpected block execution in update__OneMiningWallet`);
};

const update__DeductBalance = async (options: TUpdate__Balance) => {
  /**
   * Identifier Extraction
   * Destructure the identifier and update data passed into the options parameter.
   */
  const { identifier, dataToUpdate } = options;

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

  const [wallet] = await db
    .select()
    .from(Table__MiningWallet)
    .where(and(...conditions));

  /**
   * Base Query Initialization
   * Setup the core `db.update()` statement with the provided update data.
   */
  const baseQuery = db
    .update(Table__MiningWallet)
    .set({ ...dataToUpdate, balance: wallet!.balance - dataToUpdate.balance })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__OneMiningWallet`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  /**
   * Update Result Validation
   * Check whether exactly one record was updated.
   */
  const {
    "0": { affectedRows },
  } = queryOperationResult;

  if (affectedRows === 1) {
    /**
     * Updated Record Fetching
     * Fetch the updated mining wallet using the provided identifier.
     */
    const [updatedMiningWalletFetchingError, fetchedUpdatedMiningWalletsList] =
      await tryCatch(
        db
          .select()
          .from(Table__MiningWallet)
          .where(and(...conditions))
          .limit(1)
          .offset(0),
      );

    if (updatedMiningWalletFetchingError) {
      console.error(
        `Error in updatedMiningWalletFetchingError in update__OneMiningWallet`,
      );
      console.error(updatedMiningWalletFetchingError);
      throw updatedMiningWalletFetchingError;
    }

    const [updatedMiningWallet] = fetchedUpdatedMiningWalletsList;

    return updatedMiningWallet ?? null;
  }

  /**
   * No Record Updated
   * Return null if no mining wallet matched the provided identifier.
   */
  if (affectedRows === 0) {
    return null;
  }

  throw new Error(`Unexpected block execution in update__OneMiningWallet`);
};

export {
  create__MiningWallet,
  read__OneMiningWallet,
  update__OneMiningWallet,
  update__AddBalance,
  update__DeductBalance,
};
