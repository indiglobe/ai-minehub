import { db } from "@/index";
import { MiningOrderTable, MiningProfileTable, UserTable } from "@/schema";
import { and, desc, eq, getTableColumns, SQL } from "drizzle-orm";

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllMiningOrders = {
  identifier?: Partial<{
    miningProfileUsed: string;
    miningStatus: "active" | "completed";
    userId: string;
  }>;

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joiningOptions?: Partial<{
    user: true;
    miningProfile: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof MiningOrderTable.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof UserTable.$inferSelect, true>>;
      miningProfile: Partial<
        Record<keyof typeof MiningProfileTable.$inferSelect, true>
      >;
    }>;
};

const read__AllMiningOrders = async (options?: TRead__AllMiningOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const userColumns = getTableColumns(UserTable);
  const miningOrderColumns = getTableColumns(MiningOrderTable);
  const miningProfileColumns = getTableColumns(MiningProfileTable);

  const conditions: SQL[] = [];

  conditions.push(desc(MiningOrderTable.createdAt));

  if (options?.identifier?.userId) {
    conditions.push(eq(MiningOrderTable.orderedBy, options.identifier.userId));
  }

  if (options?.identifier?.miningProfileUsed) {
    conditions.push(
      eq(
        MiningOrderTable.miningProfileUsed,
        options.identifier.miningProfileUsed,
      ),
    );
  }

  if (options?.identifier?.miningStatus) {
    conditions.push(
      eq(MiningOrderTable.miningStatus, options.identifier.miningStatus),
    );
  }

  const filteredMiningOrderTableFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in miningOrderColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => [
            key,
            miningOrderColumns[key as keyof typeof miningOrderColumns],
          ]),
      ) as typeof miningOrderColumns)
    : miningOrderColumns;

  const filteredUsersFields =
    options?.joiningOptions?.user && options.selectedFields?.user
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.user)
            .filter(
              ([key, value]) =>
                key in userColumns && typeof value === "boolean" && value,
            )
            .map(([key]) => [
              key,
              userColumns[key as keyof typeof userColumns],
            ]),
        ) as typeof userColumns)
      : options?.joiningOptions?.user
        ? userColumns
        : undefined;

  const filteredMiningProfileFields =
    options?.joiningOptions?.miningProfile &&
    options.selectedFields?.miningProfile
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.miningProfile)
            .filter(
              ([key, value]) =>
                key in miningProfileColumns &&
                typeof value === "boolean" &&
                value,
            )
            .map(([key]) => [
              key,
              miningProfileColumns[key as keyof typeof miningProfileColumns],
            ]),
        ) as typeof miningProfileColumns)
      : options?.joiningOptions?.miningProfile
        ? miningProfileColumns
        : undefined;

  const selectedQueryFields = {
    ...filteredMiningOrderTableFields,

    ...(filteredUsersFields && options?.selectedFields?.user
      ? {
          users: {
            ...filteredUsersFields,
          },
        }
      : {}),

    ...(filteredMiningProfileFields && options?.selectedFields?.miningProfile
      ? {
          miningProfile: {
            ...filteredMiningProfileFields,
          },
        }
      : {}),
  };

  const baseQuery = db
    .select(selectedQueryFields)
    .from(MiningOrderTable)
    .limit(limit)
    .offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  if (options?.joiningOptions?.user) {
    baseQuery.leftJoin(UserTable, eq(UserTable.id, MiningOrderTable.orderedBy));
  }

  if (options?.joiningOptions?.miningProfile) {
    baseQuery.leftJoin(
      MiningProfileTable,
      eq(MiningProfileTable.id, MiningOrderTable.miningProfileUsed),
    );
  }

  const queryResult = await baseQuery;

  return queryResult;
};

export { read__AllMiningOrders };
