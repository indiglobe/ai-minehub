import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  char,
  timestamp,
  float,
  tinyint,
  smallint,
} from "drizzle-orm/mysql-core";
import { id } from "@repo/utils/id";
import { relations } from "drizzle-orm";

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export type TableIdentifierToken =
  /**
   * UserTable
   */
  | "USER"
  /**
   * RatingTable
   */
  | "RTNG"
  /**
   * MiningWalletTable
   */
  | "MWAL"
  /**
   * NewsTable
   */
  | "NEWS"
  /**
   * MiningOrderTable
   */
  | "MORD"
  /**
   * MiningProfileTable
   */
  | "MPRO"
  /**
   * TradingWalletTable
   */
  | "TWAL";

export const roleEnums = mysqlEnum("user_role", ["admin", "basic"]);
export const updatedAt = () =>
  timestamp("updated_at", {
    mode: "date",
    fsp: 6,
  })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull();
export const createdAt = () =>
  timestamp("created_at", {
    mode: "date",
    fsp: 6,
  })
    .$defaultFn(() => new Date())
    .notNull();
export const metadataTimestamp = {
  createdAt: createdAt(),
  updatedAt: updatedAt(),
};
export const tableIdentifierToken = mysqlEnum("table_identifier_token", [
  "USER",
  "TWAL",
  "MWAL",
  "RTNG",
  "MORD",
  "NEWS",
  "MPRO",
] as [TableIdentifierToken, ...TableIdentifierToken[]]);
export const tokenColumn = (token: TableIdentifierToken) =>
  tableIdentifierToken.notNull().default(token);

// -------------------------
// UserTable
// -------------------------

export const UserTable = mysqlTable("users", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),
  fullName: varchar("full_name", {
    length: 255,
  }).notNull(),
  avatarUrl: varchar("avatar_url", {
    length: 255,
  }).notNull(),
  age: int("age").notNull(),
  role: roleEnums.notNull().$default(() => "basic"),
  phoneNumber: char("phone_number", {
    length: 10,
  }).notNull(),
  referrerId: char("referrer_id", { length: 10 }),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("USER"),
});

// -------------------------
// TradingWalletTable
// -------------------------

export const TradingWalletTable = mysqlTable("trading_wallet", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  balance: float({ precision: 2 }).$default(() => 0),
  associatedUser: char({ length: 10 })
    .unique()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("TWAL"),
});

// -------------------------
// MiningWalletTable
// -------------------------

export const MiningWalletTable = mysqlTable("mining_wallet", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  balance: float({ precision: 2 }).$default(() => 0),
  associatedUser: char({ length: 10 })
    .unique()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("MWAL"),
});

// -------------------------
// RatingTable
// -------------------------

export const RatingTable = mysqlTable("rating", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  associatedUser: char({ length: 10 })
    .unique()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  ratingStar: tinyint("rating_star_count")
    .$defaultFn(() => 1)
    .notNull(),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("RTNG"),
});

// -------------------------
// NewsTable
// -------------------------

export const NewsTable = mysqlTable("news", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  effectiveDate: timestamp("effective_date", {
    mode: "date",
    fsp: 6,
  }).notNull(),
  heading: varchar("heading", { length: 255 }).notNull(),
  details: varchar("details", { length: 1023 }).notNull(),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("NEWS"),
});

// -------------------------
// MiningProfileTable
// -------------------------

export const MiningProfileTable = mysqlTable("mining_profile", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  maximumAllowedAmount: int().notNull(),
  minimumAllowedAmount: int().notNull(),
  lockinPeriod: smallint().notNull(),
  category: varchar({ length: 50 }).notNull(),
  dailyReturn: float({ precision: 2 }).notNull(),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("MPRO"),
});

// -------------------------
// MiningOrderTable
// -------------------------

export const MiningOrderTable = mysqlTable("mining_order", {
  id: char("id", { length: 10 })
    .primaryKey()
    .$defaultFn(() => id()),
  orderedBy: char("ordered_by", { length: 10 })
    .notNull()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  amountInvested: int().notNull(),
  miningProfileUsed: char("mining_profile_used", {
    length: 10,
  })
    .notNull()
    .references(() => MiningProfileTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  ...metadataTimestamp,
  tableIdentifierToken: tokenColumn("MORD"),
});

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  tradingWallet: one(TradingWalletTable, {
    fields: [UserTable.id],
    references: [TradingWalletTable.associatedUser],
  }),
  miningWallet: one(MiningWalletTable, {
    fields: [UserTable.id],
    references: [MiningWalletTable.associatedUser],
  }),
  rating: one(RatingTable, {
    fields: [UserTable.id],
    references: [RatingTable.associatedUser],
  }),
  referredBy: one(UserTable, {
    fields: [UserTable.referrerId],
    references: [UserTable.id],
    relationName: "UserReferrals",
  }),
  referrals: many(UserTable, {
    relationName: "UserReferrals",
  }),
  miningOrders: many(MiningOrderTable),
}));

export const TradingWalletRelations = relations(
  TradingWalletTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [TradingWalletTable.associatedUser],
      references: [UserTable.id],
    }),
  }),
);

export const MiningWalletRelations = relations(
  MiningWalletTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [MiningWalletTable.associatedUser],
      references: [UserTable.id],
    }),
  }),
);

export const RatingRelations = relations(RatingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [RatingTable.associatedUser],
    references: [UserTable.id],
  }),
}));

export const MiningProfileRelations = relations(
  MiningProfileTable,
  ({ many }) => ({
    orders: many(MiningOrderTable),
  }),
);

export const MiningOrderRelations = relations(MiningOrderTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [MiningOrderTable.orderedBy],
    references: [UserTable.id],
  }),
  miningProfile: one(MiningProfileTable, {
    fields: [MiningOrderTable.miningProfileUsed],
    references: [MiningProfileTable.id],
  }),
}));

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------

/**
 * This is used to identify which table the data is from,
 * and if there is any querry we have to do we can understand
 * in which table we have to do the query.
 */
export function identifyTable(tableIdentifierToken: string) {
  const prefix = tableIdentifierToken as TableIdentifierToken;

  switch (prefix) {
    case "USER":
      return "UserTable" as const;
    case "TWAL":
      return "TradingWalletTable" as const;
    case "MWAL":
      return "MiningWalletTable" as const;
    case "NEWS":
      return "NewsTable" as const;
    case "RTNG":
      return "RatingTable" as const;

    default:
      throw new Error("Provide a valid prefix to identify table name.");
  }
}
