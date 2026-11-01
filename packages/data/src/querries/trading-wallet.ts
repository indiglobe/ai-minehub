import { db } from "@/index";
import { Table__TradingWallet } from "@/schema";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * CREATE
 * ==========================================
 * ==========================================
 * ==========================================
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
    console.error(`Error in queryOperationError in create__TradingWallet`);
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
 * ==========================================
 * ==========================================
 * ==========================================
 * READ (ALL)
 * ==========================================
 * ==========================================
 * ==========================================
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
 * UPDATE (BALANCE)
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TUpdate__Balance = {
  identifier:
    | {
        id: (typeof Table__TradingWallet.$inferSelect)["id"];
      }
    | {
        associatedUserId: (typeof Table__TradingWallet.$inferSelect)["associatedUser"];
      };

  dataToUpdate: Required<
    Partial<Pick<typeof Table__TradingWallet.$inferSelect, "balance">>
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
   * Filter condition by trading wallet ID if specified.
   */
  if ("id" in identifier) {
    conditions.push(eq(Table__TradingWallet.id, identifier.id));
  }

  /**
   * Filter condition by associated user ID if specified.
   */
  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(Table__TradingWallet.associatedUser, identifier.associatedUserId),
    );
  }

  const [wallet] = await db
    .select()
    .from(Table__TradingWallet)
    .where(and(...conditions));

  /**
   * Base Query Initialization
   * Setup the core `db.update()` statement with the provided update data.
   */
  const baseQuery = db
    .update(Table__TradingWallet)
    .set({ ...dataToUpdate, balance: wallet!.balance + dataToUpdate.balance })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__OneTradingWallet`);
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
     * Fetch the updated trading wallet using the provided identifier.
     */
    const [
      updatedTradingWalletFetchingError,
      fetchedUpdatedTradingWalletsList,
    ] = await tryCatch(
      db
        .select()
        .from(Table__TradingWallet)
        .where(and(...conditions))
        .limit(1)
        .offset(0),
    );

    if (updatedTradingWalletFetchingError) {
      console.error(
        `Error in updatedTradingWalletFetchingError in update__OneTradingWallet`,
      );
      console.error(updatedTradingWalletFetchingError);
      throw updatedTradingWalletFetchingError;
    }

    const [updatedTradingWallet] = fetchedUpdatedTradingWalletsList;

    return updatedTradingWallet ?? null;
  }

  /**
   * No Record Updated
   * Return null if no trading wallet matched the provided identifier.
   */
  if (affectedRows === 0) {
    return null;
  }

  throw new Error(`Unexpected block execution in update__OneTradingWallet`);
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
   * Filter condition by trading wallet ID if specified.
   */
  if ("id" in identifier) {
    conditions.push(eq(Table__TradingWallet.id, identifier.id));
  }

  /**
   * Filter condition by associated user ID if specified.
   */
  if ("associatedUserId" in identifier) {
    conditions.push(
      eq(Table__TradingWallet.associatedUser, identifier.associatedUserId),
    );
  }

  const [wallet] = await db
    .select()
    .from(Table__TradingWallet)
    .where(and(...conditions));

  /**
   * Base Query Initialization
   * Setup the core `db.update()` statement with the provided update data.
   */
  const baseQuery = db
    .update(Table__TradingWallet)
    .set({ ...dataToUpdate, balance: wallet!.balance - dataToUpdate.balance })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in update__OneTradingWallet`);
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
     * Fetch the updated trading wallet using the provided identifier.
     */
    const [
      updatedTradingWalletFetchingError,
      fetchedUpdatedTradingWalletsList,
    ] = await tryCatch(
      db
        .select()
        .from(Table__TradingWallet)
        .where(and(...conditions))
        .limit(1)
        .offset(0),
    );

    if (updatedTradingWalletFetchingError) {
      console.error(
        `Error in updatedTradingWalletFetchingError in update__OneTradingWallet`,
      );
      console.error(updatedTradingWalletFetchingError);
      throw updatedTradingWalletFetchingError;
    }

    const [updatedTradingWallet] = fetchedUpdatedTradingWalletsList;

    return updatedTradingWallet ?? null;
  }

  /**
   * No Record Updated
   * Return null if no trading wallet matched the provided identifier.
   */
  if (affectedRows === 0) {
    return null;
  }

  throw new Error(`Unexpected block execution in update__OneTradingWallet`);
};

export {
  create__TradingWallet,
  read__OneTradingWallet,
  update__AddBalance,
  update__DeductBalance,
};
