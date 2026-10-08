/**
 * ⚠️ WARNING: ENTERING THE FORBIDDEN REALM OF DRIZZLE.
 *
 * This query is significantly more complicated than it has any right to be.
 * If you're reading this, congratulations — you have made it this far.
 *
 * Do not assume that you will understand this query immediately.
 * I certainly didn't.
 * I wrote it.
 * I stared at it for several hours.
 * I questioned several of my life choices.
 * I eventually got it working.
 *
 * At some point, I understood exactly what every join, subquery, condition,
 * and deeply questionable piece of SQL wizardry was doing.
 *
 * That understanding has since left my body.
 *
 * If you're planning to modify this query, please take a moment to ask yourself:
 * "Do I really need to do this?"
 *
 * If the answer is yes, may God have mercy on both of us.
 *
 * Also, future me:
 * If you're reading this and thinking,
 * "What the hell was I thinking when I wrote this?"
 * The answer is: I don't know.
 *
 * Good luck.
 * May your types be inferred, your joins be correct,
 * and your query planner show mercy.
 */

import { db } from "@/index";
import { Table__MiningOrder, Table__MiningProfile, Table__User } from "@/schema";
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
    Record<keyof typeof Table__MiningOrder.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof Table__User.$inferSelect, true>>;
      miningProfile: Partial<
        Record<keyof typeof Table__MiningProfile.$inferSelect, true>
      >;
    }>;
};

const read__AllMiningOrders = async (options?: TRead__AllMiningOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const userColumns = getTableColumns(Table__User);
  const miningOrderColumns = getTableColumns(Table__MiningOrder);
  const miningProfileColumns = getTableColumns(Table__MiningProfile);

  const conditions: SQL[] = [];

  if (options?.identifier?.userId) {
    conditions.push(eq(Table__MiningOrder.orderedBy, options.identifier.userId));
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
    conditions.push(
      eq(Table__MiningOrder.miningStatus, options.identifier.miningStatus),
    );
  }

  const filteredTable__MiningOrderFields = options?.selectedFields
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
      : options?.joiningOptions?.user && !options.selectedFields
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
      : options?.joiningOptions?.miningProfile && !options.selectedFields
        ? miningProfileColumns
        : undefined;


  const selectedQueryFields = {
    ...filteredTable__MiningOrderFields,

    ...(filteredUsersFields && options?.joiningOptions?.user
      ? {
          users: {
            ...filteredUsersFields,
          },
        }
      : {}),

    ...(filteredMiningProfileFields && options?.joiningOptions?.miningProfile
      ? {
          miningProfile: {
            ...filteredMiningProfileFields,
          },
        }
      : {}),
  };

  const baseQuery = db
    .select(selectedQueryFields)
    .from(Table__MiningOrder)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__MiningOrder.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  if (options?.joiningOptions?.user) {
    baseQuery.leftJoin(Table__User, eq(Table__User.id, Table__MiningOrder.orderedBy));
  }

  if (options?.joiningOptions?.miningProfile) {
    baseQuery.leftJoin(
      Table__MiningProfile,
      eq(Table__MiningProfile.id, Table__MiningOrder.miningProfileUsed),
    );
  }

  const queryResult = await baseQuery;

  return queryResult;
};

export { read__AllMiningOrders };
