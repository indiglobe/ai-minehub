import { db } from "@/index";
import { Table__TradingWalletDeposits } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { eq } from "drizzle-orm";
import { id } from "@repo/utils/id";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TCreate__TradingWalletDeposite = {
  dataToInsert: Omit<
    typeof Table__TradingWalletDeposits.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__TradingWalletDeposite = async (
  options: TCreate__TradingWalletDeposite,
) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__TradingWalletDeposits)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(
      `Error in queryOperationError in create__TradingWalletDeposite`,
    );
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedTradingDeposit] = await db
      .select()
      .from(Table__TradingWalletDeposits)
      .where(eq(Table__TradingWalletDeposits.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedTradingDeposit!;
  }

  throw Error("Unexpected block in create__TradingWalletDeposite");
};

export { create__TradingWalletDeposite };
