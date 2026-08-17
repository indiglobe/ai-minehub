import { db } from "@/index";
import { MiningOrderTable } from "@/schema";
import { id } from "@repo/utils/id";
import { and, desc, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__MiningOrder = Omit<
  typeof MiningOrderTable.$inferInsert,
  "tableIdentifierToken" | "createdAt" | "updatedAt"
>;

const create__MiningOrder = async (data: TCreate__MiningOrder) => {
  const generatedId = data.id ?? id();

  await db.insert(MiningOrderTable).values({
    ...data,
    id: generatedId,
  });

  return (await read__OneMiningOrder({
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

  joinOptions?: Partial<{
    user: true;
    miningProfile: true;
  }>;
};

const read__AllMiningOrders = async (options?: TRead__AllMiningOrders) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

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

  return await db.query.MiningOrderTable.findMany({
    where: and(...conditions),
    limit,
    offset: skip,
    orderBy: [desc(MiningOrderTable.createdAt)],
    with: {
      ...(options?.joinOptions?.user ? { user: true } : {}),
      ...(options?.joinOptions?.miningProfile ? { miningProfile: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneMiningOrder = {
  identifier: { id: string };

  joinOptions?: Partial<{
    user: true;
    miningProfile: true;
  }>;
};

const read__OneMiningOrder = async (options: TRead__OneMiningOrder) => {
  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(MiningOrderTable.id, options.identifier.id));
  }

  const order = await db.query.MiningOrderTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options.joinOptions?.user ? { user: true } : {}),
      ...(options.joinOptions?.miningProfile ? { miningProfile: true } : {}),
    },
  });

  return order ? order : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

type TUpdate__MiningOrder = {
  identifier: {
    id: string;
  };

  dataToUpdate: Partial<
    Omit<typeof MiningOrderTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

const update__MiningOrder = async (options: TUpdate__MiningOrder) => {
  const filteredData = Object.fromEntries(
    Object.entries(options.dataToUpdate).filter(
      ([, value]) => value !== undefined,
    ),
  );

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(MiningOrderTable)
    .set(filteredData)
    .where(eq(MiningOrderTable.id, options.identifier.id));

  return read__OneMiningOrder({
    identifier: options.identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

type TDelete__MiningOrder = {
  identifier: {
    id: string;
  };
};

const delete__MiningOrder = async (options: TDelete__MiningOrder) => {
  const existing = await read__OneMiningOrder({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  await db
    .delete(MiningOrderTable)
    .where(eq(MiningOrderTable.id, options.identifier.id));

  return existing;
};

export {
  create__MiningOrder,
  read__AllMiningOrders,
  read__OneMiningOrder,
  update__MiningOrder,
  delete__MiningOrder,
};
