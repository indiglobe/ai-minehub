import { db } from "@/index";
import {
  Table__MiningOrder,
  Table__MiningWallet,
  Table__Rating,
  Table__TradingOrder,
  Table__TradingWallet,
  Table__User,
} from "@/schema";
import { and, desc, eq, getTableColumns, sql, SQL } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

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
 * ----------------------------------------
 * CREATE
 * ----------------------------------------
 */

type TCreate__User = Omit<
  typeof Table__User.$inferInsert,
  "tableIdentifierToken" | "id" | "createdAt"
>;

/**
 * create user
 */
const create__User = async (data: TCreate__User) => {
  await db.insert(Table__User).values(data);

  return (await read__OneUser({
    identifier: {
      email: data.email,
    },
  }))!;
};

/**
 * ----------------------------------------
 * READ (USER COUNT)
 * ----------------------------------------
 */

// const read__UserCount = async () => {
//   const queryResult = await db.$count(Table__User);

//   return queryResult;
// };

/**
 * ----------------------------------------
 * READ (ALL)
 * ----------------------------------------
 */

type TRead__AllUsers = {
  identifier?: {
    role?: (typeof Table__User.$inferSelect)["role"];
    referrerId?: (typeof Table__User.$inferSelect)["referrerId"];
  };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };
};

/**
 * Fetch multiple user records from the database.
 *
 * Supports filtering by role, pagination, and optional inclusion
 * of related mining wallet, trading wallet, and rating details.
 *
 * @param options.identifier.role - Filter users by role
 * @param options.queryOptions.skip - Number of records to skip (pagination offset)
 * @param options.queryOptions.limit - Maximum number of records to return
 * @returns Array of user records with optional relations
 */

const read__AllUsers = async (options?: TRead__AllUsers) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const conditions: SQL[] = [];

  if (options?.identifier?.role) {
    conditions.push(eq(Table__User.role, options.identifier.role));
  }

  if (options?.identifier?.referrerId) {
    conditions.push(eq(Table__User.referrerId, options.identifier.referrerId));
  }

  const baseQuery = db.select().from(Table__User).limit(limit).offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  const dbResponse = await baseQuery;

  return dbResponse;
};

/**
 * ----------------------------------------
 * READ (ONE)
 * ----------------------------------------
 */

type TRead__OneUser = {
  identifier:
    | {
        id: (typeof Table__User.$inferSelect)["id"];
      }
    | {
        email: (typeof Table__User.$inferSelect)["email"];
      };

  queryOptions?: {
    skip?: number;
    limit?: number;
  };

  joiningOptions?: Partial<{
    referrer: true;
    tradingWallet: true;
    miningWallet: true;
    rating: true;
    referrals: true;
    miningOrders: true;
    tradingOrders: true;
  }>;

  selectedFields?: Partial<
    Record<keyof typeof Table__User.$inferSelect, true> &
      Partial<{
        referrer: Partial<Record<keyof typeof Table__User.$inferSelect, true>>;
        tradingWallet: Partial<
          Record<keyof typeof Table__TradingWallet.$inferSelect, true>
        >;
        miningWallet: Partial<
          Record<keyof typeof Table__MiningWallet.$inferSelect, true>
        >;
        rating: Partial<Record<keyof typeof Table__Rating.$inferSelect, true>>;
        referrals: Partial<Record<keyof typeof Table__User.$inferSelect, true>>;
        miningOrders: Partial<
          Record<keyof typeof Table__MiningOrder.$inferSelect, true>
        >;
        tradingOrders: Partial<
          Record<keyof typeof Table__TradingOrder.$inferSelect, true>
        >;
      }>
  >;
};

/**
 * Fetch a single user record from the database by email.
 *
 * Optionally includes related mining wallet, trading wallet,
 * and rating details based on join configuration.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @param options.joinOptions.miningWallet - Include mining wallet relation
 * @param options.joinOptions.tradingWalletDetails - Include trading wallet relation
 * @param options.joinOptions.ratingDetails - Include rating relation
 * @returns User record if found, otherwise null
 */

