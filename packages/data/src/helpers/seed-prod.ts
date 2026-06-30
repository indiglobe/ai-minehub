import { faker } from "@faker-js/faker";
import { db } from "..";
import {
  BenefitedUserTable,
  ContactMessageTable,
  CourseAdvantagesTable,
  CourseAssetTable,
  CourseBuyingProfilesTable,
  CourseModulesTable,
  CoursesOfferedTable,
  FaqTable,
  MetricsTable,
  RequestedAssetsTable,
  TestimonialsTable,
  UserTable,
  WebinarDetailsTable,
} from "../schema";
import { manifestJson } from "./manifest";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type ManifestKey = keyof typeof manifestJson;

const manifestCursor: Record<ManifestKey, number> = {
  "images/avatar": 0,
  "images/thumbnail": 0,
  "videos/course": 0,
  "document/pdf": 0,
};

function nextManifestItem<T extends ManifestKey>(key: T): string {
  const items = manifestJson[key];

  const index = manifestCursor[key];

  if (index >= items.length) {
    throw new Error(`Manifest exhausted for "${key}"`);
  }

  manifestCursor[key]++;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return items[index];
}

function randomInt(min: number, max: number) {
  return faker.number.int({ min, max });
}

export function roundToClosest9(n: number): number {
  return n % 10 === 9 ? n : Math.floor(n / 10) * 10 + 9;
}

function validateManifest() {
  const required = {
    "images/avatar": 60,
    "images/thumbnail": 30,
    "videos/course": 20,
    "document/pdf": 20,
  };

  for (const [key, count] of Object.entries(required)) {
    const available = manifestJson[key as ManifestKey].length;

    if (available < count) {
      throw new Error(
        `Manifest validation failed for ${key}. Required ${count}, got ${available}`,
      );
    }
  }
}

