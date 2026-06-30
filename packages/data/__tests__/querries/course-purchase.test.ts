import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CoursePurchaseTable, CourseTable, UserTable } from "@/schema";
import {
  create__CoursePurchase,
  read__AllCoursePurchases,
  read__OneCoursePurchase,
  update__CoursePurchase,
  delete__CoursePurchase,
} from "@/querries/course-purchase";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";
import { id } from "@repo/utils/id";

let purchase1Id: number;
let purchase2Id: number;

const courseId1 = id();
const courseId2 = id();

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CoursePurchaseTable);
  await db.delete(CourseTable);
  await db.delete(UserTable);

  await db.insert(UserTable).values([
    {
      email: "john@example.com",
      fullName: "John Doe",
      avatarUrl: "https://example.com/john.png",
      age: 25,
      phoneNumber: "9876543210",
    },
    {
      email: "jane@example.com",
      fullName: "Jane Smith",
      avatarUrl: "https://example.com/jane.png",
      age: 28,
      phoneNumber: "9999999999",
    },
  ]);

  await db.insert(CourseTable).values([
    {
      id: courseId1,
      topic: "React",
      title: "React Masterclass",
      brochureUrl: "https://example.com/react.pdf",
      originalPrice: 10000,
      discountedPrice: 5000,
      thumbnailUrl: "https://example.com/react.jpg",
    },
    {
      id: courseId2,
      topic: "Node.js",
      title: "Node.js Masterclass",
      brochureUrl: "https://example.com/node.pdf",
      originalPrice: 12000,
      discountedPrice: 6000,
      thumbnailUrl: "https://example.com/node.jpg",
    },
  ]);

  const [{ insertId: id1 }] = await db.insert(CoursePurchaseTable).values({
    userEmail: "john@example.com",
    courseId: courseId1,
    amountPaid: 5000,
    isCompleted: true,
    paymentOrderId: "ORDER_001",
  });

  purchase1Id = id1;

  const [{ insertId: id2 }] = await db.insert(CoursePurchaseTable).values({
    userEmail: "jane@example.com",
    courseId: courseId2,
    amountPaid: 6000,
    isCompleted: false,
    paymentOrderId: "ORDER_002",
  });

  purchase2Id = id2;
});