const read__OneUser = async (options: TRead__OneUser) => {
  const skip = options?.queryOptions?.skip ?? 0;
  const limit = options?.queryOptions?.limit ?? Number.MAX_SAFE_INTEGER;

  const ReferrerTable__User = alias(Table__User, "referrer");
  const ReferralsTable__User = alias(Table__User, "referrals");

  const userColumns = getTableColumns(Table__User);
  const referrerColumns = getTableColumns(ReferrerTable__User);
  const referralsColumns = getTableColumns(ReferralsTable__User);
  const miningOrderColumns = getTableColumns(Table__MiningOrder);
  const miningWalletColumns = getTableColumns(Table__MiningWallet);
  const ratingColumns = getTableColumns(Table__Rating);
  const tradingOrderColumns = getTableColumns(Table__TradingOrder);
  const tradingWalletColumns = getTableColumns(Table__TradingWallet);

  const conditions: SQL[] = [];

  if ("email" in options.identifier) {
    conditions.push(eq(Table__User.email, options.identifier.email));
  }

  if ("id" in options.identifier) {
    conditions.push(eq(Table__User.id, options.identifier.id));
  }

  const filteredUserFields = options?.selectedFields
    ? (Object.fromEntries(
        Object.entries(options.selectedFields)
          .filter(
            ([key, value]) =>
              key in userColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => [key, userColumns[key as keyof typeof userColumns]]),
      ) as typeof userColumns)
    : userColumns;

  const filteredReferrerFields =
    options?.joiningOptions?.referrer && options.selectedFields?.referrer
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.referrer)
            .filter(
              ([key, value]) =>
                key in referrerColumns && typeof value === "boolean" && value,
            )
            .map(([key]) => [
              key,
              referrerColumns[key as keyof typeof referrerColumns],
            ]),
        ) as typeof referrerColumns)
      : options?.joiningOptions?.referrer && !options.selectedFields
        ? referrerColumns
        : undefined;

  const filteredRatingFields =
    options?.joiningOptions?.rating && options.selectedFields?.rating
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.rating)
            .filter(
              ([key, value]) =>
                key in ratingColumns && typeof value === "boolean" && value,
            )
            .map(([key]) => [
              key,
              ratingColumns[key as keyof typeof ratingColumns],
            ]),
        ) as typeof ratingColumns)
      : options?.joiningOptions?.rating && !options.selectedFields
        ? ratingColumns
        : undefined;

  const filteredMiningWalletFields =
    options?.joiningOptions?.miningWallet &&
    options.selectedFields?.miningWallet
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.miningWallet)
            .filter(
              ([key, value]) =>
                key in miningWalletColumns &&
                typeof value === "boolean" &&
                value,
            )
            .map(([key]) => [
              key,
              miningWalletColumns[key as keyof typeof miningWalletColumns],
            ]),
        ) as typeof miningWalletColumns)
      : options?.joiningOptions?.miningWallet && !options.selectedFields
        ? miningWalletColumns
        : undefined;

  const filteredTradingWalletFields =
    options?.joiningOptions?.tradingWallet &&
    options.selectedFields?.tradingWallet
      ? (Object.fromEntries(
          Object.entries(options.selectedFields.tradingWallet)
            .filter(
              ([key, value]) =>
                key in tradingWalletColumns &&
                typeof value === "boolean" &&
                value,
            )
            .map(([key]) => [
              key,
              tradingWalletColumns[key as keyof typeof tradingWalletColumns],
            ]),
        ) as typeof tradingWalletColumns)
      : options?.joiningOptions?.tradingWallet && !options.selectedFields
        ? tradingWalletColumns
        : undefined;

  // MANY FILEDS

  const targetMiningOrdersFields =
    options?.joiningOptions?.miningOrders &&
    options.selectedFields?.miningOrders
      ? Object.entries(options.selectedFields.miningOrders)
          .filter(
            ([key, value]) =>
              key in miningOrderColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => key)
      : options?.joiningOptions?.miningOrders
        ? Object.keys(miningOrderColumns)
        : [];

  const miningOrderJsonObjectArgs: SQL[] = [];
  if (
    options?.joiningOptions?.miningOrders &&
    targetMiningOrdersFields.length > 0
  ) {
    for (const key of targetMiningOrdersFields) {
      const column = miningOrderColumns[key as keyof typeof miningOrderColumns];
      miningOrderJsonObjectArgs.push(sql`${key}`);
      miningOrderJsonObjectArgs.push(sql`${column}`);
    }
  }

  const targetTradingOrdersFields =
    options?.joiningOptions?.tradingOrders &&
    options.selectedFields?.tradingOrders
      ? Object.entries(options.selectedFields.tradingOrders)
          .filter(
            ([key, value]) =>
              key in tradingOrderColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => key)
      : options?.joiningOptions?.tradingOrders
        ? Object.keys(tradingOrderColumns)
        : [];

  const tradingOrderJsonObjectArgs: SQL[] = [];
  if (
    options?.joiningOptions?.tradingOrders &&
    targetTradingOrdersFields.length > 0
  ) {
    for (const key of targetTradingOrdersFields) {
      const column =
        tradingOrderColumns[key as keyof typeof tradingOrderColumns];
      tradingOrderJsonObjectArgs.push(sql`${key}`);
      tradingOrderJsonObjectArgs.push(sql`${column}`);
    }
  }

  const targetReferralsFields =
    options?.joiningOptions?.referrals && options.selectedFields?.referrals
      ? Object.entries(options.selectedFields.referrals)
          .filter(
            ([key, value]) =>
              key in referralsColumns && typeof value === "boolean" && value,
          )
          .map(([key]) => key)
      : options?.joiningOptions?.referrals
        ? Object.keys(referralsColumns)
        : [];

  const referralsJsonObjectArgs: SQL[] = [];
  if (options?.joiningOptions?.referrals && targetReferralsFields.length > 0) {
    for (const key of targetReferralsFields) {
      const column = referralsColumns[key as keyof typeof referralsColumns];
      referralsJsonObjectArgs.push(sql`${key}`);
      referralsJsonObjectArgs.push(sql`${column}`);
    }
  }

  const selectedQueryFields = {
    ...filteredUserFields,

    ...(filteredReferrerFields && options?.joiningOptions?.referrer
      ? {
          referrer: {
            ...filteredReferrerFields,
          },
        }
      : {}),

    ...(filteredRatingFields && options?.joiningOptions?.rating
      ? {
          rating: {
            ...filteredRatingFields,
          },
        }
      : {}),

    ...(filteredMiningWalletFields && options?.joiningOptions?.miningWallet
      ? {
          miningWallet: {
            ...filteredMiningWalletFields,
          },
        }
      : {}),

    ...(filteredTradingWalletFields && options?.joiningOptions?.tradingWallet
      ? {
          tradingWallet: {
            ...filteredTradingWalletFields,
          },
        }
      : {}),

    ...(options?.joiningOptions?.referrals
      ? {
          referrals:
            referralsJsonObjectArgs.length > 0
              ? sql<(typeof ReferralsTable__User.$inferSelect)[]>`
                  COALESCE(
                    JSON_ARRAYAGG(
                      CASE
                        WHEN ${ReferralsTable__User.id} IS NOT NULL
                        THEN JSON_OBJECT(${sql.join(referralsJsonObjectArgs, sql`, `)})
                      END
                    ),
                    JSON_ARRAY()
                  )
                `
              : sql<(typeof ReferralsTable__User.$inferSelect)[]>`JSON_ARRAY()`,
        }
      : {}),

    ...(options?.joiningOptions?.miningOrders
      ? {
          miningOrders:
            miningOrderJsonObjectArgs.length > 0
              ? sql<(typeof Table__MiningOrder.$inferSelect)[]>`
                  COALESCE(
                    JSON_ARRAYAGG(
                      DISTINCT JSON_OBJECT(
                        ${sql.join(miningOrderJsonObjectArgs, sql`, `)}
                      )
                    ),
                    JSON_ARRAY()
                  )
                `
              : sql<(typeof Table__MiningOrder.$inferSelect)[]>`JSON_ARRAY()`,
        }
      : {}),

    ...(options?.joiningOptions?.tradingOrders
      ? {
          tradingOrders:
            tradingOrderJsonObjectArgs.length > 0
              ? sql<(typeof Table__TradingOrder.$inferSelect)[]>`
                  COALESCE(
                    JSON_ARRAYAGG(
                      CASE
                        WHEN ${Table__TradingOrder.id} IS NOT NULL
                        THEN JSON_OBJECT(${sql.join(tradingOrderJsonObjectArgs, sql`, `)})
                      END
                    ),
                    JSON_ARRAY()
                  )
                `
              : sql<(typeof Table__TradingOrder.$inferSelect)[]>`JSON_ARRAY()`,
        }
      : {}),
  };

  const baseQuery = db
    .select(selectedQueryFields)
    .from(Table__User)
    .limit(limit)
    .offset(skip);

  if (conditions.length > 0) {
    baseQuery.where(and(...conditions));
  }

  if (options.joiningOptions?.referrer) {
    baseQuery.leftJoin(
      ReferrerTable__User,
      eq(ReferrerTable__User.id, Table__User.referrerId),
    );
  }

  if (options.joiningOptions?.tradingWallet) {
    baseQuery.leftJoin(
      Table__TradingWallet,
      eq(Table__TradingWallet.associatedUser, Table__User.id),
    );
  }

  if (options.joiningOptions?.miningWallet) {
    baseQuery.leftJoin(
      Table__MiningWallet,
      eq(Table__MiningWallet.associatedUser, Table__User.id),
    );
  }

  if (options.joiningOptions?.rating) {
    baseQuery.leftJoin(
      Table__Rating,
      eq(Table__Rating.associatedUser, Table__User.id),
    );
  }

  if (options.joiningOptions?.referrals) {
    baseQuery
      .leftJoin(
        ReferralsTable__User,
        eq(ReferralsTable__User.referrerId, Table__User.id),
      )
      .groupBy(Table__User.id);
  }

  if (options?.joiningOptions?.miningOrders) {
    baseQuery
      .leftJoin(
        Table__MiningOrder,
        eq(Table__MiningOrder.orderedBy, Table__User.id),
      )
      .groupBy(Table__MiningOrder.orderedBy);
  }

  if (options?.joiningOptions?.tradingOrders) {
    baseQuery
      .leftJoin(
        Table__TradingOrder,
        eq(Table__TradingOrder.orderedBy, Table__User.id),
      )
      .groupBy(Table__TradingOrder.orderedBy);
  }

  const [dbResponse] = await baseQuery;

  return dbResponse ? dbResponse : null;
};

