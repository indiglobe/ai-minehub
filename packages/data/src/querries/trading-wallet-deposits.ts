import { db } from "@/index";
import { Table__TradingWalletDeposits } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, inArray, sql, SQL } from "drizzle-orm";
import { id } from "@repo/utils/id";

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

type TCreate__TradingWalletDeposite = {
  dataToInsert: Omit<
    typeof Table__TradingWalletDeposits.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__TradingWalletDeposite = async (
  options: TCreate__TradingWalletDeposite,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__TradingWalletDeposits)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__TradingWalletDeposite`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedTradingDeposit] = await db
      .select()
      .from(Table__TradingWalletDeposits)
      .where(eq(Table__TradingWalletDeposits.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedTradingDeposit!;
  }

  throw Error("Unexpected block in create__TradingWalletDeposite");
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * READ (STATS)
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__TradingWalletDepositStats = Partial<{
  identifier: {
    status:
      | (typeof Table__TradingWalletDeposits.$inferSelect)["status"]
      | (typeof Table__TradingWalletDeposits.$inferSelect)["status"][];
  };
}>;

const read__TradingWalletDepositStats = async (
  options?: TRead__TradingWalletDepositStats,
) => {
  const conditions: SQL[] = [];

  if (options?.identifier) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__TradingWalletDeposits.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__TradingWalletDeposits.status, options.identifier.status),
      );
    }
  }

  const baseQuery = db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),

      totalAmount:
        sql<number>`coalesce(sum(${Table__TradingWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      averageAmount:
        sql<number>`coalesce(avg(${Table__TradingWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      minAmount:
        sql<number>`coalesce(min(${Table__TradingWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      maxAmount:
        sql<number>`coalesce(max(${Table__TradingWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),
    })
    .from(Table__TradingWalletDeposits)
    .$dynamic();

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      "Error in read__TradingWalletDepositStats",
      queryOperationError,
    );

    throw queryOperationError;
  }

  const [stats] = queryOperationResult;

  return stats!;
};

export { create__TradingWalletDeposite, read__TradingWalletDepositStats };
