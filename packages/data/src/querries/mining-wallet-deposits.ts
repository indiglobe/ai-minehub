import { db } from "@/index";
import { Table__MiningWalletDeposits, Table__User } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, getTableColumns, inArray, sql, SQL } from "drizzle-orm";
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

type TCreate__MiningWalletDeposite = {
  dataToInsert: Omit<
    typeof Table__MiningWalletDeposits.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__MiningWalletDeposite = async (
  options: TCreate__MiningWalletDeposite,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__MiningWalletDeposits)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__MiningWalletDeposite`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedMiningDeposit] = await db
      .select()
      .from(Table__MiningWalletDeposits)
      .where(eq(Table__MiningWalletDeposits.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedMiningDeposit!;
  }

  throw Error("Unexpected block in create__MiningWalletDeposite");
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

type TRead__AllMiningWalletDeposite = {
  identifier?: Partial<
    Pick<
      typeof Table__MiningWalletDeposits.$inferSelect,
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

const read__AllMiningWalletDeposite = async (
  options?: TRead__AllMiningWalletDeposite,
) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const miningWalletDepositsColumns = getTableColumns(
    Table__MiningWalletDeposits,
  );
  const userColumns = getTableColumns(Table__User);

  const conditions: SQL[] = [];

  if (options?.identifier?.status) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__MiningWalletDeposits.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__MiningWalletDeposits.status, options.identifier.status),
      );
    }
  }

  if (options?.identifier?.orderedBy) {
    conditions.push(
      eq(Table__MiningWalletDeposits.orderedBy, options.identifier.orderedBy),
    );
  }

  if (options?.identifier?.wallet) {
    conditions.push(
      eq(Table__MiningWalletDeposits.wallet, options.identifier.wallet),
    );
  }

  const baseQuery = db
    .select({
      ...miningWalletDepositsColumns,
      associatedUserDetail: { ...userColumns },
    })
    .from(Table__MiningWalletDeposits)
    .limit(limit)
    .offset(skip)
    .innerJoin(
      Table__User,
      eq(Table__MiningWalletDeposits.orderedBy, Table__User.id),
    )
    .orderBy(desc(Table__MiningWalletDeposits.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in read__AllMiningWalletDeposite`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const miningWalletDeposites = queryOperationResult;

  return miningWalletDeposites;
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

type TRead__MiningWalletDepositStats = Partial<{
  identifier: {
    status:
      | (typeof Table__MiningWalletDeposits.$inferSelect)["status"]
      | (typeof Table__MiningWalletDeposits.$inferSelect)["status"][];
  };
}>;

const read__MiningWalletDepositStats = async (
  options?: TRead__MiningWalletDepositStats,
) => {
  const conditions: SQL[] = [];

  if (options?.identifier) {
    if (Array.isArray(options.identifier.status)) {
      conditions.push(
        inArray(Table__MiningWalletDeposits.status, options.identifier.status),
      );
    }

    if (!Array.isArray(options.identifier.status)) {
      conditions.push(
        eq(Table__MiningWalletDeposits.status, options.identifier.status),
      );
    }
  }

  const baseQuery = db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),

      totalAmount:
        sql<number>`coalesce(sum(${Table__MiningWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      averageAmount:
        sql<number>`coalesce(avg(${Table__MiningWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      minAmount:
        sql<number>`coalesce(min(${Table__MiningWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),

      maxAmount:
        sql<number>`coalesce(max(${Table__MiningWalletDeposits.amount}), 0)`.mapWith(
          Number,
        ),
    })
    .from(Table__MiningWalletDeposits)
    .$dynamic();

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      "Error in read__MiningWalletDepositStats",
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
 * UPDATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TUpdate__MiningWalletDeposite = {
  identifier:
    | {
        walletId: (typeof Table__MiningWalletDeposits.$inferSelect)["id"];
      }
    | {
        userId: (typeof Table__MiningWalletDeposits.$inferSelect)["orderedBy"];
      };

  dataToInsert: Partial<
    Omit<
      typeof Table__MiningWalletDeposits.$inferInsert,
      "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
    >
  >;
};

const update__MiningWalletDeposite = async (
  options: TUpdate__MiningWalletDeposite,
) => {
  const conditions: SQL[] = [];

  if ("walletId" in options.identifier) {
    conditions.push(
      eq(Table__MiningWalletDeposits.id, options.identifier.walletId),
    );
  }

  if ("userId" in options.identifier) {
    conditions.push(
      eq(Table__MiningWalletDeposits.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .update(Table__MiningWalletDeposits)
    .set({ ...options.dataToInsert })
    .where(and(...conditions));

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in update__MiningWalletDeposite`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [updatedMiningDeposit] = await db
      .select()
      .from(Table__MiningWalletDeposits)
      .where(and(...conditions))
      .limit(1)
      .offset(0);

    return updatedMiningDeposit!;
  }

  throw Error("Unexpected block in update__MiningWalletDeposite");
};

export {
  create__MiningWalletDeposite,
  read__AllMiningWalletDeposite,
  update__MiningWalletDeposite,
  read__MiningWalletDepositStats,
};