/**
 * ----------------------------------------
 * UPDATE
 * ----------------------------------------
 */

// type TUpdate__User = {
//   identifier:
//     | {
//         email: (typeof Table__User.$inferSelect)["email"];
//       }
//     | {
//         id: (typeof Table__User.$inferSelect)["id"];
//       };

//   dataToUpdate: Partial<
//     Omit<
//       typeof Table__User.$inferInsert,
//       "email" | "tableIdentifierToken" | "referrerCode" | "id"
//     >
//   >;
// };

/**
 * Update an existing user record in the database.
 *
 * Only provided fields in `dataToUpdate` are updated. Undefined values are ignored.
 * User is identified uniquely by email.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @param options.dataToUpdate - Fields to update in the user record
 * @returns The updated user record if successful, otherwise null
 */

// const update__User = async ({ identifier, dataToUpdate }: TUpdate__User) => {
//   const filteredData = Object.fromEntries(
//     Object.entries(dataToUpdate).filter(([, value]) => value !== undefined),
//   ) as typeof dataToUpdate;

//   if (Object.keys(filteredData).length === 0) {
//     return null;
//   }

//   const conditions: SQL[] = [];

//   if ("email" in identifier) {
//     conditions.push(eq(Table__User.email, identifier.email));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(Table__User.id, identifier.id));
//   }

