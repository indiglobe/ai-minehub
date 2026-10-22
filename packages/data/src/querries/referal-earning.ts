import { Table__ReferalEarning } from "@/schema";
import { and, eq, SQL } from "drizzle-orm";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { id } from "@repo/utils/id";

/**
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

type TCreate__ReferalEarning = Omit<
  typeof Table__ReferalEarning.$inferInsert,
  "tableIdentifierToken" | "id" | "createdAt" | "updatedAt"
>;

const create__ReferalEarning = async (data: TCreate__ReferalEarning) => {
  const generatedId = id();

  const baseQuery = db
    .insert(Table__ReferalEarning)
    .values({ ...data, id: generatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__ReferalEarning`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedNewRecordError, insertedNewRecord] = await tryCatch(
      db
        .select()
        .from(Table__ReferalEarning)
        .where(eq(Table__ReferalEarning.id, generatedId))
        .limit(1)
        .offset(0),
    );

    if (insertedNewRecordError) {
      console.error(
        `Error in insertedNewRecordError in create__ReferalEarning`,
      );
      console.error(insertedNewRecordError);
      throw insertedNewRecordError;
    }

    const [firstRecord] = insertedNewRecord;

    return firstRecord!;
  }

  throw new Error(`Unexpected block execution in create__ReferalEarning`);
};

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

type TRead__AllReferalEarning = {
  identifier?: {
    userId: (typeof Table__ReferalEarning.$inferSelect)["earnerId"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllReferalEarning = async (options?: TRead__AllReferalEarning) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier) {
    if ("userId" in options.identifier) {
      conditions.push(
        eq(Table__ReferalEarning.earnerId, options.identifier.userId),
      );
    }
  }

  const baseQuery = db
    .select()
    .from(Table__ReferalEarning)
    .limit(limit)
    .offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllReferalEarning`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const allReferalEarning = queryOperationResult;

  return allReferalEarning;
};

export { read__AllReferalEarning, create__ReferalEarning };