afterAll(async () => {
  await db.delete(CoursePurchaseTable);
  await db.delete(CourseTable);
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Course Purchase Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates course purchase", async () => {
    const created = await create__CoursePurchase({
      userEmail: "john@example.com",
      courseId: courseId2,
      amountPaid: 4500,
      paymentOrderId: "ORDER_CREATE",
    });

    expect(created).not.toBeNull();

    expect(created?.userEmail).toBe("john@example.com");
    expect(created?.courseId).toBe(courseId2);

    expect(created?.amountPaid).toBe(4500);

    expect(created?.isCompleted).toBe(false);

    expect(created?.paymentOrderId).toBe("ORDER_CREATE");

    expect(created?.purchasedAt).toBeInstanceOf(Date);

    expect(created?.tableIdentifierToken).toBe("CBPR");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all course purchases", async () => {
    const records = await read__AllCoursePurchases();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.id).toBeTypeOf("number");

      expect(record.userEmail).toContain("@");
      expect(record.courseId).toHaveLength(10);

      expect(record.amountPaid).toBeTypeOf("number");
      expect(typeof record.isCompleted).toBe("boolean");

      expect(record.paymentOrderId).toBeTruthy();

      expect(record.purchasedAt).toBeInstanceOf(Date);

      expect(record.tableIdentifierToken).toBe("CBPR");
    }
  });

  test("reads course purchases with limit", async () => {
    const records = await read__AllCoursePurchases({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records).toHaveLength(1);
  });

  test("reads course purchases with skip", async () => {
    const all = await read__AllCoursePurchases();

    const skipped = await read__AllCoursePurchases({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads course purchases filtered by userEmail", async () => {
    const records = await read__AllCoursePurchases({
      identifier: {
        userEmail: "john@example.com",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.userEmail).toBe("john@example.com");
    }
  });

  test("reads course purchases filtered by courseId", async () => {
    const records = await read__AllCoursePurchases({
      identifier: {
        courseId: courseId1,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.courseId).toBe(courseId1);
    }
  });

  test("reads course purchases filtered by isCompleted", async () => {
    const records = await read__AllCoursePurchases({
      identifier: {
        isCompleted: true,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.isCompleted).toBe(true);
    }
  });

  test("reads course purchases using multiple filters", async () => {
    const records = await read__AllCoursePurchases({
      identifier: {
        userEmail: "john@example.com",
        courseId: courseId1,
        isCompleted: true,
      },
    });

    expect(records).toHaveLength(1);

    expect(records[0]?.userEmail).toBe("john@example.com");
    expect(records[0]?.courseId).toBe(courseId1);
    expect(records[0]?.isCompleted).toBe(true);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one course purchase by id", async () => {
    const record = await read__OneCoursePurchase({
      identifier: {
        id: purchase1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(purchase1Id);

    expect(record?.userEmail).toBe("john@example.com");
    expect(record?.courseId).toBe(courseId1);

    expect(record?.amountPaid).toBe(5000);
    expect(record?.isCompleted).toBe(true);

    expect(record?.paymentOrderId).toBe("ORDER_001");

    expect(record?.tableIdentifierToken).toBe("CBPR");
  });

  test("reads one course purchase by composite key", async () => {
    const record = await read__OneCoursePurchase({
      identifier: {
        userEmail: "john@example.com",
        courseId: courseId1,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.userEmail).toBe("john@example.com");
    expect(record?.courseId).toBe(courseId1);
  });

  test("returns null for non-existing course purchase", async () => {
    const record = await read__OneCoursePurchase({
      identifier: {
        id: -99999,
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates course purchase by id", async () => {
    const updated = await update__CoursePurchase({
      identifier: {
        id: purchase2Id,
      },
      dataToUpdate: {
        isCompleted: true,
        amountPaid: 7000,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.isCompleted).toBe(true);
    expect(updated?.amountPaid).toBe(7000);
  });

  test("updates course purchase by composite key", async () => {
    const updated = await update__CoursePurchase({
      identifier: {
        userEmail: "john@example.com",
        courseId: courseId1,
      },
      dataToUpdate: {
        paymentOrderId: "UPDATED_ORDER",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.paymentOrderId).toBe("UPDATED_ORDER");
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__CoursePurchase({
      identifier: {
        id: purchase1Id,
      },
      dataToUpdate: {
        amountPaid: undefined,
        isCompleted: undefined,
      },
    });

    expect(result).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes course purchase by id", async () => {
    const created = await create__CoursePurchase({
      userEmail: "jane@example.com",
      courseId: courseId1,
      amountPaid: 9999,
      paymentOrderId: "DELETE_BY_ID",
    });

    const deleted = await delete__CoursePurchase({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(CoursePurchaseTable)
      .where(eq(CoursePurchaseTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("deletes course purchase by composite key", async () => {
    await create__CoursePurchase({
      userEmail: "jane@example.com",
      courseId: courseId1,
      amountPaid: 8888,
      paymentOrderId: "DELETE_COMPOSITE",
    });

    const deleted = await delete__CoursePurchase({
      identifier: {
        userEmail: "jane@example.com",
        courseId: courseId1,
      },
    });

    expect(deleted).not.toBeNull();

    const row = await read__OneCoursePurchase({
      identifier: {
        userEmail: "jane@example.com",
        courseId: courseId1,
      },
    });

    expect(row).toBeNull();
  });

  test("returns null when deleting non-existing course purchase", async () => {
    const result = await delete__CoursePurchase({
      identifier: {
        id: -99999,
      },
    });

    expect(result).toBeNull();
  });
});
