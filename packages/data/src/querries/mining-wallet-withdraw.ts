import { Table__MiningWalletWithdraw, Table__User } from "@/schema";
import { id } from "@repo/utils/id";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, getTableColumns, inArray, sql, SQL } from "drizzle-orm";
import { WITHDRAWL_STATUS } from "@repo/utils/db-enums";

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
      status:
        | (typeof WITHDRAWL_STATUS)[number]
        | (typeof WITHDRAWL_STATUS)[number][];
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

  const miningWalletDeposites = queryOperationResult;

  return miningWalletDeposites;
};

export {
  create__MiningWalletWithdraw,
  read__MiningWalletWithdrawStats,
  read__AllMiningWalletWithdraw,
};
