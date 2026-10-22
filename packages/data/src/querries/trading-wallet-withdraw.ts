import { Table__TradingWalletWithdraw } from "@/schema";
import { id } from "@repo/utils/id";
import { db } from "..";
import { tryCatch } from "@repo/utils/try-catch";
import { eq } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__TradingWalletWithdraw = {
  dataToInsert: Omit<
    typeof Table__TradingWalletWithdraw.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__TradingWalletWithdraw = async (
  options: TCreate__TradingWalletWithdraw,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__TradingWalletWithdraw)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__TradingWalletWithdraw`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedTradingWithdraw] = await db
      .select()
      .from(Table__TradingWalletWithdraw)
      .where(eq(Table__TradingWalletWithdraw.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedTradingWithdraw!;
  }

  throw Error("Unexpected block in create__TradingWalletWithdraw");
};

export { create__TradingWalletWithdraw };