async function clearTables() {
  console.log("🧹 Clearing tables...");

  await db.delete(RequestedAssetsTable);
  await db.delete(CourseAssetTable);
  await db.delete(CourseModulesTable);
  await db.delete(CourseBuyingProfilesTable);
  await db.delete(TestimonialsTable);
  await db.delete(CourseAdvantagesTable);
  await db.delete(CoursesOfferedTable);
  await db.delete(WebinarDetailsTable);
  await db.delete(FaqTable);
  await db.delete(MetricsTable);
  await db.delete(BenefitedUserTable);
  await db.delete(ContactMessageTable);
  await db.delete(UserTable);

  console.log("✅ Tables cleared");
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */

async function seedUsers() {
  console.log("👤 Seeding users...");

  type InsertUser = typeof UserTable.$inferInsert;

  const baseUsers: InsertUser[] = [
    {
      email: "gangulysanjibkumar@gmail.com",
      name: "Sanjib Kumar Ganguly",
      age: 35,
      phoneNo: "9876543210",
      avatarImageURL:
        "https://lh3.googleusercontent.com/ogw/AF2bZyhgLeRshorY9l1I6unL3fIGrrnD-n_pwi2QGLZDU5zLTkw=s32-c-mo",
      role: "admin",
    },
    {
      email: "debobratapurkait25@gmail.com",
      name: "Debobrata Purkait",
      age: 55,
      phoneNo: "9876543210",
      avatarImageURL:
        "https://lh3.google.com/u/2/ogw/AF2bZyi_01g3UisBGZznu67jTR9sQPwI3dOXMyRurh_JoKFlvg=s32-c-mo",
      role: "basic",
    },
    {
      email: "nirvikpurkait@gmail.com",
      name: "Nirvik Purkait",
      age: 28,
      phoneNo: "8145149700",
      avatarImageURL:
        "https://lh3.googleusercontent.com/ogw/AF2bZygADgYxVPj71_vmcebos8Cf8CriqL8bY_XLBTK7EEvADps=s32-c-mo",
      role: "admin",
    },
  ];

  // const dummyUsers: InsertUser[] = Array.from({ length: 50 }).map(
  //   (_, index) => {
  //     const name = faker.person.fullName();

  //     return {
  //       email: `${name.replace(/\s+/g, "_")}_${index}@mail.com`,
  //       name,
  //       age: randomInt(18, 60),
  //       phoneNo: faker.string.numeric(10),
  //       avatarImageURL: nextManifestItem("images/avatar"),
  //       role: Math.random() > 0.8 ? "admin" : "basic",
  //     };
  //   },
  // );

  await db.insert(UserTable).values([
    ...baseUsers,
    //+ ...dummyUsers
  ]);

  console.log("✅ Users seeded");
}

/* -------------------------------------------------------------------------- */
/*                              BENEFITED USERS                               */
/* -------------------------------------------------------------------------- */

async function seedBenefitedUsers() {
  console.log("🎯 Seeding benefited users...");

  const users = await db.select().from(UserTable);

  const records = users
    .filter((u) => u.role === "admin" || Math.random() > 0.4)
    .map((u) => ({
      userEmail: u.email,
      benefitedSince: faker.date.past(),
    }));

  await db.insert(BenefitedUserTable).values(records);

  console.log("✅ Benefited users seeded");
}

/* -------------------------------------------------------------------------- */
/*                                   METRICS                                  */
/* -------------------------------------------------------------------------- */

async function seedMetrics() {
  console.log("📈 Seeding metrics...");

  await db.insert(MetricsTable).values([
    {
      metricsHeading: "18k",
      metricsSuffix: "+",
      metricsContent: "students trained",
      isVisible: true,
    },
    {
      metricsHeading: "50k",
      metricsSuffix: "+",
      metricsContent: "masterclass attendees",
      isVisible: true,
    },
    {
      metricsHeading: "200",
      metricsSuffix: "+",
      metricsContent: "hours of live learning",
      isVisible: true,
    },
    {
      metricsHeading: "95",
      metricsSuffix: "%",
      metricsContent: "success rate",
      isVisible: true,
    },
  ]);

  console.log("✅ Metrics seeded");
}

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

async function seedFaq() {
  console.log("❓ Seeding FAQ...");

  await db.insert(FaqTable).values([
    {
      faqQuestion: "Who are these trading courses for?",
      faqAnswer: `
Our courses are designed for beginners, working professionals, investors, and traders who want to learn professional strategies used in the stock market.
`,
      isVisible: true,
    },
    {
      faqQuestion: "What markets will be covered in the course?",
      faqAnswer: `
No. The courses start from basic concepts and gradually move to advanced strategies, making them suitable for beginners as well.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Do I need prior stock market knowledge?",
      faqAnswer: `
You will learn trading and investing techniques for:

- Indian Stock Market
- Index Trading (Nifty & Bank Nifty)
- Futures & Options (F&O)
- Stock investing using fundamental analysis
`,
      isVisible: true,
    },
    {
      faqQuestion: "What will I learn in the F&O Hedging course?",
      faqAnswer: `
This course focuses on risk management and professional options strategies, including spreads, hedging methods, and volatility strategies.
`,
      isVisible: true,
    },
    {
      faqQuestion: "What will I learn in the Institutional Trading course?",
      faqAnswer: `
You will learn:

- Market structure
- Liquidity concepts
- Order blocks
- Smart Money Concepts (SMC)
- Institutional trade setups.
`,
      isVisible: true,
    },
    {
      faqQuestion: "What will I learn in the Fundamental Analysis course?",
      faqAnswer: `
You will learn how to analyze:

- Company financial statements
- Business models
- Key financial ratios
- Long-term investment opportunities.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Are these strategies used by professional traders?",
      faqAnswer: `
Yes. The course covers institutional trading concepts and risk management strategies used by professional traders and hedge funds.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I get real market examples?",
      faqAnswer: `
Yes. All strategies are explained using real market charts and real trading examples.
`,
      isVisible: true,
    },
    {
      faqQuestion: "How long does it take to complete the course?",
      faqAnswer: `
Course durations:

- Institutional Trading - 30 Days
- F&O Hedging - 30 Days
- Fundamental Analysis - 60 Days
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will there be live classes?",
      faqAnswer: `
Depending on the batch, the course may include live classes, recorded lessons, or a combination of both.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I get access to recorded sessions?",
      faqAnswer: `
Yes. Students will receive recorded sessions for revision and practice.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I receive study materials?",
      faqAnswer: `
Yes. You will receive:

- Strategy PDFs
- Chart examples
- Trading frameworks
- Practical trading notes.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I get support if I have doubts?",
      faqAnswer: `
Yes. Students get access to a community group where they can ask questions and discuss trading concepts.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Can I learn trading while doing a job?",
      faqAnswer: `
Yes. The course is designed so that working professionals can easily learn trading in their free time.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Is trading risky?",
      faqAnswer: `
Yes, trading involves risk. This course focuses heavily on risk management and capital protection techniques.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Will I get a certificate after completing the course?",
      faqAnswer: `
Yes. Students will receive a certificate of course completion.
`,
      isVisible: true,
    },
    {
      faqQuestion: "How much capital is required to start trading?",
      faqAnswer: `
You can start learning with any capital size. The course teaches capital management strategies for both small and large traders.
`,
      isVisible: true,
    },
    {
      faqQuestion: "How can I enroll in the course?",
      faqAnswer: `
You can enroll by clicking the Enroll Now button on this page and completing the simple registration process.
`,
      isVisible: true,
    },
    {
      faqQuestion: "Why should I choose this course?",
      faqAnswer: `
This course is designed to help you:

- Understand institutional trading strategies
- Learn professional risk management
- Develop long-term investment skills
- Become a confident and independent trader.
`,
      isVisible: true,
    },
  ]);

  console.log("✅ FAQ seeded");
}

/* -------------------------------------------------------------------------- */
/*                                  WEBINARS                                  */
/* -------------------------------------------------------------------------- */

async function seedWebinars() {
  console.log("🎥 Seeding webinars...");

  type InsertWebinar = typeof WebinarDetailsTable.$inferInsert;

  const webinars: InsertWebinar[] = [
    {
      actualPrice: 599,
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      webinarJoiningLink: "https://live.sanjibacademy.com/webinar/some-value",
      webinarTopic: "Learn smart money concept",
      discountedPrice: 19,
    },
  ];
  // const webinars: InsertWebinar[] = Array.from({ length: 10 }).map(() => ({
  //   webinarTopic: faker.company.catchPhrase(),
  //   actualPrice: roundToClosest9(randomInt(199, 999)),
  //   discountedPrice: roundToClosest9(randomInt(19, 99)),
  //   approxDuration: 1000 * 60 * 60,
  //   webinarJoiningLink: "https://meet.google.com/demo",
  //   scheduledDate: faker.date.future(),
  // }));

  await db.insert(WebinarDetailsTable).values(webinars);

  console.log("✅ Webinars seeded");
}

/* -------------------------------------------------------------------------- */
/*                                   COURSES                                  */
/* -------------------------------------------------------------------------- */

async function seedCourses() {
  console.log("📚 Seeding courses...");

  await db.insert(CoursesOfferedTable).values([
    {
      courseTopic: "Institutional Trading",
      courseHeading: "Learn smart money concepts",
      brochureLink:
        "https://storage.sanjibacademy.com/pdf/course/brocure/some-value-1.pdf",
      imageLink:
        "https://storage.sanjibacademy.com/image/course/brocure/some-value-1.pdf",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      courseTopic: "F&O Hedging",
      courseHeading: "Protect your capital effectively",
      brochureLink:
        "https://storage.sanjibacademy.com/pdf/course/brocure/some-value-2.pdf",
      imageLink:
        "https://storage.sanjibacademy.com/image/course/brocure/some-value-2.pdf",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
    {
      courseTopic: "Fundamental Analysis",
      courseHeading: "Analyze companies professionally",
      brochureLink:
        "https://storage.sanjibacademy.com/pdf/course/brocure/some-value-3.pdf",
      imageLink:
        "https://storage.sanjibacademy.com/image/course/brocure/some-value-3.pdf",
      originalEnrlomentFee: 14999,
      discountedEnrlomentFee: 4999,
    },
  ]);

  console.log("✅ Courses seeded");
}

/* -------------------------------------------------------------------------- */
/*                              COURSE ADVANTAGES                             */
/* -------------------------------------------------------------------------- */

async function seedAdvantages() {
  console.log("⭐ Seeding course advantages...");

  const courses = await db.select().from(CoursesOfferedTable);

  const advantages = [
    "Smart Money Concepts",
    "Order Blocks",
    "Liquidity Zones",
    "Risk Management",
    "Futures & Options",
    "Fundamental Analysis",
  ];

  const rows = advantages.map((detail) => ({
    details: detail,
    relatedTo: faker.helpers.arrayElement(courses).id,
  }));

  await db.insert(CourseAdvantagesTable).values(rows);

  console.log("✅ Course advantages seeded");
}

/* -------------------------------------------------------------------------- */
/*                                TESTIMONIALS                                */
/* -------------------------------------------------------------------------- */

async function seedTestimonials() {
  console.log("💬 Seeding testimonials...");

  // const users = await db.select().from(BenefitedUserTable);

  // const testimonials = users.map((user) => ({
  //   authorEmail: user.userEmail,
  //   authorSocialHandle: faker.internet.username(),
  //   testimonialText: faker.lorem.paragraph(),
  // }));

  // await db.insert(TestimonialsTable).values(testimonials);

  console.log("✅ Testimonials seeded");
}

/* -------------------------------------------------------------------------- */
/*                                  CONTACTS                                  */
/* -------------------------------------------------------------------------- */

async function seedContactMessages() {
  console.log("📩 Seeding contacts...");

  // type TContactMessage = typeof ContactMessageTable.$inferInsert;

  // const __dummyContactMessages = Array.from({ length: 20 }).map((_, idx) => {
  //   const fakeFirstName = faker.person.firstName();
  //   const fakeLastName = faker.person.lastName();

  //   return {
  //     email: `${fakeFirstName}_${fakeLastName}_${idx}@email.com`.toLowerCase(),
  //     firstName: fakeFirstName,
  //     lastName: fakeLastName,
  //     message: faker.lorem.paragraph(2),
  //     phoneNo: Math.floor(Math.random() * 10000000000).toString(),
  //     isVerified: Math.random() > 0.5,
  //   } satisfies TContactMessage;
  // });

  // await db.insert(ContactMessageTable).values([
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john@example.com",
  //     phoneNo: "9999999999",
  //     message: faker.lorem.paragraph(),
  //     isVerified: true,
  //   },
  //   {
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     email: "jane@example.com",
  //     phoneNo: "8888888888",
  //     message: faker.lorem.paragraph(),
  //     isVerified: false,
  //   },
  //   // ...__dummyContactMessages,
  // ]);

  console.log("✅ Contacts seeded");
}

/* -------------------------------------------------------------------------- */
/*                              COURSE PURCHASES                              */
/* -------------------------------------------------------------------------- */

async function seedCoursePurchases() {
  console.log("💳 Seeding course purchases...");

  // const users = await db.select().from(UserTable);

  // const courses = await db.select().from(CoursesOfferedTable);

  // const purchases = faker.helpers.arrayElements(users, 20).map((user) => {
  //   const course = faker.helpers.arrayElement(courses);

  //   return {
  //     userEmail: user.email,
  //     courseId: course.id,
  //     amountPaid: course.discountedEnrlomentFee ?? course.originalEnrlomentFee,
  //     orderId: faker.string.alphanumeric(8).toUpperCase(),
  //     isCompleted: Math.random() > 0.3,
  //   };
  // });

  // await db.insert(CourseBuyingProfilesTable).values(purchases);

  console.log("✅ Course purchases seeded");
}

/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */

async function seedModules() {
  console.log("🧩 Seeding modules...");

  // const courses = await db.select().from(CoursesOfferedTable);

  // const rows = courses.flatMap((course) => [
  //   {
  //     courseId: course.id,
  //     title: "Introduction",
  //     description: "Basics and foundation",
  //     appearingOrder: 1,
  //   },
  //   {
  //     courseId: course.id,
  //     title: "Advanced Concepts",
  //     description: "Intermediate and advanced topics",
  //     appearingOrder: 2,
  //   },
  // ]);

  // await db.insert(CourseModulesTable).values(rows);

  console.log("✅ Modules seeded");
}

/* -------------------------------------------------------------------------- */
/*                                    ASSETS                                  */
/* -------------------------------------------------------------------------- */

async function seedAssets() {
  console.log("🎬 Seeding assets...");

  // const modules = await db.select().from(CourseModulesTable);

  // type InsertAsset = typeof CourseAssetTable.$inferInsert;

  // const assets: InsertAsset[] = Array.from({ length: 20 }).map((_, index) => {
  //   const isVideo = Math.random() > 0.5;

  //   const assetURL = isVideo
  //     ? nextManifestItem("videos/course")
  //     : nextManifestItem("document/pdf");

  //   return {
  //     moduleId: faker.helpers.arrayElement(modules).id,
  //     assetURL,
  //     thumbnailImage: nextManifestItem("images/thumbnail"),
  //     assetTitle: `${isVideo ? "Video" : "Document"} ${index + 1}`,
  //     assetDescription: faker.lorem.sentence(),
  //     availability: Math.random() > 0.7 ? "free" : "paid",
  //     assetType: isVideo ? "video" : "document",
  //   };
  // });

  // await db.insert(CourseAssetTable).values(assets);

  console.log("✅ Assets seeded");
}

/* -------------------------------------------------------------------------- */
/*                              REQUESTED ASSETS                              */
/* -------------------------------------------------------------------------- */

async function seedRequestedAssets() {
  console.log("📥 Seeding requested assets...");

  // const users = await db.select().from(UserTable);

  // const assets = await db.select().from(CourseAssetTable);

  // const rows = faker.helpers.arrayElements(users, 10).map((user) => ({
  //   requestCreatedBy: user.email,
  //   requestedURL: faker.helpers.arrayElement(assets).assetURL,
  // }));

  // await db.insert(RequestedAssetsTable).values(rows);

  console.log("✅ Requested assets seeded");
}

/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */

async function seed() {
  try {
    console.log("🚀 SEEDING STARTED");

    validateManifest();

    await clearTables();

    await seedUsers();
    await seedBenefitedUsers();
    await seedMetrics();
    await seedFaq();
    await seedWebinars();
    await seedCourses();
    await seedAdvantages();
    await seedTestimonials();
    await seedContactMessages();
    await seedCoursePurchases();
    await seedModules();
    await seedAssets();
    await seedRequestedAssets();

    console.log("🎉 SEEDING COMPLETED");

    process.exit(0);
  } catch (error) {
    console.error("❌ SEED FAILED");
    console.error(error);

    process.exit(1);
  }
}

seed();
