import { Table__TradingWalletWithdraw, Table__User } from "@/schema";
import { id } from "@repo/utils/id";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
  SQL,
  sum,
} from "drizzle-orm";
import { WITHDRAWL_STATUS } from "@repo/utils/db-enums";

type TWITHDRAWL_STATUS = (typeof WITHDRAWL_STATUS)[number];

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
 * READ (ALL)
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__AllTradingWalletWithdraw = {
  identifier?: Partial<
    Pick<
      typeof Table__TradingWalletWithdraw.$inferSelect,
      "wallet" | "orderedBy"
    > & {
      status: TWITHDRAWL_STATUS | TWITHDRAWL_STATUS[];
    }
  >;
  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllTradingWalletWithdraw = async (
  options?: TRead__AllTradingWalletWithdraw,
) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const tradingWalletWithdrawColumns = getTableColumns(
    Table__TradingWalletWithdraw,
  );
  const userColumns = getTableColumns(Table__User);

  const conditions: SQL[] = [];

  if (options?.identifier?.status) {
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

  if (options?.identifier?.orderedBy) {
    conditions.push(
      eq(Table__TradingWalletWithdraw.orderedBy, options.identifier.orderedBy),
    );
  }

  if (options?.identifier?.wallet) {
    conditions.push(
      eq(Table__TradingWalletWithdraw.wallet, options.identifier.wallet),
    );
  }

  const baseQuery = db
    .select({
      ...tradingWalletWithdrawColumns,
      associatedUserDetail: { ...userColumns },
    })
    .from(Table__TradingWalletWithdraw)
    .limit(limit)
    .offset(skip)
    .innerJoin(
      Table__User,
      eq(Table__TradingWalletWithdraw.orderedBy, Table__User.id),
    )
    .orderBy(desc(Table__TradingWalletWithdraw.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__AllTradingWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const tradingWalletDeposits = queryOperationResult;

  return tradingWalletDeposits;
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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * TRADING WALLET - MONTHLY WITHDRAWAL STATISTICS
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__TradingWalletMonthlyWithdrawStats = {
  year?: number;
};

const read__TradingWalletMonthlyWithdrawStats = async (
  options?: TRead__TradingWalletMonthlyWithdrawStats,
) => {
  const year = options?.year ?? new Date().getFullYear();

  const month = sql<string>`
    DATE_FORMAT(${Table__TradingWalletWithdraw.createdAt}, '%Y-%m')
  `;

  const baseQuery = db
    .select({
      month,
      totalWithdrawals: count(Table__TradingWalletWithdraw.id),
      totalAmount: sum(Table__TradingWalletWithdraw.amount),
    })
    .from(Table__TradingWalletWithdraw)
    .where(sql`YEAR(${Table__TradingWalletWithdraw.createdAt}) = ${year}`)
    .groupBy(month)
    .orderBy(month);

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__TradingWalletMonthlyWithdrawStats`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  return queryOperationResult.map((item) => ({
    month: item.month,
    totalWithdrawals: item.totalWithdrawals,
    totalAmount: Number(item.totalAmount ?? 0),
  }));
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * UPDATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TUpdate__TradingWalletWithdraw = {
  identifier:
    | {
        walletId: (typeof Table__TradingWalletWithdraw.$inferSelect)["id"];
      }
    | {
        userId: (typeof Table__TradingWalletWithdraw.$inferSelect)["orderedBy"];
      };

  dataToInsert: Partial<
    Omit<
      typeof Table__TradingWalletWithdraw.$inferInsert,
      "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
    >
  >;
};

const update__TradingWalletWithdraw = async (
  options: TUpdate__TradingWalletWithdraw,
) => {
  const conditions: SQL[] = [];

  if ("walletId" in options.identifier) {
    conditions.push(
      eq(Table__TradingWalletWithdraw.id, options.identifier.walletId),
    );
  }

  if ("userId" in options.identifier) {
    conditions.push(
      eq(Table__TradingWalletWithdraw.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .update(Table__TradingWalletWithdraw)
    .set({ ...options.dataToInsert })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in update__TradingWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [updatedTradingWithdraw] = await db
      .select()
      .from(Table__TradingWalletWithdraw)
      .where(and(...conditions))
      .limit(1)
      .offset(0);

    return updatedTradingWithdraw!;
  }

  throw Error("Unexpected block in update__TradingWalletWithdraw");
};

export {
  create__TradingWalletWithdraw,
  read__TradingWalletWithdrawStats,
  read__TradingWalletMonthlyWithdrawStats,
  read__AllTradingWalletWithdraw,
  update__TradingWalletWithdraw,
};
