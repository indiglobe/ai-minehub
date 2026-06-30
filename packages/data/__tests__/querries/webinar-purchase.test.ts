import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { WebinarPurchaseTable, WebinarTable, UserTable } from "@/schema";
import {
  create__WebinarPurchase,
  read__AllWebinarPurchases,
  read__OneWebinarPurchase,
  update__WebinarPurchase,
  delete__WebinarPurchase,
} from "@/querries/webinar-purchase";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";
import { id } from "@repo/utils/id";

let purchase1Id: number;
let purchase2Id: number;

const webinarId1 = id();
const webinarId2 = id();

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(WebinarPurchaseTable);
  await db.delete(WebinarTable);
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

  await db.insert(WebinarTable).values([
    {
      id: webinarId1,
      topic: "React Webinar",
      scheduledAt: new Date("2026-01-01"),
      durationInMinutes: 120,
      originalPrice: 10000,
      discountedPrice: 5000,
      joiningUrl: "https://example.com/react-webinar",
    },
    {
      id: webinarId2,
      topic: "Node Webinar",
      scheduledAt: new Date("2026-02-01"),
      durationInMinutes: 90,
      originalPrice: 12000,
      discountedPrice: 6000,
      joiningUrl: "https://example.com/node-webinar",
    },
  ]);

  const [record1] = await db
    .insert(WebinarPurchaseTable)
    .values({
      userEmail: "john@example.com",
      webinarId: webinarId1,
      amountPaid: 5000,
      isCompleted: true,
      paymentOrderId: "WEB_ORDER_001",
    })
    .$returningId();

  purchase1Id = record1!.id;

  const [record2] = await db
    .insert(WebinarPurchaseTable)
    .values({
      userEmail: "jane@example.com",
      webinarId: webinarId2,
      amountPaid: 6000,
      isCompleted: false,
      paymentOrderId: "WEB_ORDER_002",
    })
    .$returningId();

  purchase2Id = record2!.id;
});

afterAll(async () => {
  await db.delete(WebinarPurchaseTable);
  await db.delete(WebinarTable);
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Webinar Buying Profile Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates webinar buying profile", async () => {
    const created = await create__WebinarPurchase({
      userEmail: "john@example.com",
      webinarId: webinarId2,
      amountPaid: 4500,
      paymentOrderId: "WEB_CREATE",
    });

    expect(created).not.toBeNull();

    expect(created?.userEmail).toBe("john@example.com");
    expect(created?.webinarId).toBe(webinarId2);

    expect(created?.amountPaid).toBe(4500);

    expect(created?.isCompleted).toBe(false);

    expect(created?.paymentOrderId).toBe("WEB_CREATE");

    expect(created?.purchasedAt).toBeInstanceOf(Date);

    expect(created?.tableIdentifierToken).toBe("WBPR");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all webinar buying profiles", async () => {
    const records = await read__AllWebinarPurchases();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.id).toBeTypeOf("number");

      expect(record.userEmail).toContain("@");
      expect(record.webinarId).toHaveLength(10);

      expect(record.amountPaid).toBeTypeOf("number");

      expect(typeof record.isCompleted).toBe("boolean");

      expect(record.paymentOrderId).toBeTruthy();

      expect(record.purchasedAt).toBeInstanceOf(Date);

      expect(record.tableIdentifierToken).toBe("WBPR");
    }
  });

  test("reads webinar buying profiles with limit", async () => {
    const records = await read__AllWebinarPurchases({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records).toHaveLength(1);
  });

  test("reads webinar buying profiles with skip", async () => {
    const all = await read__AllWebinarPurchases();

    const skipped = await read__AllWebinarPurchases({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads webinar buying profiles filtered by userEmail", async () => {
    const records = await read__AllWebinarPurchases({
      identifier: {
        userEmail: "john@example.com",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.userEmail).toBe("john@example.com");
    }
  });

  test("reads webinar buying profiles filtered by webinarId", async () => {
    const records = await read__AllWebinarPurchases({
      identifier: {
        webinarId: webinarId1,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.webinarId).toBe(webinarId1);
    }
  });

  test("reads webinar buying profiles filtered by isCompleted", async () => {
    const records = await read__AllWebinarPurchases({
      identifier: {
        isCompleted: true,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.isCompleted).toBe(true);
    }
  });

  test("reads webinar buying profiles using multiple filters", async () => {
    const records = await read__AllWebinarPurchases({
      identifier: {
        userEmail: "john@example.com",
        webinarId: webinarId1,
        isCompleted: true,
      },
    });

    expect(records).toHaveLength(1);

    expect(records[0]?.userEmail).toBe("john@example.com");
    expect(records[0]?.webinarId).toBe(webinarId1);
    expect(records[0]?.isCompleted).toBe(true);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one webinar buying profile by id", async () => {
    const record = await read__OneWebinarPurchase({
      identifier: {
        id: purchase1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(purchase1Id);

    expect(record?.userEmail).toBe("john@example.com");
    expect(record?.webinarId).toBe(webinarId1);

    expect(record?.amountPaid).toBe(5000);

    expect(record?.isCompleted).toBe(true);

    expect(record?.paymentOrderId).toBe("WEB_ORDER_001");

    expect(record?.tableIdentifierToken).toBe("WBPR");
  });

  test("reads one webinar buying profile by composite key", async () => {
    const record = await read__OneWebinarPurchase({
      identifier: {
        userEmail: "john@example.com",
        webinarId: webinarId1,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.userEmail).toBe("john@example.com");
    expect(record?.webinarId).toBe(webinarId1);
  });

  test("returns null for non-existing webinar buying profile", async () => {
    const record = await read__OneWebinarPurchase({
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

  test("updates webinar buying profile", async () => {
    const updated = await update__WebinarPurchase({
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

  test("updates paymentOrderId", async () => {
    const updated = await update__WebinarPurchase({
      identifier: {
        id: purchase1Id,
      },
      dataToUpdate: {
        paymentOrderId: "UPDATED_WEB_ORDER",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.paymentOrderId).toBe("UPDATED_WEB_ORDER");
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__WebinarPurchase({
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

  test("deletes webinar buying profile", async () => {
    const created = await create__WebinarPurchase({
      userEmail: "jane@example.com",
      webinarId: webinarId1,
      amountPaid: 9999,
      paymentOrderId: "DELETE_WEBINAR",
    });

    const deleted = await delete__WebinarPurchase({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(WebinarPurchaseTable)
      .where(eq(WebinarPurchaseTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing webinar buying profile", async () => {
    const result = await delete__WebinarPurchase({
      identifier: {
        id: -99999,
      },
    });

    expect(result).toBeNull();
  });
});
