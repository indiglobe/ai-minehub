import { faker } from "@faker-js/faker";
import { db } from "..";

import {
  Table__User,
  Table__MiningWallet,
  Table__TradingWallet,
  Table__Rating,
  Table__News,
  Table__MiningOrder,
  Table__MiningProfile,
  Table__TradingOrder,
  Table__MiningWalletDeposits,
  Table__MiningWalletWithdraw,
  Table__TradingWalletDeposits,
  Table__TradingWalletWithdraw,
} from "@/schema";
import { eq } from "drizzle-orm";
import { id } from "@repo/utils/id";
import { USER_STATUS } from "@/exports/enum";

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

  await db.delete(Table__MiningWalletDeposits);
  await db.delete(Table__MiningWalletWithdraw);
  await db.delete(Table__TradingWalletDeposits);
  await db.delete(Table__TradingWalletWithdraw);
  await db.delete(Table__TradingOrder);
  await db.delete(Table__MiningOrder);
  await db.delete(Table__MiningProfile);
  await db.delete(Table__News);
  await db.delete(Table__Rating);
  await db.delete(Table__MiningWallet);
  await db.delete(Table__TradingWallet);
  await db.delete(Table__User);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------- */
/*                         Table__User                        */
/* -------------------------------------------------------- */

async function seedUsers() {
  console.log("🔃 Seeding Table__User...");

  const __dummyUsers = Array.from({ length: 180 }).map<
    typeof Table__User.$inferInsert
  >((_, idx) => {
    const fullName = faker.person.fullName();

    return {
      age: faker.number.int({ min: 18, max: 80 }),
      avatarUrl: faker.image.avatar(),
      email: `${fullName.toLowerCase().split(" ").join("-")}-${idx}@email.com`,
      phoneNumber: Math.floor(Math.random() * 10000000000).toString(),
      fullName,
      userStatus: faker.helpers.arrayElement(USER_STATUS),
    };
  });

  await db.insert(Table__User).values([...__dummyUsers]);

  const users = await db.select().from(Table__User);

  users.forEach(async (u) => {
    const randomSelectedUser = users[randomInt(0, users.length - 1)];

    if (randomSelectedUser && randomSelectedUser.id !== u.id) {
      await db
        .update(Table__User)
        .set({ referrerId: randomSelectedUser.id })
        .where(eq(Table__User.id, u.id));
    }
  });

  console.log("✅ Table__User seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWallet                    */
/* -------------------------------------------------------- */

async function seedTradingWallet() {
  console.log("🔃 Seeding Table__TradingWallet...");

  const users = await db.select().from(Table__User);

  const __dummyTradingWallet = users
    .filter(() => Math.random() > 0.8)
    .map<typeof Table__MiningWallet.$inferInsert>((u) => {
      return {
        balance: Math.random() * 90000,
        associatedUser: u.id,
      };
    });

  await db.insert(Table__TradingWallet).values([...__dummyTradingWallet]);

  console.log("✅ Table__TradingWallet seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWallet                    */
/* -------------------------------------------------------- */

async function seedMiningWallet() {
  console.log("🔃 Seeding Table__TradingWallet...");

  const users = await db.select().from(Table__User);

  const __dummyMiningWallet = users
    .filter(() => Math.random() > 0.8)
    .map<typeof Table__MiningWallet.$inferInsert>((u) => {
      return {
        balance: Math.random() * 90000,
        associatedUser: u.id,
      };
    });

  await db.insert(Table__MiningWallet).values([...__dummyMiningWallet]);

  console.log("✅ Table__TradingWallet seeded");
}

/* -------------------------------------------------------- */
/*                    Table__Rating                    */
/* -------------------------------------------------------- */

async function seedRating() {
  console.log("🔃 Seeding Table__Rating...");

  const users = await db.select().from(Table__User);

  const __dummyRating = users
    .filter(() => Math.random() > 0.8)
    .map<typeof Table__Rating.$inferInsert>((u) => {
      return {
        associatedUser: u.id,
        ratingStar: randomInt(1, 5),
      };
    });

  await db.insert(Table__Rating).values([...__dummyRating]);

  console.log("✅ Table__Rating seeded");
}

/* -------------------------------------------------------- */
/*                    Table__MiningProfile                    */
/* -------------------------------------------------------- */

async function seedMiningProfile() {
  console.log("🔃 Seeding Table__MiningProfile...");

  const __dummyMiningProfile = Array.from({ length: 4 }).map<
    typeof Table__MiningProfile.$inferInsert
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

  await db.insert(Table__MiningProfile).values([...__dummyMiningProfile]);

  console.log("✅ Table__MiningProfile seeded");
}

/* -------------------------------------------------------- */
/*                    Table__MiningOrder                    */
/* -------------------------------------------------------- */

async function seedMiningOrder() {
  console.log("🔃 Seeding Table__MiningOrder...");

  const miningProfile = await db.select().from(Table__MiningProfile);
  const users = await db.select().from(Table__User);

  const __dummyMiningOrder = users
    .filter(() => Math.random() > 0.6)
    .map<typeof Table__MiningOrder.$inferInsert>((user) => {
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
        miningStatus: isCompleted ? "COMPLETED" : "ACTIVE",
        amountReceived: isCompleted ? amountInvested - randomInt(0, 5) : null,
      };
    });

  await db.insert(Table__MiningOrder).values([...__dummyMiningOrder]);

  console.log("✅ Table__MiningOrder seeded");
}

/* -------------------------------------------------------- */
/*                    Table__News                    */
/* -------------------------------------------------------- */

async function seedNews() {
  console.log("🔃 Seeding Table__News...");

  const __dummyRating = Array.from({ length: 20 }).map<
    typeof Table__News.$inferInsert
  >(() => {
    return {
      details: faker.lorem.paragraphs({ min: 3, max: 6 }, "\n\n"),
      effectiveDate:
        Math.random() > 0.5 ? faker.date.future() : faker.date.past(),
      heading: faker.lorem.sentence(),
    };
  });

  await db.insert(Table__News).values([...__dummyRating]);

  console.log("✅ Table__News seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingOrder                    */
/* -------------------------------------------------------- */

async function seedTradingOrder() {
  console.log("🔃 Seeding Table__TradingOrder...");

  const users = await db.select().from(Table__User);

  const __dummyTradingOrder = users
    .filter(() => Math.random() > 0.6)
    .map<typeof Table__TradingOrder.$inferInsert>((user) => {
      const isCompleted = Math.random() > 0.6;

      const amountInvested = randomInt(1000, 2000);

      return {
        amountInvested: amountInvested,
        orderedBy: user.id,
        miningStatus: isCompleted ? "completed" : "active",
        amountReceived: isCompleted ? amountInvested - randomInt(0, 5) : null,
      };
    });

  await db.insert(Table__TradingOrder).values([...__dummyTradingOrder]);

  console.log("✅ Table__TradingOrder seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWalletDeposits                    */
/* -------------------------------------------------------- */

async function seedTradingWalletDeposits() {
  console.log("🔃 Seeding Table__TradingWalletDeposits...");

  const usersWithTradingWallet = await db
    .select()
    .from(Table__User)
    .innerJoin(
      Table__TradingWallet,
      eq(Table__TradingWallet.associatedUser, Table__User.id),
    );

  const __dummyTradingWalletDeposits = usersWithTradingWallet.map<
    typeof Table__TradingWalletDeposits.$inferInsert
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
      orderedBy: u.user.id,
      transactionId: id({ length: 20 }),
      wallet: u.trading_wallet.id,
    };
  }) satisfies (typeof Table__TradingWalletDeposits.$inferInsert)[];

  await db
    .insert(Table__TradingWalletDeposits)
    .values([...__dummyTradingWalletDeposits]);

  console.log("✅ Table__TradingWalletDeposits seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWalletWithdraw                    */
/* -------------------------------------------------------- */

async function seedTradingWalletWithdraw() {
  console.log("🔃 Seeding Table__TradingWalletWithdraw...");

  const usersWithTradingWallet = await db
    .select()
    .from(Table__User)
    .innerJoin(
      Table__TradingWallet,
      eq(Table__TradingWallet.associatedUser, Table__User.id),
    );

  const __dummyTradingWalletWithdraw = usersWithTradingWallet.map<
    typeof Table__TradingWalletWithdraw.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      cryptoWaletAddress: id({ length: 20 }),
      orderedBy: u.user.id,
      wallet: u.trading_wallet.id,
      withdrawlMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
    };
  }) satisfies (typeof Table__TradingWalletWithdraw.$inferInsert)[];

  await db
    .insert(Table__TradingWalletWithdraw)
    .values([...__dummyTradingWalletWithdraw]);

  console.log("✅ Table__TradingWalletWithdraw seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWalletDeposits            */
/* -------------------------------------------------------- */

async function seedMiningWalletDeposits() {
  console.log("🔃 Seeding Table__MiningWalletDeposits...");

  const usersWithMiningWallet = await db
    .select()
    .from(Table__User)
    .innerJoin(
      Table__MiningWallet,
      eq(Table__MiningWallet.associatedUser, Table__User.id),
    );

  const __dummyMiningWalletDeposits = usersWithMiningWallet.map<
    typeof Table__MiningWalletDeposits.$inferInsert
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
      orderedBy: u.user.id,
      transactionId: id({ length: 20 }),
      wallet: u.mining_wallet.id,
    };
  }) satisfies (typeof Table__MiningWalletDeposits.$inferInsert)[];

  await db
    .insert(Table__MiningWalletDeposits)
    .values([...__dummyMiningWalletDeposits]);

  console.log("✅ Table__MiningWalletDeposits seeded");
}

/* -------------------------------------------------------- */
/*                    Table__TradingWalletWithdraw                    */
/* -------------------------------------------------------- */

async function seedMiningWalletWithdraw() {
  console.log("🔃 Seeding Table__MiningWalletWithdraw...");

  const usersWithMiningWallet = await db
    .select()
    .from(Table__User)
    .innerJoin(
      Table__MiningWallet,
      eq(Table__MiningWallet.associatedUser, Table__User.id),
    );

  const __dummyMiningWalletWithdraw = usersWithMiningWallet.map<
    typeof Table__MiningWalletWithdraw.$inferInsert
  >((u) => {
    return {
      amount: randomInt(200, 300),
      cryptoWaletAddress: id({ length: 20 }),
      orderedBy: u.user.id,
      wallet: u.mining_wallet.id,
      withdrawalMethod: faker.helpers.arrayElement([
        "BSC",
        "TRX",
        "ETH",
        "Bitcoin",
      ]),
      cryptoWalletAddress: id({ length: 20 }),
    };
  }) satisfies (typeof Table__MiningWalletWithdraw.$inferInsert)[];

  await db
    .insert(Table__MiningWalletWithdraw)
    .values([...__dummyMiningWalletWithdraw]);

  console.log("✅ Table__MiningWalletWithdraw seeded");
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
