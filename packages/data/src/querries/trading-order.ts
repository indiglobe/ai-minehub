import { db } from "@/index";
import { Table__TradingOrder } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, SQL } from "drizzle-orm";

type TRead__AllTradingOrders = {
  identifier?: Partial<{
    userId: string;
  }>;

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllTradingOrders = async (options?: TRead__AllTradingOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.userId) {
    conditions.push(
      eq(Table__TradingOrder.orderedBy, options.identifier.userId),
    );
  }

  const baseQuery = db
    .select()
    .from(Table__TradingOrder)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__TradingOrder.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllTradingOrders`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const allTradingOrders = queryOperationResult;

  return allTradingOrders;
};


export {
  read__AllTradingOrders,
};
