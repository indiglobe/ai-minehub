import { Table__TradingWalletWithdraw } from "@/schema";
import { id } from "@repo/utils/id";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { and, eq, inArray, sql, SQL } from "drizzle-orm";

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

type TCreate__TradingWalletWithdraw = {
  dataToInsert: Omit<
    typeof Table__TradingWalletWithdraw.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__TradingWalletWithdraw = async (
  options: TCreate__TradingWalletWithdraw,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__TradingWalletWithdraw)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__TradingWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedTradingWithdraw] = await db
      .select()
      .from(Table__TradingWalletWithdraw)
      .where(eq(Table__TradingWalletWithdraw.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedTradingWithdraw!;
  }

  throw Error("Unexpected block in create__TradingWalletWithdraw");
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * READ (STAT)
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__TradingWalletWithdrawStats = Partial<{
  identifier: {
    status:
      | (typeof Table__TradingWalletWithdraw.$inferSelect)["status"]
      | (typeof Table__TradingWalletWithdraw.$inferSelect)["status"][];
  };
}>;

const read__TradingWalletWithdrawStats = async (
  options?: TRead__TradingWalletWithdrawStats,
) => {
  const conditions: SQL[] = [];

  if (options?.identifier) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__TradingWalletWithdraw.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__TradingWalletWithdraw.status, options.identifier.status),
      );
    }
  }

  const baseQuery = db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),

      totalAmount:
        sql<number>`coalesce(sum(${Table__TradingWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      averageAmount:
        sql<number>`coalesce(avg(${Table__TradingWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      minAmount:
        sql<number>`coalesce(min(${Table__TradingWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      maxAmount:
        sql<number>`coalesce(max(${Table__TradingWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),
    })
    .from(Table__TradingWalletWithdraw)
    .$dynamic();

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      "Error in read__TradingWalletWithdrawStats",
      queryOperationError,
    );

    throw queryOperationError;
  }

  const [stats] = queryOperationResult;

  return stats!;
};

export { create__TradingWalletWithdraw, read__TradingWalletWithdrawStats };