//   await db
//     .update(Table__User)
//     .set(filteredData)
//     .where(and(...conditions));

//   return await read__OneUser({
//     identifier,
//   });
// };

/**
 * ----------------------------------------
 * DELETE
 * ----------------------------------------
 */

// type TDelete__User = {
//   identifier:
//     | {
//         email: (typeof Table__User.$inferSelect)["email"];
//       }
//     | {
//         id: (typeof Table__User.$inferSelect)["id"];
//       };
// };

/**
 * Delete a user record from the database.
 *
 * First checks whether the user exists before performing deletion.
 * User is identified uniquely by email.
 *
 * @param options.identifier.email - Unique email identifier for the user
 * @returns The deleted user record if it existed, otherwise null
 */

// const delete__User = async (options: TDelete__User) => {
//   const { identifier } = options;

//   const conditions: SQL[] = [];

//   if ("email" in identifier) {
//     conditions.push(eq(Table__User.email, identifier.email));
//   }

//   if ("id" in identifier) {
//     conditions.push(eq(Table__User.id, identifier.id));
//   }

//   const existingUser = await read__OneUser({
//     identifier,
//   });

//   if (!existingUser) {
//     return null;
//   }

//   await db.delete(Table__User).where(and(...conditions));

//   return existingUser;
// };

export {
  create__User,
  read__AllUsers,
  read__OneUser,
  // update__User,
  // delete__User,
  // read__UserCount,
};
