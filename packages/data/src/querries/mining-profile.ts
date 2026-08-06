import { db } from "@/index";
import { MiningProfileTable } from "@/schema";
import { id } from "@repo/utils/id";
import { and, desc, eq, SQL } from "drizzle-orm";

/**
 * ==========================================
 * MINING PROFILE MODULE
 * ==========================================
 */

export type TMiningProfile = typeof MiningProfileTable.$inferSelect;

/**
 * ==========================================
 * CREATE
 * ==========================================
 */

type TCreate__MiningProfile = Omit<
  typeof MiningProfileTable.$inferInsert,
  "tableIdentifierToken" | "updatedAt" | "createdAt"
>;

const create__MiningProfile = async (data: TCreate__MiningProfile) => {
  const generatedId = data.id ?? id();

  await db.insert(MiningProfileTable).values({ ...data, id: generatedId });

  return (await read__OneMiningProfile({
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

type TRead__AllMiningProfiles = {
  identifier?: {
    id?: string;
    category?: string;
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joinOptions?: Partial<{
    orders: true;
  }>;
};

const read__AllMiningProfiles = async (options?: TRead__AllMiningProfiles) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.id) {
    conditions.push(eq(MiningProfileTable.id, options.identifier.id));
  }

  if (options?.identifier?.category) {
    conditions.push(
      eq(MiningProfileTable.category, options.identifier.category),
    );
  }

  return await db.query.MiningProfileTable.findMany({
    where: and(...conditions),
    limit,
    offset: skip,
    orderBy: [desc(MiningProfileTable.createdAt)],
    with: {
      ...(options?.joinOptions?.orders ? { orders: true } : {}),
    },
  });
};

/**
 * ==========================================
 * READ (ONE)
 * ==========================================
 */

type TRead__OneMiningProfile = {
  identifier:
    | {
        id: string;
      }
    | {
        category: string;
      };

  joinOptions?: Partial<{
    orders: true;
  }>;
};

const read__OneMiningProfile = async (options: TRead__OneMiningProfile) => {
  const conditions: SQL[] = [];

  if ("id" in options.identifier) {
    conditions.push(eq(MiningProfileTable.id, options.identifier.id));
  }

  if ("category" in options.identifier) {
    conditions.push(
      eq(MiningProfileTable.category, options.identifier.category),
    );
  }

  const profile = await db.query.MiningProfileTable.findFirst({
    where: and(...conditions),
    with: {
      ...(options.joinOptions?.orders ? { orders: true } : {}),
    },
  });

  return profile ? profile : null;
};

/**
 * ==========================================
 * UPDATE
 * ==========================================
 */

type TUpdate__MiningProfile = {
  identifier: {
    id: string;
  };

  dataToUpdate: Partial<
    Omit<typeof MiningProfileTable.$inferInsert, "tableIdentifierToken" | "id">
  >;
};

const update__MiningProfile = async (options: TUpdate__MiningProfile) => {
  const filteredData = Object.fromEntries(
    Object.entries(options.dataToUpdate).filter(
      ([, value]) => value !== undefined,
    ),
  );

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  await db
    .update(MiningProfileTable)
    .set(filteredData)
    .where(eq(MiningProfileTable.id, options.identifier.id));

  return await read__OneMiningProfile({
    identifier: options.identifier,
  });
};

/**
 * ==========================================
 * DELETE
 * ==========================================
 */

type TDelete__MiningProfile = {
  identifier: {
    id: string;
  };
};

const delete__MiningProfile = async (options: TDelete__MiningProfile) => {
  const existing = await read__OneMiningProfile({
    identifier: options.identifier,
  });

  if (!existing) {
    return null;
  }

  await db
    .delete(MiningProfileTable)
    .where(eq(MiningProfileTable.id, options.identifier.id));

  return existing;
};

export type {
  TCreate__MiningProfile,
  TRead__AllMiningProfiles,
  TRead__OneMiningProfile,
  TUpdate__MiningProfile,
  TDelete__MiningProfile,
};

export {
  create__MiningProfile,
  read__AllMiningProfiles,
  read__OneMiningProfile,
  update__MiningProfile,
  delete__MiningProfile,
};
