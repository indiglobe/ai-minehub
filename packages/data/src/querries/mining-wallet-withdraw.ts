import { Table__MiningWalletWithdraw, Table__User } from "@/schema";
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

type TCreate__MiningWalletWithdraw = {
  dataToInsert: Omit<
    typeof Table__MiningWalletWithdraw.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__MiningWalletWithdraw = async (
  options: TCreate__MiningWalletWithdraw,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__MiningWalletWithdraw)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__MiningWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedMiningWithdraw] = await db
      .select()
      .from(Table__MiningWalletWithdraw)
      .where(eq(Table__MiningWalletWithdraw.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedMiningWithdraw!;
  }

  throw Error("Unexpected block in create__MiningWalletWithdraw");
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

type TRead__MiningWalletWithdrawStats = Partial<{
  identifier: {
    status:
      | (typeof Table__MiningWalletWithdraw.$inferSelect)["status"]
      | (typeof Table__MiningWalletWithdraw.$inferSelect)["status"][];
  };
}>;

const read__MiningWalletWithdrawStats = async (
  options?: TRead__MiningWalletWithdrawStats,
) => {
  const conditions: SQL[] = [];

  if (options?.identifier) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__MiningWalletWithdraw.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__MiningWalletWithdraw.status, options.identifier.status),
      );
    }
  }

  const baseQuery = db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),

      totalAmount:
        sql<number>`coalesce(sum(${Table__MiningWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      averageAmount:
        sql<number>`coalesce(avg(${Table__MiningWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      minAmount:
        sql<number>`coalesce(min(${Table__MiningWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),

      maxAmount:
        sql<number>`coalesce(max(${Table__MiningWalletWithdraw.amount}), 0)`.mapWith(
          Number,
        ),
    })
    .from(Table__MiningWalletWithdraw)
    .$dynamic();

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      "Error in read__MiningWalletWithdrawStats",
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

type TRead__AllMiningWalletWithdraw = {
  identifier?: Partial<
    Pick<
      typeof Table__MiningWalletWithdraw.$inferSelect,
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

const read__AllMiningWalletWithdraw = async (
  options?: TRead__AllMiningWalletWithdraw,
) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const miningWalletWithdrawColumns = getTableColumns(
    Table__MiningWalletWithdraw,
  );
  const userColumns = getTableColumns(Table__User);

  const conditions: SQL[] = [];

  if (options?.identifier?.status) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__MiningWalletWithdraw.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__MiningWalletWithdraw.status, options.identifier.status),
      );
    }
  }

  if (options?.identifier?.orderedBy) {
    conditions.push(
      eq(Table__MiningWalletWithdraw.orderedBy, options.identifier.orderedBy),
    );
  }

  if (options?.identifier?.wallet) {
    conditions.push(
      eq(Table__MiningWalletWithdraw.wallet, options.identifier.wallet),
    );
  }

  const baseQuery = db
    .select({
      ...miningWalletWithdrawColumns,
      associatedUserDetail: { ...userColumns },
    })
    .from(Table__MiningWalletWithdraw)
    .limit(limit)
    .offset(skip)
    .innerJoin(
      Table__User,
      eq(Table__MiningWalletWithdraw.orderedBy, Table__User.id),
    )
    .orderBy(desc(Table__MiningWalletWithdraw.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__AllMiningWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const miningWalletDeposits = queryOperationResult;

  return miningWalletDeposits;
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * MINING WALLET - MONTHLY WITHDRAWAL STATISTICS
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__MiningWalletMonthlyWithdrawStats = {
  year?: number;
};

const read__MiningWalletMonthlyWithdrawStats = async (
  options?: TRead__MiningWalletMonthlyWithdrawStats,
) => {
  const year = options?.year ?? new Date().getFullYear();

  const month = sql<string>`
    DATE_FORMAT(${Table__MiningWalletWithdraw.createdAt}, '%Y-%m')
  `;

  const baseQuery = db
    .select({
      month,
      totalWithdrawals: count(Table__MiningWalletWithdraw.id),
      totalAmount: sum(Table__MiningWalletWithdraw.amount),
    })
    .from(Table__MiningWalletWithdraw)
    .where(sql`YEAR(${Table__MiningWalletWithdraw.createdAt}) = ${year}`)
    .groupBy(month)
    .orderBy(month);

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__MiningWalletMonthlyWithdrawStats`,
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

type TUpdate__MiningWalletWithdraw = {
  identifier:
    | {
        walletId: (typeof Table__MiningWalletWithdraw.$inferSelect)["id"];
      }
    | {
        userId: (typeof Table__MiningWalletWithdraw.$inferSelect)["orderedBy"];
      };

  dataToInsert: Partial<
    Omit<
      typeof Table__MiningWalletWithdraw.$inferInsert,
      "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
    >
  >;
};

const update__MiningWalletWithdraw = async (
  options: TUpdate__MiningWalletWithdraw,
) => {
  const conditions: SQL[] = [];

  if ("walletId" in options.identifier) {
    conditions.push(
      eq(Table__MiningWalletWithdraw.id, options.identifier.walletId),
    );
  }

  if ("userId" in options.identifier) {
    conditions.push(
      eq(Table__MiningWalletWithdraw.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .update(Table__MiningWalletWithdraw)
    .set({ ...options.dataToInsert })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in update__MiningWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [updatedMiningWithdraw] = await db
      .select()
      .from(Table__MiningWalletWithdraw)
      .where(and(...conditions))
      .limit(1)
      .offset(0);

    return updatedMiningWithdraw!;
  }

  throw Error("Unexpected block in update__MiningWalletWithdraw");
};

export {
  create__MiningWalletWithdraw,
  read__MiningWalletWithdrawStats,
  read__AllMiningWalletWithdraw,
  read__MiningWalletMonthlyWithdrawStats,
  update__MiningWalletWithdraw,
};
