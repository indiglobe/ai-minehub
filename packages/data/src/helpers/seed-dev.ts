import { faker } from "@faker-js/faker";
import { db } from "..";

import {
  UserTable,
  MiningWalletTable,
  TradingWalletTable,
  RatingTable,
  NewsTable,
  MiningOrderTable,
  MiningProfileTable,
  TradingOrderTable,
  MiningWalletDepositsTable,
  MiningWalletWithdrawTable,
  TradingWalletDepositsTable,
  TradingWalletWithdrawTable,
} from "@/schema";
import { eq } from "drizzle-orm";
import { id } from "@repo/utils/id";

/* -------------------------------------------------------- */
/*                          HELPERS                         */
/* -------------------------------------------------------- */

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

// function roundToClosest9(n: number): number {
//   return n % 10 === 9 ? n : Math.floor(n / 10) * 10 + 9;
// }

/* -------------------------------------------------------- */
/*                      CLEAR DATABASE                      */
/* -------------------------------------------------------- */

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(MiningWalletDepositsTable);
  await db.delete(MiningWalletWithdrawTable);
  await db.delete(TradingWalletDepositsTable);
  await db.delete(TradingWalletWithdrawTable);
  await db.delete(TradingOrderTable);
  await db.delete(MiningOrderTable);
  await db.delete(MiningProfileTable);
  await db.delete(NewsTable);
  await db.delete(RatingTable);
  await db.delete(MiningWalletTable);
  await db.delete(TradingWalletTable);
  await db.delete(UserTable);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         UserTable                        */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding UserTable...");

  const __dummyUsers = Array.from({ length: 180 }).map<
    typeof UserTable.$inferInsert
  >((_, idx) => {
    const fullName = faker.person.fullName();

    return {
      age: faker.number.int({ min: 18, max: 80 }),
      avatarUrl: faker.image.avatar(),
      email: `${fullName.toLowerCase().split(" ").join("-")}-${idx}@email.com`,
      phoneNumber: Math.floor(Math.random() * 10000000000).toString(),
      fullName,
      userStatus: faker.helpers.arrayElement(["active", "inactive", "blocked"]),
    };
  });

  await db.insert(UserTable).values([...__dummyUsers]);

  const users = await db.select().from(UserTable);

  users.forEach(async (u) => {
    const randomSelectedUser = users[randomInt(0, users.length - 1)];

    if (randomSelectedUser && randomSelectedUser.id !== u.id) {
      await db
        .update(UserTable)
        .set({ referrerId: randomSelectedUser.id })
        .where(eq(UserTable.id, u.id));
    }
  });

  console.log("✅ UserTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletTable                    */
/* -------------------------------------------------------- */

async function seedTradingWallet() {
  console.log("🔃 Seeding TradingWalletTable...");

  const users = await db.select().from(UserTable);

  const __dummyTradingWallet = users
    .filter(() => Math.random() > 0.8)
    .map<typeof MiningWalletTable.$inferInsert>((u) => {
      return {
        balance: Math.random() * 90000,
        associatedUser: u.id,
      };
    });

  await db.insert(TradingWalletTable).values([...__dummyTradingWallet]);

  console.log("✅ TradingWalletTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletTable                    */
/* -------------------------------------------------------- */

async function seedMiningWallet() {
  console.log("🔃 Seeding TradingWalletTable...");

  const users = await db.select().from(UserTable);

  const __dummyMiningWallet = users
    .filter(() => Math.random() > 0.8)
    .map<typeof MiningWalletTable.$inferInsert>((u) => {
      return {
        balance: Math.random() * 90000,
        associatedUser: u.id,
      };
    });

  await db.insert(MiningWalletTable).values([...__dummyMiningWallet]);

  console.log("✅ TradingWalletTable seeded");
}

/* -------------------------------------------------------- */
/*                    RatingTable                    */
/* -------------------------------------------------------- */

async function seedRating() {
  console.log("🔃 Seeding RatingTable...");

  const users = await db.select().from(UserTable);

  const __dummyRating = users
    .filter(() => Math.random() > 0.8)
    .map<typeof RatingTable.$inferInsert>((u) => {
      return {
        associatedUser: u.id,
        ratingStar: randomInt(1, 5),
      };
    });

  await db.insert(RatingTable).values([...__dummyRating]);

  console.log("✅ RatingTable seeded");
}

/* -------------------------------------------------------- */
/*                    MiningProfileTable                    */
/* -------------------------------------------------------- */

async function seedMiningProfile() {
  console.log("🔃 Seeding MiningProfileTable...");

  const __dummyMiningProfile = Array.from({ length: 4 }).map<
    typeof MiningProfileTable.$inferInsert
  >(() => {
    const maximumAllowedAmount = randomInt(2, 5) * 100 - 1;
    return {
      category: faker.lorem.sentence({ min: 1, max: 3 }),
      dailyReturn: Number(Math.random().toFixed(2)),
      lockinPeriod: randomInt(1, 3) * 30,
      maximumAllowedAmount: maximumAllowedAmount,
      minimumAllowedAmount: maximumAllowedAmount - 100,
    };
  });

  await db.insert(MiningProfileTable).values([...__dummyMiningProfile]);

  console.log("✅ MiningProfileTable seeded");
}

/* -------------------------------------------------------- */
/*                    MiningOrderTable                    */
/* -------------------------------------------------------- */

async function seedMiningOrder() {
  console.log("🔃 Seeding MiningOrderTable...");

  const miningProfile = await db.select().from(MiningProfileTable);
  const users = await db.select().from(UserTable);

  const __dummyMiningOrder = users
    .filter(() => Math.random() > 0.6)
    .map<typeof MiningOrderTable.$inferInsert>((user) => {
      const randomMiningProfile =
        miningProfile[randomInt(0, miningProfile.length - 1)]!;

      const isCompleted = Math.random() > 0.6;

      const amountInvested = randomInt(
        randomMiningProfile.minimumAllowedAmount,
        randomMiningProfile.maximumAllowedAmount,
      );

      return {
        amountInvested: amountInvested,
        miningProfileUsed: randomMiningProfile.id,
        orderedBy: user.id,
        miningStatus: isCompleted ? "completed" : "active",
        amountReceived: isCompleted ? amountInvested - randomInt(0, 5) : null,
      };
    });

  await db.insert(MiningOrderTable).values([...__dummyMiningOrder]);

  console.log("✅ MiningOrderTable seeded");
}

/* -------------------------------------------------------- */
/*                    NewsTable                    */
/* -------------------------------------------------------- */

async function seedNews() {
  console.log("🔃 Seeding NewsTable...");

  const __dummyRating = Array.from({ length: 20 }).map<
    typeof NewsTable.$inferInsert
  >(() => {
    return {
      details: faker.lorem.paragraphs({ min: 3, max: 6 }, "\n\n"),
      effectiveDate:
        Math.random() > 0.5 ? faker.date.future() : faker.date.past(),
      heading: faker.lorem.sentence(),
    };
  });

  await db.insert(NewsTable).values([...__dummyRating]);

  console.log("✅ NewsTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingOrderTable                    */
/* -------------------------------------------------------- */

async function seedTradingOrder() {
  console.log("🔃 Seeding TradingOrderTable...");

  const users = await db.select().from(UserTable);

  const __dummyTradingOrder = users
    .filter(() => Math.random() > 0.6)
    .map<typeof TradingOrderTable.$inferInsert>((user) => {
      const isCompleted = Math.random() > 0.6;

      const amountInvested = randomInt(1000, 2000);

      return {
        amountInvested: amountInvested,
        orderedBy: user.id,
        miningStatus: isCompleted ? "completed" : "active",
        amountReceived: isCompleted ? amountInvested - randomInt(0, 5) : null,
      };
    });

  await db.insert(TradingOrderTable).values([...__dummyTradingOrder]);

  console.log("✅ TradingOrderTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletDepositsTable                    */
/* -------------------------------------------------------- */

async function seedTradingWalletDeposits() {
  console.log("🔃 Seeding TradingWalletDepositsTable...");

  const usersWithTradingWallet = await db
    .select()
    .from(UserTable)
    .innerJoin(
      TradingWalletTable,
      eq(TradingWalletTable.associatedUser, UserTable.id),
    );

  const __dummyTradingWalletDeposits = usersWithTradingWallet.map<
    typeof TradingWalletDepositsTable.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      depositMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
      depositProof: faker.image.personPortrait(),
      orderedBy: u.users.id,
      transactionId: id({ length: 20 }),
      wallet: u.trading_wallet.id,
    };
  }) satisfies (typeof TradingWalletDepositsTable.$inferInsert)[];

  await db
    .insert(TradingWalletDepositsTable)
    .values([...__dummyTradingWalletDeposits]);

  console.log("✅ TradingWalletDepositsTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletWithdrawTable                    */
/* -------------------------------------------------------- */

async function seedTradingWalletWithdraw() {
  console.log("🔃 Seeding TradingWalletWithdrawTable...");

  const usersWithTradingWallet = await db
    .select()
    .from(UserTable)
    .innerJoin(
      TradingWalletTable,
      eq(TradingWalletTable.associatedUser, UserTable.id),
    );

  const __dummyTradingWalletWithdraw = usersWithTradingWallet.map<
    typeof TradingWalletWithdrawTable.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      cryptoWaletAddress: id({ length: 20 }),
      orderedBy: u.users.id,
      wallet: u.trading_wallet.id,
      withdrawlMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
    };
  }) satisfies (typeof TradingWalletWithdrawTable.$inferInsert)[];

  await db
    .insert(TradingWalletWithdrawTable)
    .values([...__dummyTradingWalletWithdraw]);

  console.log("✅ TradingWalletWithdrawTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletDepositsTable            */
/* -------------------------------------------------------- */

async function seedMiningWalletDeposits() {
  console.log("🔃 Seeding MiningWalletDepositsTable...");

  const usersWithMiningWallet = await db
    .select()
    .from(UserTable)
    .innerJoin(
      MiningWalletTable,
      eq(MiningWalletTable.associatedUser, UserTable.id),
    );

  const __dummyMiningWalletDeposits = usersWithMiningWallet.map<
    typeof MiningWalletDepositsTable.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      depositMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
      depositProof: faker.image.personPortrait(),
      orderedBy: u.users.id,
      transactionId: id({ length: 20 }),
      wallet: u.mining_wallet.id,
    };
  }) satisfies (typeof MiningWalletDepositsTable.$inferInsert)[];

  await db
    .insert(MiningWalletDepositsTable)
    .values([...__dummyMiningWalletDeposits]);

  console.log("✅ MiningWalletDepositsTable seeded");
}

/* -------------------------------------------------------- */
/*                    TradingWalletWithdrawTable                    */
/* -------------------------------------------------------- */

async function seedMiningWalletWithdraw() {
  console.log("🔃 Seeding MiningWalletWithdrawTable...");

  const usersWithMiningWallet = await db
    .select()
    .from(UserTable)
    .innerJoin(
      MiningWalletTable,
      eq(MiningWalletTable.associatedUser, UserTable.id),
    );

  const __dummyMiningWalletWithdraw = usersWithMiningWallet.map<
    typeof MiningWalletWithdrawTable.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      cryptoWaletAddress: id({ length: 20 }),
      orderedBy: u.users.id,
      wallet: u.mining_wallet.id,
      withdrawalMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
      cryptoWalletAddress: id({ length: 20 }),
    };
  }) satisfies (typeof MiningWalletWithdrawTable.$inferInsert)[];

  await db
    .insert(MiningWalletWithdrawTable)
    .values([...__dummyMiningWalletWithdraw]);

  console.log("✅ MiningWalletWithdrawTable seeded");
}

/* -------------------------------------------------------- */
/*                           MAIN                           */
/* -------------------------------------------------------- */

export async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    await clearTables();

    await seedUsers();
    await seedTradingWallet();
    await seedMiningWallet();
    await seedRating();
    await seedNews();
    await seedMiningProfile();
    await seedMiningOrder();
    await seedTradingOrder();
    await seedTradingWalletDeposits();
    await seedTradingWalletWithdraw();
    await seedMiningWalletDeposits();
    await seedMiningWalletWithdraw();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
