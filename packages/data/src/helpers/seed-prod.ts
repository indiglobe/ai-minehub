import { faker } from "@faker-js/faker";
import { db } from "@/index";
import {
  Table__User,
  Table__MiningWallet,
  Table__TradingWallet,
  Table__Rating,
  Table__News,
} from "@/schema";

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
      email: `${fullName.toLowerCase()}-${idx}@email.com`,
      phoneNumber: Math.floor(Math.random() * 10000000000).toString(),
      fullName,
    };
  });

  await db.insert(Table__User).values([...__dummyUsers]);

  const users = await db.select().from(Table__User);

  const updatedUsers = users.map<typeof Table__User.$inferInsert>((u) => {
    return {
      ...u,
      referrerId:
        users[Math.floor(Math.random() * users.length)]?.id === u.id
          ? undefined
          : users[Math.floor(Math.random() * users.length)]?.id,
    };
  });

  await db.delete(Table__User);

  await db.insert(Table__User).values([...updatedUsers]);

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
/*                    Table__News                    */
/* -------------------------------------------------------- */

async function seedNews() {
  console.log("🔃 Seeding Table__News...");

  const __dummyRating = Array.from({ length: 20 }).map<
    typeof Table__News.$inferInsert
  >(() => {
    return {
      details: faker.lorem
        .paragraphs({ min: 3, max: 6 }, "\n\n")
        .slice(0, 1023),
      effectiveDate:
        Math.random() > 0.5 ? faker.date.future() : faker.date.past(),
      heading: faker.lorem.sentence(),
    };
  });

  await db.insert(Table__News).values([...__dummyRating]);

  console.log("✅ Table__News seeded");
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

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
}

seed();
