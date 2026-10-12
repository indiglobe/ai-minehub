import { db } from "@/index";
import { Table__MiningWalletDeposits } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { eq } from "drizzle-orm";
import { id } from "@repo/utils/id";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TCreate__MiningWalletDeposite = {
  dataToInsert: Omit<
    typeof Table__MiningWalletDeposits.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt"
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

  throw Error('Unexpected block in create__MiningWalletDeposite')
};

export { create__MiningWalletDeposite };
