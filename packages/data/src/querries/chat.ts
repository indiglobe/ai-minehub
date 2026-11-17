import { db } from "@/index";
import { Table__Chat } from "@/schema";
import { tryCatch } from "@repo/utils/try-catch";
import { and, desc, eq, getTableColumns, inArray, or, SQL } from "drizzle-orm";
import { id } from "@repo/utils/id";

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * CREATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TCreate__Chat = {
  dataToInsert: Omit<
    typeof Table__Chat.$inferInsert,
    "updatedAt" | "tableIdentifierToken" | "createdAt" | "id"
  >;
};

const create__Chat = async (options: TCreate__Chat) => {
  const genereatedId = id();

  const baseQuery = db
    .insert(Table__Chat)
    .values({ ...options.dataToInsert, id: genereatedId });

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in create__Chat`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  if (queryOperationResult[0].affectedRows === 1) {
    const [insertedChat] = await db
      .select()
      .from(Table__Chat)
      .where(eq(Table__Chat.id, genereatedId))
      .limit(1)
      .offset(0);
    return insertedChat!;
  }

  throw Error("Unexpected block in create__Chat");
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * READ (ALL)
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

type TRead__AllChats = {
  identifier: Partial<{
    involvedUser: string | string[];
  }>;
  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

const read__AllChats = async (options: TRead__AllChats) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { tableIdentifierToken: chatTableIdentifierToken, ...chat } =
    getTableColumns(Table__Chat);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const conditions: SQL[] = [];

  if (options.identifier.involvedUser) {
    const involvedUsers = Array.isArray(options.identifier.involvedUser)
      ? options.identifier.involvedUser
      : [options.identifier.involvedUser];
    conditions.push(
      or(
        inArray(Table__Chat.senderId, involvedUsers),
        inArray(Table__Chat.reciverId, involvedUsers),
      )!,
    );
  }

  const baseQuery = db
    .select({
      ...chat,
    })
    .from(Table__Chat)
    .limit(limit)
    .offset(skip)
    .orderBy(desc(Table__Chat.createdAt));

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

  if (queryOperationError) {
    console.error(`Error in queryOperationError in read__AllMiningOrders`);
    console.error(queryOperationError);
    throw queryOperationError;
  }

  const chats = queryOperationResult;

  return chats;
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 * UPDATE
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

// type TUpdate__MiningOrder = {
//   identifier: {
//     id: (typeof Table__MiningOrder.$inferSelect)["id"];
//   };

//   dataToUpdate: Partial<
//     Omit<
//       typeof Table__MiningOrder.$inferInsert,
//       "tableIdentifierToken" | "createdAt" | "updatedAt" | "id"
//     >
//   >;
// };

// const update__MiningOrder = async (options: TUpdate__MiningOrder) => {
//   const conditions: SQL[] = [];

//   conditions.push(eq(Table__MiningOrder.id, options.identifier.id));

//   const baseQuery = db
//     .update(Table__MiningOrder)
//     .set({ ...options.dataToUpdate })
//     .where(and(...conditions));

//   const [queryOperationError, queryOperationResult] = await tryCatch(baseQuery);

//   if (queryOperationError) {
//     console.error(`Error in queryOperationError in update__MiningOrder`);
//     console.error(queryOperationError);
//     throw queryOperationError;
//   }

//   if (queryOperationResult[0].affectedRows === 1) {
//     const [updatedMiningOrder] = await db
//       .select()
//       .from(Table__MiningOrder)
//       .where(and(...conditions))
//       .limit(1)
//       .offset(0);

//     return updatedMiningOrder!;
//   }

//   throw Error("Unexpected block in update__MiningOrder");
// };

export {
  //

  read__AllChats,
  create__Chat,
  // update__MiningOrder,
};
