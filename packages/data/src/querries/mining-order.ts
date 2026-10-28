import { db } from "@/index";
import { Table__MiningOrder } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, inArray, SQL } from "drizzle-orm";
import { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import { id } from "@repo/utils/id";

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__MiningOrder = {
  dataToInsert: Omit<
    typeof Table__MiningOrder.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__MiningOrder = async (options: TCreate__MiningOrder) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__MiningOrder)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__MiningOrder`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedMiningOrder] = await db
      .select()
      .from(Table__MiningOrder)
      .where(eq(Table__MiningOrder.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedMiningOrder!;
  }

  throw Error("Unexpected block in create__MiningOrder");
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllMiningOrders = {
  identifier?: Partial<{
    miningProfileUsed: string;
    miningStatus:
      | (typeof INVESTMENT_STATUS)[number]
      | (typeof INVESTMENT_STATUS)[number][];
    userId: string;
  }>;
  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllMiningOrders = async (options?: TRead__AllMiningOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.userId) {
    conditions.push(
      eq(Table__MiningOrder.orderedBy, options.identifier.userId),
    );
  }

  if (options?.identifier?.miningProfileUsed) {
    conditions.push(
      eq(
        Table__MiningOrder.miningProfileUsed,
        options.identifier.miningProfileUsed,
      ),
    );
  }

  if (options?.identifier?.miningStatus) {
    if (Array.isArray(options.identifier.miningStatus)) {
      conditions.push(
        inArray(
          Table__MiningOrder.miningStatus,
          options.identifier.miningStatus,
        ),
      );
    }

    if (!Array.isArray(options.identifier.miningStatus)) {
      conditions.push(
        eq(Table__MiningOrder.miningStatus, options.identifier.miningStatus),
      );
    }
  }

  if (options?.identifier?.userId) {
    conditions.push(
      eq(Table__MiningOrder.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .select()
    .from(Table__MiningOrder)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__MiningOrder.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllMiningOrders`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const miningOrders = queryOperationResult;

  return miningOrders;
};

export { read__AllMiningOrders, create__MiningOrder };
