import { db } from "@/index";
import { Table__MiningOrder } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, SQL } from "drizzle-orm";
import { INVESTMENT_STATUS } from "@repo/utils/db-enums";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllMiningOrders = {
  identifier?: Partial<{
    miningProfileUsed: string;
    miningStatus: (typeof INVESTMENT_STATUS)[number];
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

export { read__AllMiningOrders };
