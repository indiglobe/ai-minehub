import { db } from "@/index";
import { Table__TradingWallet } from "@/schema";
import { id } from "@repo/utils/id";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, SQL } from "drizzle-orm";

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


export {
  create__TradingWallet,
  read__OneTradingWallet,
};
