import { db } from "@/index";
import { TradingOrderTable } from "@/schema";
import { id } from "@repo/utils/id";
import { and, desc, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * TRADING ORDER MODULE
 * ==========================================
 */

export type TTradingOrder = typeof TradingOrderTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__TradingOrder = Omit<
  typeof TradingOrderTable.$inferInsert,
  "tableIdentifierToken" | "createdAt" | "updatedAt"
>;

const create__TradingOrder = async (data: TCreate__TradingOrder) => {
  const generatedId = data.id ?? id();

  await db.insert(TradingOrderTable).values({
    ...data,
    id: generatedId,
  });

  return (await read__OneTradingOrder({
    identifier: {
      id: generatedId,
    },
  }))!;
};

/**
 * ==========================================
 * READ (ALL)
 * ==========================================
 */

type TRead__AllTradingOrders = {
  identifier?: Partial<{
    id: string;
  }>;

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: Partial<{
    user: true;
  }>;
};

const read__AllTradingOrders = async (options?: TRead__AllTradingOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.id) {
    conditions.push(eq(TradingOrderTable.id, options.identifier.id));
  }

  return await db.query.TradingOrderTable.findMany({
    where: and(...conditions),
    limit,
    offset: skip,
    orderBy: [desc(TradingOrderTable.createdAt)],
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneTradingOrder = {
  identifier: { id: string };

  joinOptions?: Partial<{
    user: true;
  }>;
};

const read__OneTradingOrder = async (options: TRead__OneTradingOrder) => {
  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(TradingOrderTable.id, options.identifier.id));
  }

  const order = await db.query.TradingOrderTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options.joinOptions?.user ? { user: true } : {}),
    },
  });

  return order ? order : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

type TUpdate__TradingOrder = {
  identifier: {
    id: string;
  };

  dataToUpdate: Partial<
    Omit<typeof TradingOrderTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

const update__TradingOrder = async (options: TUpdate__TradingOrder) => {
  const filteredData = Object.fromEntries(
    Object.entries(options.dataToUpdate).filter(
      ([, value]) => value !== undefined,
    ),
  );

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(TradingOrderTable)
    .set(filteredData)
    .where(eq(TradingOrderTable.id, options.identifier.id));

  return await read__OneTradingOrder({
    identifier: options.identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

type TDelete__TradingOrder = {
  identifier: {
    id: string;
  };
};

const delete__TradingOrder = async (options: TDelete__TradingOrder) => {
  const existing = await read__OneTradingOrder({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  await db
    .delete(TradingOrderTable)
    .where(eq(TradingOrderTable.id, options.identifier.id));

  return existing;
};

export type {
  TCreate__TradingOrder,
  TRead__AllTradingOrders,
  TRead__OneTradingOrder,
  TUpdate__TradingOrder,
  TDelete__TradingOrder,
};

export {
  create__TradingOrder,
  read__AllTradingOrders,
  read__OneTradingOrder,
  update__TradingOrder,
  delete__TradingOrder,
};
