import { db } from "@/index";
import { Table__TradingOrder, Table__User } from "@/schema";
import { and, desc, eq, getTableColumns, SQL } from "drizzle-orm";

type TRead__AllTradingOrders = {
  identifier?: Partial<{
    userId: string;
  }>;

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joiningOptions?: Partial<{
    user: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof Table__TradingOrder.$inferSelect, true>
  > &
    Partial<{
      user: Partial<Record<keyof typeof Table__User.$inferSelect, true>>;
    }>;
};

const read__AllTradingOrders = async (options?: TRead__AllTradingOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const userColumns = getTableColumns(Table__User);
  const tradingOrderColumns = getTableColumns(Table__TradingOrder);

  const conditions: SQL[] = [];

  if (options?.identifier?.userId) {
    conditions.push(eq(Table__TradingOrder.orderedBy, options.identifier.userId));
  }

  const filteredTradingTableFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in tradingOrderColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => [
            key,
            tradingOrderColumns[key as keyof typeof tradingOrderColumns],
          ]),
      ) as typeof tradingOrderColumns)
    : tradingOrderColumns;

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

  const selectedQueryFields = {
    ...filteredTradingTableFields,

    ...(filteredUsersFields && options?.joiningOptions?.user
      ? {
          users: {
            ...filteredUsersFields,
          },
        }
      : {}),
  };

  const baseQuery = db
    .select(selectedQueryFields)
    .from(Table__TradingOrder)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__TradingOrder.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  if (options?.joiningOptions?.user) {
    baseQuery.leftJoin(
      Table__User,
      eq(Table__User.id, Table__TradingOrder.orderedBy),
    );
  }

  const dbResponse = await baseQuery;

  return dbResponse;
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

// type TCreate__TradingOrder = Omit<
//   typeof Table__TradingOrder.$inferInsert,
//   "tableIdentifierToken" | "createdAt" | "updatedAt"
// >;

// const create__TradingOrder = async (data: TCreate__TradingOrder) => {
//   const generatedId = data.id ?? id();

//   await db.insert(Table__TradingOrder).values({
//     ...data,
//     id: generatedId,
//   });

//   return (await read__OneTradingOrder({
//     identifier: {
//       id: generatedId,
//     },
//   }))!;
// };

/**
 * ==========================================
 * READ (ALL) (OPTIONAL)
 * ==========================================
 */

// type TRead__AllTradingOrders = {
//   identifier?: Partial<{
//     userId: string;
//   }>;

//   queryOptions?: {
//     skip?: number;
//     limit?: number;
//   };

//   joinOptions?: Partial<{
//     user: true;
//   }>;
// };

// const read__AllTradingOrders = async (options?: TRead__AllTradingOrders) => {
//   const skip = options?.queryOptions?.skip ?? 0;
//   const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

//   const conditions: SQL[] = [];

//   if (options?.identifier?.userId) {
//     conditions.push(eq(Table__TradingOrder.orderedBy, options.identifier.userId));
//   }

//   return await db.query.Table__TradingOrder.findMany({
//     where: and(...conditions),
//     limit,
//     offset: skip,
//     orderBy: [desc(Table__TradingOrder.createdAt)],
//     with: {
//       ...(options?.joinOptions?.user ? { user: true } : {}),
//     },
//   });
// };

// const read__TraderCount = async () => {
//   const res = await db
//     .select({
//       status: Table__TradingOrder.tradingStatus,
//       count: sql<number>`count(*)`,
//     })
//     .from(Table__TradingOrder)
//     .where(inArray(Table__TradingOrder.tradingStatus, ["active", "completed"]))
//     .groupBy(Table__TradingOrder.tradingStatus);

//   return res;
// };

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

// type TRead__OneTradingOrder = {
//   identifier: { id: string };

//   joinOptions?: Partial<{
//     user: true;
//   }>;
// };

// const read__OneTradingOrder = async (options: TRead__OneTradingOrder) => {
//   const conditions: SQL[] = [];

//   if ("id" in options.identifier) {
//     conditions.push(eq(Table__TradingOrder.id, options.identifier.id));
//   }

//   const order = await db.query.Table__TradingOrder.findFirst({
//     where: and(...conditions),
//     with: {
//       ...(options.joinOptions?.user ? { user: true } : {}),
//     },
//   });

//   return order ? order : null;
// };

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

// type TUpdate__TradingOrder = {
//   identifier: {
//     id: string;
//   };

//   dataToUpdate: Partial<
//     Omit<typeof Table__TradingOrder.$inferInsert, "tableIdentifierToken" | "id">
//   >;
// };

// const update__TradingOrder = async (options: TUpdate__TradingOrder) => {
//   const filteredData = Object.fromEntries(
//     Object.entries(options.dataToUpdate).filter(
//       ([, value]) => value !== undefined,
//     ),
//   );

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   await db
//     .update(Table__TradingOrder)
//     .set(filteredData)
//     .where(eq(Table__TradingOrder.id, options.identifier.id));

//   return await read__OneTradingOrder({
//     identifier: options.identifier,
//   });
// };

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

// type TDelete__TradingOrder = {
//   identifier: {
//     id: string;
//   };
// };

// const delete__TradingOrder = async (options: TDelete__TradingOrder) => {
//   const existing = await read__OneTradingOrder({
//     identifier: options.identifier,
//   });

//   if (!existing) {
//     return null;
//   }

//   await db
//     .delete(Table__TradingOrder)
//     .where(eq(Table__TradingOrder.id, options.identifier.id));

//   return existing;
// };

export {
  // create__TradingOrder,
  read__AllTradingOrders,
  // read__OneTradingOrder,
  // read__TraderCount,
  // update__TradingOrder,
  // delete__TradingOrder,
};
