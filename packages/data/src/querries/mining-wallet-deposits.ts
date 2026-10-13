import { db } from "@/index";
import { Table__MiningWalletDeposits } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, SQL } from "drizzle-orm";
import { id } from "@repo/utils/id";

/**
 * ==========================================
 * CREATE
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
 * READ (ALL)
 * ==========================================
 */

type TRead__AllMiningWalletDeposite = {
  identifier?: Partial<
    Pick<
      typeof Table__MiningWalletDeposits.$inferSelect,
      "status" | "wallet" | "orderedBy"
    >
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

  const conditions: SQL[] = [];

  if (options?.identifier?.status) {
    conditions.push(
      eq(Table__MiningWalletDeposits.status, options.identifier.status),
    );
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
    .select()
    .from(Table__MiningWalletDeposits)
    .limit(limit)
    .offset(skip)
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

export { create__MiningWalletDeposite, read__AllMiningWalletDeposite };
