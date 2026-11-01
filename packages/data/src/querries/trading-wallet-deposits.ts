import { db } from "@/index";
import { Table__TradingWalletDeposits, Table__User } from "@/schema";
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
import { id } from "@repo/utils/id";
import { DEPOSIT_STATUS } from "@repo/utils/db-enums";

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

type TCreate__TradingWalletDeposit = {
  dataToInsert: Omit<
    typeof Table__TradingWalletDeposits.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__TradingWalletDeposit = async (
  options: TCreate__TradingWalletDeposit,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__TradingWalletDeposits)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__TradingWalletDeposit`,
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

  throw Error("Unexpected block in create__TradingWalletDeposit");
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

type TRead__AllTradingWalletDeposit = {
  identifier?: Partial<
    Pick<
      typeof Table__TradingWalletDeposits.$inferSelect,
      "wallet" | "orderedBy"
    > & {
      status:
        | (typeof DEPOSIT_STATUS)[number]
        | (typeof DEPOSIT_STATUS)[number][];
    }
  >;
  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllTradingWalletDeposit = async (
  options?: TRead__AllTradingWalletDeposit,
) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const tradingWalletDepositsColumns = getTableColumns(
    Table__TradingWalletDeposits,
  );
  const userColumns = getTableColumns(Table__User);

  const conditions: SQL[] = [];

  if (options?.identifier?.status) {
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

  if (options?.identifier?.orderedBy) {
    conditions.push(
      eq(Table__TradingWalletDeposits.orderedBy, options.identifier.orderedBy),
    );
  }

  if (options?.identifier?.wallet) {
    conditions.push(
      eq(Table__TradingWalletDeposits.wallet, options.identifier.wallet),
    );
  }

  const baseQuery = db
    .select({
      ...tradingWalletDepositsColumns,
      associatedUserDetail: { ...userColumns },
    })
    .from(Table__TradingWalletDeposits)
    .limit(limit)
    .offset(skip)
    .innerJoin(
      Table__User,
      eq(Table__TradingWalletDeposits.orderedBy, Table__User.id),
    )
    .orderBy(desc(Table__TradingWalletDeposits.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__AllTradingWalletDeposit`,
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
 * TRADING WALLET - MONTHLY DEPOSIT STATISTICS
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__TradingWalletMonthlyDepositStats = {
  year?: number;
};

const read__TradingWalletMonthlyDepositStats = async (
  options?: TRead__TradingWalletMonthlyDepositStats,
) => {
  const year = options?.year ?? new Date().getFullYear();

  const month = sql<string>`
    DATE_FORMAT(${Table__TradingWalletDeposits.createdAt}, '%Y-%m')
  `;

  const baseQuery = db
    .select({
      month,
      totalDeposits: count(Table__TradingWalletDeposits.id),
      totalAmount: sum(Table__TradingWalletDeposits.amount),
    })
    .from(Table__TradingWalletDeposits)
    .where(sql`YEAR(${Table__TradingWalletDeposits.createdAt}) = ${year}`)
    .groupBy(month)
    .orderBy(month);

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__TradingWalletMonthlyDepositStats`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  return queryOperationResult.map((item) => ({
    month: item.month,
    totalDeposits: item.totalDeposits,
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

type TUpdate__TradingWalletDeposit = {
  identifier:
    | {
        walletId: (typeof Table__TradingWalletDeposits.$inferSelect)["id"];
      }
    | {
        userId: (typeof Table__TradingWalletDeposits.$inferSelect)["orderedBy"];
      };

  dataToInsert: Partial<
    Omit<
      typeof Table__TradingWalletDeposits.$inferInsert,
      "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
    >
  >;
};

const update__TradingWalletDeposit = async (
  options: TUpdate__TradingWalletDeposit,
) => {
  const conditions: SQL[] = [];

  if ("walletId" in options.identifier) {
    conditions.push(
      eq(Table__TradingWalletDeposits.id, options.identifier.walletId),
    );
  }

  if ("userId" in options.identifier) {
    conditions.push(
      eq(Table__TradingWalletDeposits.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .update(Table__TradingWalletDeposits)
    .set({ ...options.dataToInsert })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in update__TradingWalletDeposit`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [updatedTradingDeposit] = await db
      .select()
      .from(Table__TradingWalletDeposits)
      .where(and(...conditions))
      .limit(1)
      .offset(0);

    return updatedTradingDeposit!;
  }

  throw Error("Unexpected block in update__TradingWalletDeposit");
};

export {
  create__TradingWalletDeposit,
  read__AllTradingWalletDeposit,
  read__TradingWalletDepositStats,
  read__TradingWalletMonthlyDepositStats,
  update__TradingWalletDeposit,
};
