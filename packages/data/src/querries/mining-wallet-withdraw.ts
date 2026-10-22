import { Table__MiningWalletWithdraw } from "@/schema";
import { id } from "@repo/utils/id";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { eq } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
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

export { create__MiningWalletWithdraw };
